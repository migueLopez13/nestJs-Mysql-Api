import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './common/dto/contact.entity';
import { ContactBookController } from './contact-book.controller';
import { ContactBookService } from './contact-book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [ContactBookController],
  providers: [ContactBookService],
})
export class ContactBookModule {}
