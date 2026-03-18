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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let EnrollmentsService = class EnrollmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMyProgress(userId) {
        const enrollments = await this.prisma.enrollment.findMany({
            where: { userId },
            include: {
                user: true,
                course: {
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
                },
                attempts: true,
            },
        });
        return enrollments.map(enrollment => {
            const totalActivities = enrollment.course.modules.reduce((acc, mod) => acc + mod.activities.length, 0);
            const completedAttempts = enrollment.attempts.filter(a => a.status === 'Completado').length;
            const computedProgress = totalActivities > 0
                ? Math.round((completedAttempts / totalActivities) * 100)
                : 0;
            return {
                ...enrollment,
                computedProgress,
            };
        });
    }
    async markActivityCompleted(userId, enrollmentId, activityId) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { id: enrollmentId }
        });
        if (!enrollment || enrollment.userId !== userId) {
            throw new Error('No autorizado o matrícula no encontrada');
        }
        const existingAttempt = await this.prisma.activityAttempt.findFirst({
            where: { enrollmentId, activityId }
        });
        if (existingAttempt) {
            if (existingAttempt.status === 'Completado')
                return existingAttempt;
            return this.prisma.activityAttempt.update({
                where: { id: existingAttempt.id },
                data: { status: 'Completado', completedAt: new Date() }
            });
        }
        return this.prisma.activityAttempt.create({
            data: {
                enrollmentId,
                activityId,
                status: 'Completado',
                completedAt: new Date()
            }
        });
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map