/* eslint-disable prettier/prettier */
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import {StoreCreateDto} from './dto/create-store.dto';
import {StoreEntity} from './entities/store.entity';
import {createResponse} from '../utils/createResponse';
import {UserEntity} from "../user/entities/user.entity";

@Injectable()
export class StoreService {
    constructor(private dataSource: DataSource) {
    }

    async create(storeCreateDto: StoreCreateDto, userId) {
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

        const user = await UserEntity.findOneBy({id: userId})

        const store = new StoreEntity();
        store.url = url;
        store.name = name;
        store.consumer_secret = consumer_secret;
        store.consumer_key = consumer_key;
        store.userProfile = user;
        await store.save();
        return createResponse(true, `Pomyślnie skonfigurowano sklep`, 200);
    }

}
