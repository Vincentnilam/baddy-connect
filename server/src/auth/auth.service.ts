import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
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

        return this.userService.create(username, email, hashedPass);
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
}
