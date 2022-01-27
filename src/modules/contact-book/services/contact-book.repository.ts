import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Contact,
  Contact as ContactTable,
} from '../../../common/entities/contact.entity';

import { ContactDTO } from 'src/common/dto/contact.dto';
import { ContactMapper } from '../mappers/contact.mapper';

@Injectable()
export class ContactBookRepository {
  constructor(
    @InjectRepository(ContactTable)
    private readonly contactRepository: Repository<ContactTable>,
    private readonly mapper: ContactMapper,
  ) {}

  async findAll(): Promise<ContactDTO[]> {
    return (await this.contactRepository.find()).map(this.mapper.entityToDto);
  }

  async findOne(idOrName: string): Promise<ContactDTO> {
    return this.mapper.entityToDto(
      await this.contactRepository.findOne(idOrName),
    );
  }

  async findEagle(id: string): Promise<Contact> {
    return await this.contactRepository.findOne(id, {
      relations: ['Credential'],
    });
  }

  async create(contact: ContactDTO) {
    return this.contactRepository.insert(this.mapper.dtoToEntity(contact));
  }

  update(id: string, contactToUpdate: ContactDTO): Promise<any> {
    return this.contactRepository.update(id, contactToUpdate);
  }

  delete(id: string): Promise<any> {
    return this.contactRepository.delete(id);
  }
}
