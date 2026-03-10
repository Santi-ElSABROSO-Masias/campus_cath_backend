import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getMyMessages(req: any): Promise<({
        sender: {
            id: string;
            name: string;
            lastName: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        senderId: string;
        receiverId: string;
        content: string;
        isRead: boolean;
        createdAt: Date;
    })[]>;
    sendMessage(req: any, body: {
        receiverId: string;
        content: string;
    }): Promise<{
        id: string;
        senderId: string;
        receiverId: string;
        content: string;
        isRead: boolean;
        createdAt: Date;
    }>;
    markAsRead(req: any, messageId: string): Promise<{
        id: string;
        senderId: string;
        receiverId: string;
        content: string;
        isRead: boolean;
        createdAt: Date;
    } | null>;
}
