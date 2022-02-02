import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactDTO } from 'src/common/dto/contact.dto';
import { Contact } from 'src/common/entities/contact.entity';
import { Repository } from 'typeorm';
import { ContactMapper } from '../mappers/contact.mapper';

@Injectable()
export class ContactBookRepository {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly mapper: ContactMapper,
  ) {}

  find = () => this.contactRepository.find();

  findOne = (id: string) => this.contactRepository.findOne(id);

  findOneByName = (name: string) => this.contactRepository.findOne({ name });

  insert = (contact: ContactDTO) =>
    this.contactRepository.insert(this.mapper.dtoToEntity(contact));

  update = (id: string, contactToUpdate: ContactDTO) =>
    this.contactRepository.update(id, this.mapper.dtoToEntity(contactToUpdate));

  delete = (id: string) => this.contactRepository.delete(id);
}
