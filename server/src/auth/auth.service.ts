import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { VerificationService } from '../verification/verification.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private verifService: VerificationService,
    ) {}

    async signup(username: string, email: string, password: string): Promise<User> {
        
        const existingUserByUsername = await this.userService.findOne(username);
        if (existingUserByUsername) {
            throw new ConflictException("Username is already taken.");
        }

        const existingUserByEmail = await this.userService.findByEmail(email);
        if (existingUserByEmail) {
            throw new ConflictException("Email is already taken.");
        }

        // else hashed password
        const hashedPass = await bcrypt.hash(password, 10);

        const user = await this.userService.create(username, email, hashedPass);
        await this.verifService.generateAndSendToken(user);

        return user;
        
    }

    async login(username: string, password: string): Promise<{ accessToken: string}> {
        const user = await this.userService.findOne(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException("Invalid username or password");
        }

        // generate jwt
        const payload = { username: user.username, sub: user.id};
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }

    async verifyAccount(token: string): Promise<{message: string }> {
        try {
            const verifToken = await this.verifService.findByToken(token);

            if (!verifToken) {
                throw new BadRequestException('Invalid or expired verification token');
            }

            const user = verifToken.user;

            if (!user) {
                throw new NotFoundException("User associated with this token isn't found");
            }
            // update to be verified
            await this.userService.update(user.id, { verified: true});
            // delete verif token after verified
            await this.verifService.deleteToken(token);

            return {message: 'Verified'};
        } catch (error) {
            return {message: 'Error'};
        }
    }
}
