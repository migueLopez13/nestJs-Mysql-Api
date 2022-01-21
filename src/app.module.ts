import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Contact } from './contact-book/common/dto/contact.entity';
import { ContactBookModule } from './contact-book/contact-book.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    /**
     *      REDIS_HOST: redis
     *      REDIS_PORT: 6379
     *      REDIS_PASSWORD: eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81
     */
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
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
