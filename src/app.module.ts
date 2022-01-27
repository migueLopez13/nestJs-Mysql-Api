import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Contact } from './common/entities/contact.entity';
import { ContactBookModule } from './modules/contact-book/contact-book.module';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './modules/auth/auth.module';
import { Credential } from './common/entities/credential.entity';
import environment from './enviroment';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      port: 6379,
      password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
    }),
    ContactBookModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environment.MYSQL_HOST,
      port: 3308,
      username: environment.MYSQL_USER,
      password: environment.MYSQL_USER_PASS,
      database: 'contact_book',
      entities: [Contact, Credential],
      synchronize: true,
      cache: true,
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
