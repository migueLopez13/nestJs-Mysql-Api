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
exports.ContactBookService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contact_entity_1 = require("./common/dto/contact.entity");
const uuid_1 = require("uuid");
let ContactBookService = class ContactBookService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    findAll() {
        return this.contactRepository.find();
    }
    find(id) {
        return this.contactRepository.findOne(id);
    }
    async create(contact) {
        if (contact.id === undefined) {
            return this.createNewContact(contact);
        }
        const oldContact = await this.contactRepository.findOne(contact.id);
        return new common_1.HttpException(`contact  ${oldContact.id} already exists`, 500);
    }
    createNewContact(contact) {
        contact.id = (0, uuid_1.v4)();
        return this.contactRepository.insert(contact);
    }
    update(id, contactToUpdate) {
        return this.contactRepository.update(id, contactToUpdate);
    }
    delete(id) {
        return this.contactRepository.delete(id);
    }
};
ContactBookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactBookService);
exports.ContactBookService = ContactBookService;
//# sourceMappingURL=contact-book.service.js.map