import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserEntity } from '../user/entities/user.entity';
import { hashPwd } from '../utils/password.utils';
import { UserService } from '../user/user.service';
import { DataSource } from 'typeorm';
import { Response, Request} from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private dataSource: DataSource,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getByEmail(email);
    if (user && user.password === hashPwd(password)) {
      return user;
    }
    throw new BadRequestException('Błędny login lub hasło.');
  }

  async login(user: UserEntity, res: Response, req: Request) {
    const payload = { email: user.email };
    const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    const oneDay = 1000 * 60 * 60 * 24;

    const userRes = await this.userService.getMe(user);
    const store = await StoreEntity.findOneBy({userProfile: userRes.id})
    
    const headers = createAuthHeadersFromStoreCredentials(store.consumer_key, store.consumer_secret);
    
    req.session.data = {
      store_url: store.url,
      headers,
    }
    
    return res
      .cookie('jwt', token, {
        secure: Boolean(process.env.JWT_COOKIE_SECURE),
        domain: process.env.JWT_COOKIE_DOMAIN,
        httpOnly: Boolean(process.env.JWT_HTTP_ONLY),
        maxAge: oneDay,
      })
      .json(userRes);
  }
}
