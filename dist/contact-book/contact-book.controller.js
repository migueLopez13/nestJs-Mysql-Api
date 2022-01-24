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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactBookController = void 0;
const common_1 = require("@nestjs/common");
const contact_book_service_1 = require("./contact-book.service");
const contact_dto_1 = require("../common/dto/contact.dto");
const login_dto_1 = require("../common/dto/login.dto");
const auth_service_1 = require("./auth.service");
let ContactBookController = class ContactBookController {
    constructor(contactBookService, authService) {
        this.contactBookService = contactBookService;
        this.authService = authService;
    }
    findContact(params) {
        return this.contactBookService.find(params.id);
    }
    find() {
        return this.contactBookService.findAll();
    }
    create(contact) {
        return this.contactBookService.create(contact);
    }
    update(params, contact) {
        this.contactBookService.update(params.id, contact);
    }
    delete(params) {
        this.contactBookService.delete(params.id);
    }
    async login(userLogin) {
        const { name, password } = userLogin;
        const valid = await this.authService.validateContact(name, password);
        if (!valid) {
            throw new common_1.UnauthorizedException();
        }
        return await this.authService.generateAccessToken(name);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContactBookController.prototype, "findContact", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContactBookController.prototype, "find", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_dto_1.ContactDTO]),
    __metadata("design:returntype", void 0)
], ContactBookController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, contact_dto_1.ContactDTO]),
    __metadata("design:returntype", void 0)
], ContactBookController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContactBookController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], ContactBookController.prototype, "login", null);
ContactBookController = __decorate([
    (0, common_1.Controller)('contact-book'),
    __metadata("design:paramtypes", [contact_book_service_1.ContactBookService,
        auth_service_1.AuthService])
], ContactBookController);
exports.ContactBookController = ContactBookController;
//# sourceMappingURL=contact-book.controller.js.map