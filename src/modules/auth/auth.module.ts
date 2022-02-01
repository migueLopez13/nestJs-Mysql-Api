import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/common/entities/contact.entity';
import { Credential } from 'src/common/entities/credential.entity';
import environment from 'src/enviroment';
import { ContactBookModule } from '../contact-book/contact-book.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { ContactMapper } from 'src/shared/mappers/contact.mapper';
import { CredentialMapper } from 'src/shared/mappers/credential.mapper';
import { AuthRepository } from 'src/shared/repositories/auth.repository';
import { ContactBookRepository } from 'src/shared/repositories/contact-book.repository';

@Module({
  imports: [
    forwardRef(() => ContactBookModule),
    PassportModule,
    JwtModule.register({
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([Contact, Credential]),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    ContactBookRepository,
    AuthRepository,
    ContactMapper,
    CredentialMapper,
  ],
  exports: [AuthService],
})
export class AuthModule {}
