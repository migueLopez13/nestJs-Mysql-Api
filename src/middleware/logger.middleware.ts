import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from 'src/modules/auth/payload/jwt.payload';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (
      !req.headers.authorization ||
      req.headers.authorization.split(' ')[0] !== 'Bearer'
    ) {
      return res.status(403).send({ message: 'invalid authorization' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload: JWTPayload = this.jwtService.decode(token) as {
      contactId: string;
    };

    req.user = payload.contactId;
    next();
  }
}
