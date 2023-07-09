import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {GetListOfAllOrdersResponse} from '../../types/order/order';
import axios from 'axios';
import {StoreService} from '../store/store.service';
import {FurgonetkaService} from '../furgonetka/furgonetka.service';
import {getTrackingNumberFromOrder} from '../utils/getTrackingNumberFromOrder';
import {checkIsShippingCreatedAndStatus} from "../utils/checkIsShippingCreatedAndStatus";
import {OrderEntity} from "./entities/order.entity";
import {MailerService} from "@nestjs-modules/mailer";
import {mailTemplate} from "../utils/mailTemplate";

@Injectable()
export class OrderService {
    constructor(
        private dataSource: DataSource,
        private storeService: StoreService,
        private furgonetkaService: FurgonetkaService,
        private readonly mailerService: MailerService,
    ) {
    }

    async getAllOrders(user_id: string): Promise<GetListOfAllOrdersResponse> {

        const store = await this.storeService.getStoreByUserId(user_id)

        const url = `${store.store_url}/wp-json/wc/v3/orders`

        try {
            const res = await axios.get(url, {
                headers: store.headers,
                params: {
                    per_page: 20,
                },
            });
            const orders = res.data || [];
            console.log(orders.meta_data)
            return orders

        } catch (e) {
            console.log(e)
            throw new HttpException(
                {
                    message: `Coś poszło nie tak, spróbuj raz jeszcze.`,
                    isSuccess: false,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

    }


    async getOneById(order_id, user_uuid): Promise<any> {
        const store = await this.storeService.getStoreByUserId(user_uuid)
        const url = `${store.store_url}/wp-json/wc/v3/orders/${order_id}`

        try {
            const res = await axios.get(url, {headers: store.headers});
            const orderRes = res.data || {};

            const tracking_number = await getTrackingNumberFromOrder(orderRes)
            if (tracking_number) {
                const onePackage = await this.furgonetkaService.getPackage(tracking_number, store.furgonetka_access_token);

                const shippingTrackingHistory = await this.furgonetkaService.getShippingStatus(onePackage.package_id, store.furgonetka_access_token)

                const isShippingCreated = checkIsShippingCreatedAndStatus(shippingTrackingHistory); //sprawdza jaki ma status = jesli jest wygenerowana paczka to zwroci true czyli umozliwi wyslanie powiadomienia e-mail

                const isOrderExist = await OrderEntity.findOneBy({order_id}) //pobiera zamowienie z lokalnej bazy danych
                if (!isOrderExist) { //jesli nie ma to tworzy nową encje w lokalnej bazie danych
                    const order = await new OrderEntity()
                    order.order_id = order_id;
                    order.tracking_number = tracking_number;
                    order.state_description = orderRes.status
                    await order.save()
                }

                if (isShippingCreated && isOrderExist.notification_was_send === false) { //jesli paczka jest (true) oraz jesli e-mail nie byl wyslany (false) to powiadomienie zostanie wysłane
                    const order = await OrderEntity.findOneBy({order_id})

                    await this.mailerService.sendMail({
                        // to: `${orderRes.billing.email}`,
                        to: `bigsewciushop@gmail.com`,
                        subject: 'Zamówienie z bigsewciu.shop zostało wysłane!',
                        text: 'Zlokalizuj swoją przesyłkę',
                        html: mailTemplate(onePackage.parcels[0].tracking_url),
                    })
                    await this.updateStatus(url, store.headers)
                    order.notification_was_send = true
                    await order.save()
                

                const orderData = {
                    order: orderRes,
                    shipping: onePackage,
                    shipping_tracking: shippingTrackingHistory
                }
                return orderData;
            }
            }

            const orderData = {
                order: orderRes,
                shipping: null,
                shipping_tracking: null
            }
            return orderData;
        } catch (e) {
            throw e;
        }
    }

    async updateStatus(url: string, store_headers) {
        try {
            const data = {
                status: 'in-transit'
            }
            const res = await axios.put(url, data, { headers: store_headers });

        } catch (e){

            throw e;
        }
    }
}
