import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/common/entities/contact.entity';
import { Credential } from 'src/common/entities/credential.entity';
import { ContactBookModule } from '../contact-book/contact-book.module';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { CredentialMapper } from './mappers/credential.mapper';

@Module({
  imports: [
    forwardRef(() => ContactBookModule),
    JwtModule.register({
      secret: 'patata',
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([Contact, Credential]),
  ],
  controllers: [AuthController],
  providers: [AuthRepository, CredentialMapper],
  exports: [AuthRepository, CredentialMapper],
})
export class AuthModule {}
