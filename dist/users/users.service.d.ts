import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createWorker(workerData: any): Promise<{
        id: string;
        dni: string;
        email: string | null;
        name: string;
        lastName: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        userType: import("@prisma/client").$Enums.UserType;
        companyId: string;
    }>;
}
