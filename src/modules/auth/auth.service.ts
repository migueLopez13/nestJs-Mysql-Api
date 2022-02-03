import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from 'src/shared/repositories/auth.repository';
import { ContactBookRepository } from 'src/shared/repositories/contact-book.repository';
import { JWTPayload } from './payload/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly contactRepository: ContactBookRepository,
    private jwtService: JwtService,
  ) {}

  async validateContact(name: string, password: string): Promise<boolean> {
    const contact = await this.contactRepository.findOneByName(name);
    const credential = await this.authRepository.findByContactId(contact.id);
    return await credential.validatePassword(password);
  }

  async generateAccessToken(name: string) {
    const contact = await this.contactRepository.findOneByName(name);
    const payload: JWTPayload = { contactId: contact.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getPayload(token: string) {
    return this.jwtService.decode(token) as {
      contactId: string;
    };
  }
}
