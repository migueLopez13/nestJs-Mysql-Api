import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/common/entities/contact.entity';
import { Credential } from 'src/common/entities/credential.entity';
import { Repository } from 'typeorm';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private jwtService: JwtService,
  ) {}

  async validateContact(name: string, password: string): Promise<boolean> {
    const contact = await this.contactRepository.findOne({ name });
    const credential = await this.credentialRepository.findOne({
      contactId: contact.id,
    });
    return await credential.validatePassword(password);
  }

  async generateAccessToken(name: string) {
    const contact = await this.contactRepository.findOne({ name });
    const payload: JWTPayload = { contactId: contact.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
