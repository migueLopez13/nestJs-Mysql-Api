import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact as ContactTable } from './common/dto/contact.entity';
import { Contact } from './common/interface/contact.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ContactBookService {
  constructor(
    @InjectRepository(ContactTable)
    private contactRepository: Repository<ContactTable>,
  ) {}

  findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  find(id: string): Promise<Contact> {
    return this.contactRepository.findOne(id);
  }

  async create(contact: Contact) {
    if (contact.id === undefined) {
      return this.createNewContact(contact);
    }
    const oldContact = await this.contactRepository.findOne(contact.id);
    return new HttpException(`contact  ${oldContact.id} already exists`, 500);
  }

  private createNewContact(contact: Contact) {
    contact.id = uuidv4();
    return this.contactRepository.insert(contact);
  }

  update(id: number, contactToUpdate: Contact): Promise<any> {
    return this.contactRepository.update(id, contactToUpdate);
  }

  delete(id: number): Promise<any> {
    return this.contactRepository.delete(id);
  }
}
