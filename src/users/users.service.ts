import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async createWorker(workerData: any) {
        try {
            // Check if user already exists
            const existingUser = await this.prisma.user.findUnique({
                where: { dni: workerData.dni }
            });

            if (existingUser) {
                return existingUser; // Or throw ConflictException based on business needs
            }

            // Get default company for MVP
            const defaultCompany = await this.prisma.company.findFirst();
            if (!defaultCompany) {
                throw new Error('No existen empresas en la base de datos para asignar al trabajador.');
            }

            // Create new temporary worker
            const newUser = await this.prisma.user.create({
                data: {
                    dni: workerData.dni,
                    name: workerData.nombre,
                    lastName: workerData.apellido,
                    password: workerData.password,
                    role: 'Trabajador',
                    userType: 'Temporal',
                    email: workerData.email || null,
                    company: {
                        connect: { id: defaultCompany.id }
                    }
                }
            });
            return newUser;
        } catch (error) {
            console.error('[USERS] Error creating worker:', error);
            throw new Error('No se pudo crear el trabajador en la base de datos central');
        }
    }
}
