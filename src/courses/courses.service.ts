import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CoursesService {
    private readonly logger = new Logger(CoursesService.name);

    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.course.findMany({
            where: { isPublished: true },
            include: {
                modules: {
                    include: {
                        activities: {
                            orderBy: { sequenceOrder: 'asc' },
                        },
                    },
                    orderBy: { sequenceOrder: 'asc' },
                },
            },
        });
    }

    async syncInductionContent(data: { titulo: string; tipo: string; urlStorage: string }) {
        this.logger.log(`Syncing content from Pueba_CATH: ${data.titulo}`);

        // Auto-create or find the main Induction Course to attach this content to.
        let inductionCourse = await this.prisma.course.findFirst({
            where: { courseType: 'InduccionCorta' },
        });

        if (!inductionCourse) {
            inductionCourse = await this.prisma.course.create({
                data: {
                    title: 'Inducción de Seguridad SSOMA',
                    description: 'Curso obligatorio de seguridad para personal contratista.',
                    courseType: 'InduccionCorta',
                    isPublished: true,
                    timeLimitHours: 2,
                },
            });
            this.logger.log('Auto-created main Induction Course');
        }

        // Auto-create or find a default Module for the course
        let defaultModule = await this.prisma.courseModule.findFirst({
            where: { courseId: inductionCourse.id },
        });

        if (!defaultModule) {
            defaultModule = await this.prisma.courseModule.create({
                data: {
                    courseId: inductionCourse.id,
                    title: 'Materiales de Inducción',
                    sequenceOrder: 1,
                },
            });
        }

        // Map Express 'tipo' to Prisma ActivityType enum
        let activityType: any = 'Documento';
        let typeInput = String(data.tipo).toLowerCase();

        if (typeInput === 'video') activityType = 'Video';
        if (typeInput === 'audio' || typeInput === 'scorm') activityType = 'SCORM';
        if (typeInput === 'pdf' || typeInput === 'texto') activityType = 'Documento';

        // Figure out the next sequence order
        const lastActivity = await this.prisma.activity.findFirst({
            where: { moduleId: defaultModule.id },
            orderBy: { sequenceOrder: 'desc' },
        });
        const nextOrder = lastActivity ? lastActivity.sequenceOrder + 1 : 1;

        // Create the new activity synced from Pueba_CATH
        const newActivity = await this.prisma.activity.create({
            data: {
                moduleId: defaultModule.id,
                activityType: activityType,
                title: data.titulo,
                contentUrl: data.urlStorage || '#',
                sequenceOrder: nextOrder,
            },
        });

        return {
            success: true,
            message: 'Contenido sincronizado al curso correctamente',
            activity: newActivity
        };
    }
}
