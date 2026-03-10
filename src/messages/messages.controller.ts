import { Controller, Get, Post, Body, UseGuards, Request, Param, Patch } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @UseGuards(JwtAuthGuard)
    @Get('my-messages')
    async getMyMessages(@Request() req: any) {
        const userId = req.user.userId || req.user.sub || req.user.id;
        return this.messagesService.getMyMessages(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async sendMessage(@Request() req: any, @Body() body: { receiverId: string; content: string }) {
        const senderId = req.user.userId || req.user.sub || req.user.id;
        return this.messagesService.sendMessage(senderId, body.receiverId, body.content);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/read')
    async markAsRead(@Request() req: any, @Param('id') messageId: string) {
        const userId = req.user.userId || req.user.sub || req.user.id;
        return this.messagesService.markAsRead(messageId, userId);
    }
}
