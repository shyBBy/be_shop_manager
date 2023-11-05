import {IsNotEmpty, IsString} from "class-validator";

export class WpLoginDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    userEmail: string;

}

export class WpTokenDto {
    @IsNotEmpty()
    @IsString()
    wpToken: string;
}