import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { ContactBookService } from './contact-book.service';
import { ContactDTO } from '../common/dto/contact.dto';
import { LoginDto } from 'src/common/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('contact-book')
export class ContactBookController {
  constructor(
    private readonly contactBookService: ContactBookService,
    private readonly authService: AuthService,
  ) {}

  @Get(':id')
  findContact(@Param('id') params) {
    return this.contactBookService.find(params.id);
  }

  @Get()
  find() {
    return this.contactBookService.findAll();
  }

  @Post()
  create(@Body(ValidationPipe) contact: ContactDTO) {
    return this.contactBookService.create(contact);
  }

  @Put(':id')
  update(@Param('id') params, @Body(ValidationPipe) contact: ContactDTO) {
    this.contactBookService.update(params.id, contact);
  }

  @Delete(':id')
  delete(@Param('id') params) {
    this.contactBookService.delete(params.id);
  }

  @Post('/login')
  async login(@Body() userLogin: LoginDto) {
    const { name, password } = userLogin;
    const valid = await this.authService.validateContact(name, password);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authService.generateAccessToken(name);
  }
}
