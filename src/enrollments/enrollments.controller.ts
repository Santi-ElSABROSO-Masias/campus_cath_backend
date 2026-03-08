import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/enrollments')
export class EnrollmentsController {
    constructor(private readonly enrollmentsService: EnrollmentsService) { }

    @UseGuards(JwtAuthGuard)
    @Get('my-progress')
    async getMyProgress(@Request() req: any) {
        const userId = req.user.userId || req.user.sub || req.user.id;
        return this.enrollmentsService.getMyProgress(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('attempts')
    async markActivityCompleted(@Request() req: any, @Body() body: { enrollmentId: string, activityId: string }) {
        const userId = req.user.userId || req.user.sub || req.user.id;
        return this.enrollmentsService.markActivityCompleted(userId, body.enrollmentId, body.activityId);
    }
}
