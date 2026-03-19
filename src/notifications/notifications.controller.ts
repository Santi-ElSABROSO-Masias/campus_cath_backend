import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('api/notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Post('send-credentials')
    async sendCredentials(
        @Body() body: { email: string; nombre: string; username: string; password: string },
    ) {
        const { email, nombre, username, password } = body;

        if (!email) {
            return { sent: false, message: 'No se proporcionó email' };
        }

        const result = await this.notificationsService.sendCredentialsEmail(
            email,
            nombre,
            username,
            password,
        );

        return result;
    }
}
