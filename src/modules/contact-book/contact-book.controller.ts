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
import { ContactDTO } from '../../common/dto/contact.dto';
import { AuthGuard } from '@nestjs/passport';
import { ContactService } from './contact.service';

@Controller('contact-book')
export class ContactBookController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  find() {
    return this.contactService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') params) {
    return this.contactService.findOne(params.id);
  }

  @Post()
  create(@Body(ValidationPipe) contact: ContactDTO) {
    return this.contactService.create(contact);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') params, @Body(ValidationPipe) contact: ContactDTO) {
    this.contactService.update(params.id, contact);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') params) {
    this.contactService.delete(params.id);
  }
}
