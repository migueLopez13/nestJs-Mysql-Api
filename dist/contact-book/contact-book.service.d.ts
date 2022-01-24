import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact as ContactTable } from '../common/entities/contact.entity';
import { Contact } from '../common/interface/contact.interface';
export declare class ContactBookService {
    private contactRepository;
    constructor(contactRepository: Repository<ContactTable>);
    findAll(): Promise<Contact[]>;
    find(id: string): Promise<Contact>;
    findByName(name: string): Promise<ContactTable>;
    create(contact: Contact): Promise<import("typeorm").InsertResult | HttpException>;
    private createNewContact;
    update(id: number, contactToUpdate: Contact): Promise<any>;
    delete(id: number): Promise<any>;
}
