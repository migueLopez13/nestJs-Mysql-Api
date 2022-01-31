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
    const user = this.contactRepository.insert(
      this.mapper.dtoToEntity(contact),
    );
    this.credentialRepository.insert(
      new Credential(contact.id, contact.password),
    );
    return user;
  }

  update(id: string, contactToUpdate: ContactDTO): Promise<any> {
    return this.contactRepository.update(id, contactToUpdate);
  }

  delete(id: string): Promise<any> {
    return this.contactRepository.delete(id);
  }
}
