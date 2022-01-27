import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialDTO } from 'src/common/dto/credential.dto';
import { Credential } from 'src/common/entities/credential.entity';
import { Repository } from 'typeorm';

import { JWTPayload } from './jwt.payload';
import { CredentialMapper } from './mappers/credential.mapper';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
    private readonly mapper: CredentialMapper,
    private jwtService: JwtService,
  ) {}

  async validateContact(contactId: string, pass: string): Promise<boolean> {
    const credential = await this.credentialRepository.findOne(contactId);
    return await credential.validatePassword(pass);
  }

  async generateAccessToken(contactId: string) {
    const payload: JWTPayload = { contactId: contactId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async findByContactId(id: string): Promise<CredentialDTO> {
    return this.mapper.entityToDto(await this.credentialRepository.findOne(id));
  }

  async create(credential: CredentialDTO) {
    return this.credentialRepository.insert(
      this.mapper.dtoToEntity(credential),
    );
  }

  update(id: string, credentialToUpdate: CredentialDTO): Promise<any> {
    return this.credentialRepository.update(id, credentialToUpdate);
  }
}
