import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createWorker(workerData: any): Promise<{
        status: string;
        message: string;
        user: {
            id: string;
            username: string;
        };
    }>;
}
