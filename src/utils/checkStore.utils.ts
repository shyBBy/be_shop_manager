import axios from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';

export const checkStoreUtils = async (admin_login: string, admin_password: string, store_url: string) => {
    try {
        const response = await axios.post(store_url'/wp-json/jwt-auth/v1/token', {
            username: admin_login,
            password: admin_password,
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new HttpException(
            {
                message: 'Coś poszło nie tak.',
                isSuccess: false,
            },
            HttpStatus.BAD_REQUEST,
        );
    }
};
