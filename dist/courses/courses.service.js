"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CoursesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CoursesService = CoursesService_1 = class CoursesService {
    prisma;
    logger = new common_1.Logger(CoursesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async syncInductionContent(data) {
        this.logger.log(`Syncing content from Pueba_CATH: ${data.titulo}`);
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
        let activityType = 'Documento';
        let typeInput = String(data.tipo).toLowerCase();
        if (typeInput === 'video')
            activityType = 'Video';
        if (typeInput === 'audio' || typeInput === 'scorm')
            activityType = 'SCORM';
        if (typeInput === 'pdf' || typeInput === 'texto')
            activityType = 'Documento';
        const lastActivity = await this.prisma.activity.findFirst({
            where: { moduleId: defaultModule.id },
            orderBy: { sequenceOrder: 'desc' },
        });
        const nextOrder = lastActivity ? lastActivity.sequenceOrder + 1 : 1;
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
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = CoursesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map