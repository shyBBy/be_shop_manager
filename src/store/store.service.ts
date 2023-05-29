/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { StoreCheckDto, StoreCreateDto } from './dto/create-store.dto';
import { StoreEntity } from './entities/store.entity';
import { createResponse } from '../utils/createResponse';
import { checkStoreUtils } from '../utils/checkStore.utils';
import axios from 'axios';

@Injectable()
export class StoreService {
    constructor(private dataSource: DataSource) { }

    async check(storeCheclDto: StoreCheckDto) {
        const { url, admin_login, admin_password } = storeCheclDto
        try {
            const response = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, {
                username: admin_login,
                password: admin_password,
            });

            console.log(response.data);

            const token = response.data.token

            if (token) {
                try {
                    //endpoint na sprawdzenie tokenu

                    return
                } catch (e) {

                }
            }


        } catch (error) {
            throw new HttpException(
                {
                    message: 'Coś poszło nie tak.',
                    isSuccess: false,
                },
                HttpStatus.BAD_REQUEST,
            );
        }


    }

    async create(storeCreateDto: StoreCreateDto) {
        const {
            name,
            url,
            consumer_key,
            consumer_secret,
        } = storeCreateDto;


        const isStoreExist = await StoreEntity.findOneBy({ url });

        if (isStoreExist) {
            throw new HttpException(
                {
                    message: `Sklep, który próbujesz dodać już istnieje w bazie danych..`,
                    isSuccess: false,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        const store = new StoreEntity();
        store.url = url;
        store.name = name;
        store.consumer_secret = consumer_secret;
        store.consumer_key = consumer_key;
        // await store.save();
        return createResponse(true, `Pomyślnie skonfigurowano sklep`, 200);
    }
}
