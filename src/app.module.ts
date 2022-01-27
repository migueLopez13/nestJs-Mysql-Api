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
      password: environment.REDIS_PASSWD,
    }),
    ContactBookModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environment.MYSQL_HOST,
      port: 3308,
      username: environment.MYSQL_USER,
      password: environment.MYSQL_USER_PASS,
      database: environment.MYSQL_DB_NAME,
      entities: [Contact, Credential],
      synchronize: true,
      cache: true,
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
