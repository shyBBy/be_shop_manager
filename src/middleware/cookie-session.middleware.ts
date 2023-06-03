import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Odczytaj wartości z sesji lub ciasteczka
    const userId = req.session.userId;
    const someValue = req.session.someValue;

    // Możesz przypisać odczytane wartości do `req.user` lub innego właściwego obiektu
    req.user = {
      id: userId,
      someValue: someValue,
    };

    next();
  }
}
