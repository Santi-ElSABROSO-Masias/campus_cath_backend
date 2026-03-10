import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EnrollmentsService {
    constructor(private prisma: PrismaService) { }

    async getMyProgress(userId: string) {
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
            // Calculate progress based on completed attempts vs total activities
            const totalActivities = enrollment.course.modules.reduce(
                (acc, mod) => acc + mod.activities.length, 0
            );
            const completedAttempts = enrollment.attempts.filter(
                a => a.status === 'Completado'
            ).length;

            const computedProgress = totalActivities > 0
                ? Math.round((completedAttempts / totalActivities) * 100)
                : 0;

            return {
                ...enrollment,
                computedProgress,
            };
        });
    }

    async markActivityCompleted(userId: string, enrollmentId: string, activityId: string) {
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
            if (existingAttempt.status === 'Completado') return existingAttempt;
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
}
