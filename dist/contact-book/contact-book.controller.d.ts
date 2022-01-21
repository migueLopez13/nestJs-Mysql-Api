import { ContactBookService } from './contact-book.service';
import { ContactDTO } from './common/dto/contact.dto';
export declare class ContactBookController {
    private readonly contactBookService;
    constructor(contactBookService: ContactBookService);
    findContact(params: any): Promise<import("./common/interface/contact.interface").Contact>;
    find(): Promise<import("./common/interface/contact.interface").Contact[]>;
    create(contact: ContactDTO): Promise<import("typeorm").InsertResult | import("@nestjs/common").HttpException>;
    update(params: any, contact: ContactDTO): void;
    delete(params: any): void;
}
