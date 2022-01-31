import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/common/entities/contact.entity';
import { Credential } from 'src/common/entities/credential.entity';
import environment from 'src/enviroment';
import { ContactBookModule } from '../contact-book/contact-book.module';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { CredentialMapper } from './mappers/credential.mapper';
import { JwtStrategy } from './strategies/jwt.strategy';

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
  providers: [AuthRepository, CredentialMapper, JwtStrategy],
  exports: [AuthRepository],
})
export class AuthModule {}
