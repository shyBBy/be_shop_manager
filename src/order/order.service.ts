import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {DataSource} from "typeorm";
import {GetListOfAllOrdersResponse} from "../../types/order/order";
import axios from "axios";
import {StoreService} from "../store/store.service";
import {FurgonetkaService} from "../furgonetka/furgonetka.service";
import {getTrackingNumberFromOrder} from "../utils/getTrackingNumberFromOrder";
import {ORDER_STATUS} from "../../types/status/status";


@Injectable()
export class OrderService {
    constructor(
        private dataSource: DataSource,
        private storeService: StoreService,
        private furgonetkaService: FurgonetkaService
    ) {
    }

    async getAllOrders(user_id: string): Promise<GetListOfAllOrdersResponse> {

        const store = await this.storeService.getStore(user_id)

        const url = `${store.store_url}/wp-json/wc/v3/orders`

        try {
            const res = await axios.get(url, {
                headers: store.headers
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
        const store = await this.storeService.getStore(user_uuid)
        const url = `${store.store_url}/wp-json/wc/v3/orders/${order_id}`

        try {
            const res = await axios.get(url, {headers: store.headers});
            const orderRes = res.data || {};

            const tracking_number = await getTrackingNumberFromOrder(orderRes)
            if (tracking_number) {
                const onePackage = await this.furgonetkaService.getPackage(tracking_number, store.furgonetka_access_token);

                const shippingTrackingHistory = await this.furgonetkaService.getShippingStatus(onePackage.package_id, store.furgonetka_access_token)

                const orderData = {
                    order: orderRes,
                    shipping: onePackage,
                    shipping_tracking: shippingTrackingHistory
                }
                return orderData;
            }
            return orderRes;
        } catch (e) {

            throw e;
        }
    }

    // async updateStatus(order_id: string, user_uuid) {
    //     const store = await this.storeService.getStore(user_uuid)
    //     const url = `${store.store_url}/wp-json/wc/v3/orders/${order_id}`
    //     try {
    //         const packageStatus = await this.getOneById(order_id, user_uuid)
    //         const data = {
    //             status: ORDER_STATUS.ZAMOWIENIE_WYSLANE
    //         }
    //         WooCommerce.put(`orders/${order_id}`, data)
    //             .then((res) => {
    //                 return res.data
    //             })
    //             .catch((e) => {
    //                 console.log(e)
    //             })
    //         // const res = await axios.put(url,status, {headers: store.headers});
    //         // return res
    //     } catch (e){
    //
    //         throw e;
    //     }
    // }


}
