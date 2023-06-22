/* eslint-disable prettier/prettier */
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {StoreCreateDto} from './dto/create-store.dto';
import {StoreEntity} from './entities/store.entity';
import {createResponse} from '../utils/createResponse';
import {UserEntity} from "../user/entities/user.entity";
import {StoreRes} from "../../types/store/store";
import {createAuthHeadersFromStoreCredentials} from "../utils/createAuthHeadersFromStoreCredentials";
import {v4 as uuid} from "uuid";
import {getToken} from "../utils/furgonetkaGetToken.utils";

@Injectable()
export class StoreService {
    constructor(private dataSource: DataSource) {
    }

    async create(storeCreateDto: StoreCreateDto, user_uuid) {
        const {
            name,
            url,
            consumer_key,
            consumer_secret,
        } = storeCreateDto;


        const isStoreExist = await StoreEntity.findOneBy({url});

        if (isStoreExist) {
            throw new HttpException(
                {
                    message: `Sklep, który próbujesz dodać już istnieje w bazie danych..`,
                    isSuccess: false,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        const furgonetka_access_token = await getToken()
        const user = await UserEntity.findOneBy({uuid: user_uuid})

        const store = new StoreEntity();
        store.uuid = uuid();
        store.url = url;
        store.name = name;
        store.consumer_secret = consumer_secret;
        store.consumer_key = consumer_key;
        // store.user = user;
        store.user_uuid = user.uuid;
        store.furgonetka_access_token = furgonetka_access_token;
        await store.save();
        return createResponse(true, `Pomyślnie skonfigurowano sklep`, 200);
    }

    public async getStore(user_uuid: string): Promise<StoreRes> {
        const store = await StoreEntity.findOneBy({user_uuid})
        const headers = createAuthHeadersFromStoreCredentials(store.consumer_key, store.consumer_secret);
        return {
            store_url: store.url,
            headers,
            furgonetka_access_token: store.furgonetka_access_token,
        }
    }

    async getOneById(user_uuid: string): Promise<any> {
        const store = await StoreEntity.findOneBy({user_uuid})
        return {
            store_url: store.url,
            store_name: store.name,
        }
    }

}
