import { Injectable } from '@nestjs/common';
import { ContactDTO } from 'src/common/dto/contact.dto';
import { AuthRepository } from 'src/shared/repositories/auth.repository';
import { ContactBookRepository } from 'src/shared/repositories/contact-book.repository';

@Injectable()
export class ContactService {
  constructor(
    private readonly contactRepository: ContactBookRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  findAll(): Promise<ContactDTO[]> {
    return this.contactRepository.find();
  }

  findOne(id: string): Promise<ContactDTO> {
    return this.contactRepository.findOne(id);
  }

  create(contact: ContactDTO) {
    this.contactRepository.insert(contact);
    this.authRepository.insert(contact);
  }

  update(id: string, contactToUpdate: ContactDTO): Promise<any> {
    this.authRepository.updateByContact(id, contactToUpdate);
    return this.contactRepository.update(id, contactToUpdate);
  }

  delete(id: string): Promise<any> {
    this.authRepository.deleteByContact(id);
    return this.contactRepository.delete(id);
  }
}
