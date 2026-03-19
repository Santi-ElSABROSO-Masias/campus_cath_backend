import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    sendCredentials(body: {
        email: string;
        nombre: string;
        username: string;
        password: string;
    }): Promise<{
        sent: boolean;
        messageId?: string;
    } | {
        sent: boolean;
        message: string;
    }>;
}
