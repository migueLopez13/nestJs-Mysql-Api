import { ContactBookService } from 'src/contact-book/contact-book.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private contactBookService;
    private jwtService;
    constructor(contactBookService: ContactBookService, jwtService: JwtService);
    validateContact(name: string, pass: string): Promise<boolean>;
    generateAccessToken(name: string): Promise<{
        access_token: string;
    }>;
}
