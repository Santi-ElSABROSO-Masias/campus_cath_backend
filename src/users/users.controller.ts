import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('worker')
    async createWorker(@Body() workerData: any) {
        console.log('[USERS-API] Solicitud de creación de Trabajador recibida:', workerData.dni);
        const user = await this.usersService.createWorker(workerData);
        return {
            status: 'success',
            message: 'Trabajador creado en Supabase',
            user: { id: user.id, username: user.dni }
        };
    }
}
