import { Body, Controller, Post, Get, Request, UseGuards, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('signup')
    async signup(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.signup(username, email, password);
    }

    @Post('login')
    async sign(
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        return this.authService.login(username, password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getMe(@Request() req) {
        const user = req.user;
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            verified: user.verified,
        };
    }

    @Get('verify-email')
    async verifyAccount(@Query('token') token: string) {
        return await this.authService.verifyAccount(token);
    }
}
