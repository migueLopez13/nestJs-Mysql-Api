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
import { ContactBookRepository } from './services/contact-book.repository';
import { ContactDTO } from '../../common/dto/contact.dto';

@Controller('contact-book')
export class ContactBookController {
  constructor(private readonly contactBookRepository: ContactBookRepository) {}

  @Get()
  find() {
    return this.contactBookRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') params) {
    return this.contactBookRepository.findOne(params.id);
  }

  @Post()
  create(@Body(ValidationPipe) contact: ContactDTO) {
    return this.contactBookRepository.create(contact);
  }

  @Put(':id')
  update(@Param('id') params, @Body(ValidationPipe) contact: ContactDTO) {
    this.contactBookRepository.update(params.id, contact);
  }

  @Delete(':id')
  delete(@Param('id') params) {
    this.contactBookRepository.delete(params.id);
  }
}
