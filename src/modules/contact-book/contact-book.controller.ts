import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ContactBookRepository } from './services/contact-book.repository';
import { ContactDTO } from '../../common/dto/contact.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('contact-book')
export class ContactBookController {
  constructor(private readonly contactBookRepository: ContactBookRepository) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  find() {
    return this.contactBookRepository.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') params) {
    return this.contactBookRepository.findOne(params.id);
  }

  @Post()
  create(@Body(ValidationPipe) contact: ContactDTO) {
    return this.contactBookRepository.create(contact);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') params, @Body(ValidationPipe) contact: ContactDTO) {
    this.contactBookRepository.update(params.id, contact);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') params) {
    this.contactBookRepository.delete(params.id);
  }
}
