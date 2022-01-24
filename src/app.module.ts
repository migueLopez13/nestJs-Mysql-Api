import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Contact } from './common/entities/contact.entity';
import { ContactBookModule } from './contact-book/contact-book.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      port: 6379,
      password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
    }),
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
