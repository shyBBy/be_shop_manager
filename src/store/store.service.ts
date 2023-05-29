import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {DataSource} from "typeorm";
import {StoreCreateDto} from "./dto/create-store.dto";
import {StoreEntity} from "./entities/store.entity";
import {createResponse} from "../utils/createResponse";
import {checkStoreUtils} from "../utils/checkStore.utils";

@Injectable()
export class StoreService {
    constructor(private dataSource: DataSource) {
    }

    async create(storeCreateDto: StoreCreateDto) {
        const {name, url, consumer_key, consumer_secret, admin_login, admin_password} = storeCreateDto


        const isInvalidStore = await checkStoreUtils(admin_login, admin_password, url)

        if (isInvalidStore) {
            throw new HttpException(
                {
                    message: `Nie uzyskano autoryzacji dla sklepu: ${url}`,
                    isSuccess: false,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        const isStoreExist = await StoreEntity.findOneBy({url})

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
        return createResponse(true, `Pomyślnie skonfigurowano sklep`, 200)

    }
}
