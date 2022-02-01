import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactDTO } from 'src/common/dto/contact.dto';
import { Credential } from 'src/common/entities/credential.entity';
import { Repository } from 'typeorm';
import { CredentialMapper } from '../mappers/credential.mapper';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Credential)
    private readonly authRepository: Repository<Credential>,
    private readonly mapper: CredentialMapper,
  ) {}

  findByContactId = (id: string) =>
    this.authRepository.findOne({ contactId: id });

  insert = (contact: ContactDTO) =>
    this.authRepository.create(this.mapper.entityFromContactDTO(contact));

  updateByContact = async (contactId: string, contactToUpdate: ContactDTO) =>
    this.authRepository.update(
      await this.findByContactId(contactId),
      contactToUpdate,
    );

  deleteByContact = async (id: string) =>
    this.authRepository.delete(await this.findByContactId(id));
}
