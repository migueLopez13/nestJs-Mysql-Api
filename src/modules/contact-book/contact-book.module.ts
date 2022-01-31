import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/common/entities/contact.entity';
import { Credential } from 'src/common/entities/credential.entity';
import { AuthModule } from '../auth/auth.module';
import { ContactBookController } from './contact-book.controller';
import { ContactMapper } from './mappers/contact.mapper';
import { ContactBookRepository } from './services/contact-book.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact, Credential]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ContactBookController],
  providers: [ContactBookRepository, ContactMapper],
  exports: [ContactBookRepository],
})
export class ContactBookModule {}
