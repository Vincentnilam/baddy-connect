import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { VerificationService } from '../verification/verification.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private verifService;
    constructor(userService: UsersService, jwtService: JwtService, verifService: VerificationService);
    signup(username: string, email: string, password: string): Promise<User>;
    login(username: string, password: string): Promise<{
        accessToken: string;
    }>;
    verifyAccount(token: string): Promise<{
        message: string;
    }>;
}
