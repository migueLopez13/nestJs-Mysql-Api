import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ContactDTO } from 'src/common/dto/contact.dto';
import environment from 'src/enviroment';
import { ContactService } from 'src/modules/contact-book/contact.service';
import { JWTPayload } from '../payload/jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private contact: ContactService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.JWT_SECRET,
    });
  }

  async validate(payload: JWTPayload): Promise<ContactDTO> {
    const contact = await this.contact.findOne(payload.contactId);
    if (!contact) {
      throw new UnauthorizedException();
    }
    return contact;
  }
}
