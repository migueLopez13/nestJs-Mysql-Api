import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact as ContactTable } from '../../../common/entities/contact.entity';
import { ContactDTO } from 'src/common/dto/contact.dto';
import { ContactMapper } from '../mappers/contact.mapper';
import { Credential } from 'src/common/entities/credential.entity';

@Injectable()
export class ContactBookRepository {
  constructor(
    @InjectRepository(ContactTable)
    private readonly contactRepository: Repository<ContactTable>,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
    private readonly mapper: ContactMapper,
  ) {}

  async findAll(): Promise<ContactDTO[]> {
    return (await this.contactRepository.find()).map(this.mapper.entityToDto);
  }

  async findOne(id: string): Promise<ContactDTO> {
    return this.mapper.entityToDto(await this.contactRepository.findOne(id));
  }

  async create(contact: ContactDTO) {
    const user = await this.contactRepository.insert(
      this.mapper.dtoToEntity(contact),
    );
    await this.credentialRepository.insert(
      new Credential(contact.id, contact.password),
    );
    return user;
  }

  async update(id: string, contactToUpdate: ContactDTO): Promise<any> {
    const credential = await this.credentialRepository.findOne(id);
    this.credentialRepository.update(
      credential.id,
      new Credential(contactToUpdate.id, contactToUpdate.password),
    );
    return this.contactRepository.update(id, contactToUpdate);
  }

  async delete(id: string): Promise<any> {
    const credential = await this.credentialRepository.findOne(id);
    await this.credentialRepository.delete(credential.id);
    return this.contactRepository.delete(id);
  }
}
