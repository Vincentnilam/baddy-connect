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
exports.VerificationService = void 0;
const common_1 = require("@nestjs/common");
const verificationtoken_entity_1 = require("../entities/verificationtoken.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const mail_service_1 = require("../mail/mail.service");
let VerificationService = class VerificationService {
    constructor(verifRepo, mailService) {
        this.verifRepo = verifRepo;
        this.mailService = mailService;
    }
    async generateAndSendToken(user) {
        const token = crypto.randomUUID();
        await this.createToken(user, token);
        await this.mailService.sendVerificationEmail(user.email, token);
    }
    async createToken(user, token) {
        const verifToken = this.verifRepo.create({
            token,
            user,
            createdAt: new Date(),
        });
        await this.verifRepo.save(verifToken);
    }
    async findByToken(token) {
        return this.verifRepo.findOne({
            where: { token },
            relations: ['user'],
        });
    }
    async deleteToken(token) {
        await this.verifRepo.delete({ token });
    }
};
exports.VerificationService = VerificationService;
exports.VerificationService = VerificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(verificationtoken_entity_1.VerificationToken)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        mail_service_1.MailService])
], VerificationService);
//# sourceMappingURL=verification.service.js.map