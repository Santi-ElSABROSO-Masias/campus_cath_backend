import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(signInDto: Record<string, any>): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            lastName: string;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
}
