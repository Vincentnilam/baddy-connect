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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const verification_service_1 = require("../verification/verification.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, verifService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.verifService = verifService;
    }
    async signup(username, email, password) {
        const existingUserByUsername = await this.userService.findOne(username);
        if (existingUserByUsername) {
            throw new common_1.ConflictException("Username is already taken.");
        }
        const existingUserByEmail = await this.userService.findByEmail(email);
        if (existingUserByEmail) {
            throw new common_1.ConflictException("Email is already taken.");
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await this.userService.create(username, email, hashedPass);
        await this.verifService.generateAndSendToken(user);
        return user;
    }
    async login(username, password) {
        const user = await this.userService.findOne(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException("Invalid username or password");
        }
        const payload = { username: user.username, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
    async verifyAccount(token) {
        try {
            const verifToken = await this.verifService.findByToken(token);
            if (!verifToken) {
                throw new common_1.BadRequestException('Invalid or expired verification token');
            }
            const user = verifToken.user;
            if (!user) {
                throw new common_1.NotFoundException("User associated with this token isn't found");
            }
            await this.userService.update(user.id, { verified: true });
            await this.verifService.deleteToken(token);
            return { message: 'Verified' };
        }
        catch (error) {
            return { message: 'Error' };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        verification_service_1.VerificationService])
], AuthService);
//# sourceMappingURL=auth.service.js.map