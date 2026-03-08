import { CoursesService } from './courses.service';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    getCourses(): Promise<({
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
    syncContent(data: {
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
    } | {
        success: boolean;
        message: string;
    }>;
}
