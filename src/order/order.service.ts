import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {DataSource} from "typeorm";
import {GetListOfAllOrdersResponse} from "../../types/order/order";
import { encode } from 'base-64';
import {createAuthHeadersFromStoreCredentials} from "../utils/createAuthHeadersFromStoreCredentials";
import axios from "axios";

@Injectable()
export class OrderService {
    constructor(private dataSource: DataSource){}

    async getAllOrders(store_url, consumer_key, consumer_secret): Promise<GetListOfAllOrdersResponse> {

        const headers = createAuthHeadersFromStoreCredentials(consumer_key, consumer_secret);
        const url = `${store_url}/wp-json/wc/v3/orders`

        try {
            const res = await axios.get(url, {headers});
            const orders = res.data || [];
            return orders

        } catch (e) {
            throw new HttpException(
                {
                    message: `Coś poszło nie tak, spróbuj raz jeszcze.`,
                    isSuccess: false,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

    }

}
