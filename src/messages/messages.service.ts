import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService) { }

    async getMyMessages(userId: string) {
        return this.prisma.message.findMany({
            where: { receiverId: userId },
            include: {
                sender: {
                    select: { id: true, name: true, lastName: true, role: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async sendMessage(senderId: string, receiverId: string, content: string) {
        return this.prisma.message.create({
            data: {
                senderId,
                receiverId,
                content
            }
        });
    }

    async markAsRead(messageId: string, userId: string) {
        const message = await this.prisma.message.findUnique({ where: { id: messageId } });
        if (!message || message.receiverId !== userId) return null;

        return this.prisma.message.update({
            where: { id: messageId },
            data: { isRead: true }
        });
    }
}
