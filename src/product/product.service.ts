import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import axios from "axios";
import {getTrackingNumberFromOrder} from "../utils/getTrackingNumberFromOrder";
import {DataSource} from "typeorm";
import {StoreService} from "../store/store.service";
import {GetListOfAllProductsResponse} from "../../types/product/product";

@Injectable()
export class ProductService {
    constructor(
        private dataSource: DataSource,
        private storeService: StoreService,
    ) {
    }

    async getOneByEan(ean, user_uuid): Promise<any> {
        const store = await this.storeService.getStoreByUserId(user_uuid);
        const url = `${store.store_url}/wp-json/wc/v3/products?ean=${ean}`;

        const res = await axios.get(url, {headers: store.headers});

        return  res.data || {};


    }

    async getAllProducts(user_id?: string): Promise<GetListOfAllProductsResponse> {
        const store = await this.storeService.getStoreByUserId(user_id);

        const url = `${store.store_url}/wp-json/wc/v3/products`;
        try {
            const res = await axios.get(url, {
                headers: store.headers,
                params: {
                    per_page: 20,
                },
            });
            return res.data || [];
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

}
