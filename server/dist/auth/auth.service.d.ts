import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    signup(username: string, email: string, password: string): Promise<User>;
    login(username: string, password: string): Promise<{
        accessToken: string;
    }>;
}
