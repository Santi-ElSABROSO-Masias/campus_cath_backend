import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(dni: string, pass: string): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            lastName: string;
            role: import("@prisma/client").$Enums.Role;
            dni: string;
        };
    }>;
}
