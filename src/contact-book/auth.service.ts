import { Injectable } from '@nestjs/common';
import { ContactBookService } from 'src/contact-book/contact-book.service';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private contactBookService: ContactBookService,
    private jwtService: JwtService,
  ) {}

  async validateContact(name: string, pass: string): Promise<boolean> {
    const contact = await this.contactBookService.findByName(name);
    return await contact.validatePassword(pass);
  }

  async generateAccessToken(name: string) {
    const contact = await this.contactBookService.findByName(name);
    const payload: JWTPayload = { contactId: contact.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
