import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() signInDto: Record<string, any>) {
        if (!signInDto.username || !signInDto.password) {
            throw new UnauthorizedException('Username and password are required');
        }
        return this.authService.login(signInDto.username, signInDto.password);
    }
}
