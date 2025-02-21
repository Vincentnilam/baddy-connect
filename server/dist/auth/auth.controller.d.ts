import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(username: string, email: string, password: string): Promise<import("../entities/user.entity").User>;
    sign(username: string, password: string): Promise<{
        accessToken: string;
    }>;
    getMe(req: any): Promise<{
        message: string;
    }>;
    verifyAccount(token: string): Promise<{
        message: string;
    }>;
}
