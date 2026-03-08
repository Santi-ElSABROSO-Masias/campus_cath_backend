import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCourses() {
        return this.coursesService.findAll();
    }

    @Post('induction/content')
    async syncContent(@Body() data: { titulo: string; tipo: string; urlStorage: string }) {
        if (!data.titulo || !data.tipo) {
            return { success: false, message: 'Invalid payload. Missing titulo or tipo.' };
        }
        return this.coursesService.syncInductionContent(data);
    }
}
