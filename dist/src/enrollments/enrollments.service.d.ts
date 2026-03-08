import { PrismaService } from '../prisma.service';
export declare class EnrollmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    getMyProgress(userId: string): Promise<{
        computedProgress: number;
        course: {
            modules: ({
                activities: {
                    id: string;
                    title: string;
                    sequenceOrder: number;
                    moduleId: string;
                    activityType: import("@prisma/client").$Enums.ActivityType;
                    contentUrl: string;
                    passingScore: number | null;
                }[];
            } & {
                id: string;
                title: string;
                courseId: string;
                sequenceOrder: number;
            })[];
        } & {
            id: string;
            title: string;
            description: string;
            courseType: import("@prisma/client").$Enums.CourseType;
            timeLimitHours: number | null;
            isPublished: boolean;
        };
        attempts: {
            id: string;
            status: import("@prisma/client").$Enums.AttemptStatus;
            enrollmentId: string;
            activityId: string;
            score: number | null;
            timeSpentSeconds: number | null;
            completedAt: Date | null;
        }[];
        id: string;
        enrolledAt: Date;
        status: import("@prisma/client").$Enums.EnrollmentStatus;
        progressPercentage: number;
        dueDate: Date | null;
        userId: string;
        courseId: string;
    }[]>;
    markActivityCompleted(userId: string, enrollmentId: string, activityId: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.AttemptStatus;
        enrollmentId: string;
        activityId: string;
        score: number | null;
        timeSpentSeconds: number | null;
        completedAt: Date | null;
    }>;
}
