export declare class NotificationsService {
    private transporter;
    constructor();
    sendCredentialsEmail(email: string, nombre: string, username: string, password: string): Promise<{
        sent: boolean;
        messageId?: string;
    }>;
}
