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
import { ContactDTO } from '../../common/dto/contact.dto';
import { ContactService } from './contact.service';

@Controller('contact-book')
export class ContactBookController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  find() {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') params) {
    return this.contactService.findOne(params.id);
  }

  @Post()
  create(@Body(ValidationPipe) contact: ContactDTO) {
    return this.contactService.create(contact);
  }

  @Put(':id')
  update(@Param('id') params, @Body(ValidationPipe) contact: ContactDTO) {
    this.contactService.update(params.id, contact);
  }

  @Delete(':id')
  delete(@Param('id') params) {
    this.contactService.delete(params.id);
  }
}
