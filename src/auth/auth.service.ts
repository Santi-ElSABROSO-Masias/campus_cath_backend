import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async login(dni: string, pass: string) {
        console.log(`[AUTH] Intento de login recibido - DNI: '${dni}' | Password: '${pass}'`);
        // 1. Buscamos al trabajador/usuario por su DNI
        const user = await this.prisma.user.findUnique({ where: { dni } });
        console.log(`[AUTH] Usuario encontrado en BD:`, user ? user.dni : 'No encontrado');
        if (user) {
            console.log(`[AUTH] Password en BD: '${user.password}' | Password recibido: '${pass}'`);
            console.log(`[AUTH] Coinciden?:`, user.password === pass);
        }

        // 2. Comparamos la contraseña (Para MVP comparamos plano, en PROD debe usarse bcrypt)
        if (user && user.password === pass) {
            const payload = { username: user.dni, sub: user.id, role: user.role };

            // 3. Generamos el JWT
            return {
                access_token: this.jwtService.sign(payload),
                user: {
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    role: user.role,
                    dni: user.dni,
                }
            };
        }
        throw new UnauthorizedException('Credenciales inválidas');
    }
}
