import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import axios from 'axios';
import {createAuthHeadersFromStoreCredentials} from '../utils/createAuthHeadersFromStoreCredentials';
import {getTrackingNumberFromOrder} from "../utils/getTrackingNumberFromOrder";
import {FurgonetkaService} from "../furgonetka/furgonetka.service";
import {updateStatus} from "../utils/updateStatus";
import {MailerService} from "@nestjs-modules/mailer";
import {Cron, CronExpression} from "@nestjs/schedule";



@Injectable()
export class StatusService {
    constructor(
        private furgonetkaService: FurgonetkaService,
        private readonly mailerService: MailerService,
    ) {
    }

    async getOrdersInTransitOrProcessingWithPackageNumber() {
        const url = `${process.env.STORE_URL}/wp-json/wc/v3/orders`;
        const storeHeaders = createAuthHeadersFromStoreCredentials(
            process.env.STORE_CONSUMER_KEY,
            process.env.STORE_CONSUMER_SECRET,
        );

        try {
            const res = await axios.get(url, {
                headers: storeHeaders,
                params: {
                    per_page: 30,
                },
            });
            const orders = res.data || []; //pobieramy liste wszystkich zamówien
            const processingOrInTransitOrders = orders.filter(order => order.status === "processing" || order.status === "in-transit"); // filtrujemy zamowienia pod kątem statusów
            let ordersWithPackageNumber = []

            processingOrInTransitOrders.forEach(order => { //jesli jest wygenerowana etykieta to dodaje nam pojedyncze zamowienie do tablicy wczesniej przygotowanej
                const trackingInfo = order.meta_data.find(item => item.key === 'tracking_info');

                if (trackingInfo && Object.keys(trackingInfo.value).length > 0) {
                    ordersWithPackageNumber.push(order);
                }
            });


            return ordersWithPackageNumber;
        } catch (e) {
            console.log(e);
            throw new HttpException(
                {
                    message: `Coś poszło nie tak, spróbuj raz jeszcze.`,
                    isSuccess: false,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }


    //nazwa do zmiany
    @Cron(CronExpression.EVERY_3_HOURS)
    async getAllOrdersAndCheckStatusAndChangeIt() {
        const orders = await this.getOrdersInTransitOrProcessingWithPackageNumber();
        let ordersWithDeliveredStatus = []
        let ordersWithSendStatus = []

        for (const order of orders) {//tego typu pętla pozwala na uzycie asynchronicznych funkcji w przeciwieństwie do forEach
            const url = `${process.env.STORE_URL}/wp-json/wc/v3/orders/${order.id}`;
            const tracking_number = await getTrackingNumberFromOrder(order);
            const shipping = await this.furgonetkaService.getPackage(tracking_number, process.env.FURGONETKA_ACCES_TOKEN);
            if (shipping.parcels[0].state === 'collected' || shipping.parcels[0].state === 'transit') {
                // const isOrderExist = await OrderEntity.findOneBy({order_id: order.id})
                // if (!isOrderExist) { //jesli nie ma to tworzy nową encje w lokalnej bazie danych
                //     const order = await new OrderEntity()
                //     order.order_id = order.id;
                //     order.tracking_number = tracking_number;
                //     order.state_description = orderRes.status
                //     await order.save()
                // }
                // console.log(isOrderExist)
                await updateStatus(url, 'in-transit')
                ordersWithSendStatus.push(order)
            } else if (shipping.parcels[0].state === 'delivered') {
                await updateStatus(url, 'completed')
                ordersWithDeliveredStatus.push(order)
            } else {
                console.log(`coś nie tak z: ${order.id}`)
            }
        }

        const response = {
            inTransit: ordersWithSendStatus,
            delivered: ordersWithDeliveredStatus
        }

        return response
    }
}
