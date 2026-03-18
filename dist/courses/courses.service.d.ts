import { PrismaService } from '../prisma.service';
export declare class CoursesService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
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
    })[]>;
    syncInductionContent(data: {
        titulo: string;
        tipo: string;
        urlStorage: string;
    }): Promise<{
        success: boolean;
        message: string;
        activity: {
            id: string;
            title: string;
            sequenceOrder: number;
            moduleId: string;
            activityType: import("@prisma/client").$Enums.ActivityType;
            contentUrl: string;
            passingScore: number | null;
        };
    }>;
}
