import { ContactBookService } from './contact-book.service';
import { ContactDTO } from '../common/dto/contact.dto';
import { LoginDto } from 'src/common/dto/login.dto';
import { AuthService } from './auth.service';
export declare class ContactBookController {
    private readonly contactBookService;
    private readonly authService;
    constructor(contactBookService: ContactBookService, authService: AuthService);
    findContact(params: any): Promise<import("../common/interface/contact.interface").Contact>;
    find(): Promise<import("../common/interface/contact.interface").Contact[]>;
    create(contact: ContactDTO): Promise<import("typeorm").InsertResult | import("@nestjs/common").HttpException>;
    update(params: any, contact: ContactDTO): void;
    delete(params: any): void;
    login(userLogin: LoginDto): Promise<{
        access_token: string;
    }>;
}
