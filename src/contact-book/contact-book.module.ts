import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../common/entities/contact.entity';
import { AuthService } from './auth.service';
import { ContactBookController } from './contact-book.controller';
import { ContactBookService } from './contact-book.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
    JwtModule.register({
      secret: 'patata',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [ContactBookController],
  providers: [ContactBookService, AuthService],
  exports: [ContactBookService],
})
export class ContactBookModule {}
