import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ContactBookService } from './contact-book.service';
import { ContactDTO } from './common/dto/contact.dto';

@Controller('contact-book')
export class ContactBookController {
  constructor(private readonly contactBookService: ContactBookService) {}

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
}
