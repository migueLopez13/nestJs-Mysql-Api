import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Contact } from './contact-book/common/dto/contact.entity';
import { ContactBookModule } from './contact-book/contact-book.module';

@Module({
  imports: [
    ContactBookModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3308,
      username: 'root',
      password: 'root',
      database: 'contact_book',
      entities: [Contact],
      synchronize: true,
      cache: true,
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
