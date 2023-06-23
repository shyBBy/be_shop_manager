/* eslint-disable prettier/prettier */
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {StoreCreateDto} from './dto/create-store.dto';
import {StoreEntity} from './entities/store.entity';
import {createResponse} from '../utils/createResponse';
import {UserEntity} from '../user/entities/user.entity';
import {getToken} from '../utils/furgonetkaGetToken.utils';
import {createAuthHeadersFromStoreCredentials} from "../utils/createAuthHeadersFromStoreCredentials";

@Injectable()
export class StoreService {
    constructor(private dataSource: DataSource) {
    }

    async create(storeCreateDto: StoreCreateDto, id) {
        const {name, url, consumer_key, consumer_secret} = storeCreateDto;

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

        const furgonetka_access_token = await getToken();
        const user = await UserEntity.findOneBy({id});

        const store = new StoreEntity();
        store.url = url;
        store.name = name;
        store.consumer_secret = consumer_secret;
        store.consumer_key = consumer_key;
        store.user_profile = user;
        store.furgonetka_access_token = furgonetka_access_token;
        await store.save();
        return createResponse(true, `Pomyślnie skonfigurowano sklep`, 200);
    }

    public async getStoreByUserId(user_id: string): Promise<any> {
        const user = await UserEntity.findOneBy({id: user_id})
        const store = user.store
        const headers = createAuthHeadersFromStoreCredentials(store.consumer_key, store.consumer_secret);
        return {
            store_url: store.url,
            headers,
            furgonetka_access_token: store.furgonetka_access_token,
        }
    }

    async getOneById(id: string): Promise<any> {
        const store = await StoreEntity.findOneBy({id})
        return {
            store_url: store.url,
            store_name: store.name,
        }
    }

}
