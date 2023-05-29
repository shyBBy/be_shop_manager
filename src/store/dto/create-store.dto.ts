import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { StoreCreate } from "../../../types/store/store";

export class StoreCheckDto {
    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    admin_login: string;

    @IsString()
    @IsNotEmpty()
    admin_password: string;
};

export class StoreCreateDto implements StoreCreate {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    consumer_key: string;

    @IsString()
    @IsNotEmpty()
    consumer_secret: string;
}

export class StoreProfileDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    consumer_key: string;

    @IsString()
    @IsNotEmpty()
    consumer_secret: string;

    @IsString()
    @IsNotEmpty()
    admin_login: string;

    @IsString()
    @IsNotEmpty()
    admin_password: string;
}
