import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import axios from "axios";
import {DataSource} from "typeorm";
import {StoreService} from "../store/store.service";
import {GetListOfAllProductsResponse, GetOneProductResponse} from "../../types/product/product";
import {createResponse} from "../utils/createResponse";

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

        return res.data || {};
    }

    async getOneByName(name, user_uuid): Promise<any> {
        const store = await this.storeService.getStoreByUserId(user_uuid);
        const url = `${store.store_url}/wp-json/wc/v3/products?search=${name}`;

        const res = await axios.get(url, {headers: store.headers});

        return res.data || {} || [];


    }

    async getOneById(productId, user_uuid): Promise<GetOneProductResponse> {
        const store = await this.storeService.getStoreByUserId(user_uuid);
        const url = `${store.store_url}/wp-json/wc/v3/products/${productId}`;
        const res = await axios.get(url, {headers: store.headers});
        return res.data || {};
    }

    async updateStockQuantity(productId, quantity, user_uuid): Promise<any> {
        const store = await this.storeService.getStoreByUserId(user_uuid);
        const url = `${store.store_url}/wp-json/wc/v3/products/${productId}`;

        try {
            const data = {
                stock_quantity: quantity
            }
            const res = await axios.put(url, data, {headers: store.headers});
            return createResponse(true, `Ustawiłeś stok produktu na: ${quantity}`, 200)
        } catch (e) {
            return createResponse(false, `Coś poszło nie tak`, 400)
        }
    }

    async updateEan(productId, ean, user_uuid): Promise<any> {
        const store = await this.storeService.getStoreByUserId(user_uuid);
        const url = `${store.store_url}/wp-json/wc/v3/products/${productId}`;

        try {
            const data = {
                meta_data: [
                    {
                        key: '_alg_ean',
                        value: ean
                    }
                ]
            }
            const res = await axios.put(url, data, {headers: store.headers});
            return createResponse(true, `Ustawiłeś stok produktu na: ${ean}`, 200)
        } catch (e) {
            return createResponse(false, `Coś poszło nie tak`, 400)
        }
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

    async getAllProductsVariants(id, user_id?: string): Promise<GetListOfAllProductsResponse> {
        const store = await this.storeService.getStoreByUserId(user_id);

        const url = `${store.store_url}/wp-json/wc/v3/products/${id}/variations`;
        try {

            const res = await axios.get(url, {
                headers: store.headers,
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
