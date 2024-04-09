import { Injectable } from '@nestjs/common';
import axios from "axios";
import {getTrackingNumberFromOrder} from "../utils/getTrackingNumberFromOrder";
import {DataSource} from "typeorm";
import {StoreService} from "../store/store.service";

@Injectable()
export class ProductService {
    constructor(
        private dataSource: DataSource,
        private storeService: StoreService,
    ) {
    }

    async getOneByEan(ean, user_uuid): Promise<any> {
        const store = await this.storeService.getStoreByUserId(user_uuid);
        const url = `${store.store_url}/wp-json/wc/v3/orders/${ean}`;


        const res = await axios.get(url, {headers: store.headers});
        const productRes = res.data || {};

        const orderData = {
            product: productRes,
        };
        return orderData;


    }

}
