import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/common/entities/contact.entity';
import { Credential } from 'src/common/entities/credential.entity';
import { ContactMapper } from 'src/shared/mappers/contact.mapper';
import { CredentialMapper } from 'src/shared/mappers/credential.mapper';
import { AuthRepository } from 'src/shared/repositories/auth.repository';
import { ContactBookRepository } from 'src/shared/repositories/contact-book.repository';
import { AuthModule } from '../auth/auth.module';
import { ContactBookController } from './contact-book.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact, Credential]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ContactBookController],
  providers: [
    ContactService,
    ContactBookRepository,
    AuthRepository,
    ContactMapper,
    CredentialMapper,
  ],
  exports: [ContactService],
})
export class ContactBookModule {}
