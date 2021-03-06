import {
  Module,
  CacheModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Contact } from './common/entities/contact.entity';
import { ContactBookModule } from './modules/contact-book/contact-book.module';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './modules/auth/auth.module';
import { Credential } from './common/entities/credential.entity';
import environment from './enviroment';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: environment.REDIS_HOST,
      port: environment.REDIS_PORT,
      password: environment.REDIS_PASSWD,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environment.MYSQL_HOST,
      port: environment.MYSQL_PORT,
      username: environment.MYSQL_USER,
      password: environment.MYSQL_USER_PASS,
      database: environment.MYSQL_DB_NAME,
      entities: [Contact, Credential],
      synchronize: false,
      cache: true,
    }),
    ContactBookModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'contact-book', method: RequestMethod.POST })
      .forRoutes('/contact-book');
  }
}
