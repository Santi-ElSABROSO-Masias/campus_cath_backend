import { PrismaService } from '../prisma.service';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    getMyMessages(userId: string): Promise<({
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
    sendMessage(senderId: string, receiverId: string, content: string): Promise<{
        id: string;
        senderId: string;
        receiverId: string;
        content: string;
        isRead: boolean;
        createdAt: Date;
    }>;
    markAsRead(messageId: string, userId: string): Promise<{
        id: string;
        senderId: string;
        receiverId: string;
        content: string;
        isRead: boolean;
        createdAt: Date;
    } | null>;
}
