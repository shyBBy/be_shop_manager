import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    })(req, res, next);
  }
}
