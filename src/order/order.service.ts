import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {DataSource} from "typeorm";
import {GetListOfAllOrdersResponse} from "../../types/order/order";
import {createAuthHeadersFromStoreCredentials} from "../utils/createAuthHeadersFromStoreCredentials";
import axios from "axios";

@Injectable()
export class OrderService {
    constructor(private dataSource: DataSource){}

    async getAllOrders(req: Request): Promise<GetListOfAllOrdersResponse> {

        const url = `${req.session.data.store_url}/wp-json/wc/v3/orders`
       
        try {
            const res = await axios.get(url, {
              headers: req.session.data.headers
            });
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
    
    
    async getOneById(req: Request, order_id): Promise <> {
      const url = `${req.session.data.store_url}/wp-json/wc/v3/orders/${order_id}`
      
      try {
        
        const res = axios.get(url,{headers: req.session.data.headers});
        const order = res.data || {}
        return order
        
      } catch(e) {
        
      }
    }

}
