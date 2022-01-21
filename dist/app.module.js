"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contact_entity_1 = require("./contact-book/common/dto/contact.entity");
const contact_book_module_1 = require("./contact-book/contact-book.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const redisStore = require("cache-manager-redis-store");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register({
                store: redisStore,
                host: 'redis',
                port: 6379,
                password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
            }),
            contact_book_module_1.ContactBookModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'db',
                port: 3308,
                username: 'root',
                password: 'root',
                database: 'contact_book',
                entities: [contact_entity_1.Contact],
                synchronize: true,
                cache: true,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
        ],
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map