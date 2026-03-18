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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createWorker(workerData) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { dni: workerData.dni }
            });
            if (existingUser) {
                return existingUser;
            }
            const defaultCompany = await this.prisma.company.findFirst();
            if (!defaultCompany) {
                throw new Error('No existen empresas en la base de datos para asignar al trabajador.');
            }
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
            let inductionCourse = await this.prisma.course.findFirst({
                where: { courseType: 'InduccionCorta' }
            });
            if (!inductionCourse) {
                inductionCourse = await this.prisma.course.create({
                    data: {
                        title: 'Inducción de Seguridad SSOMA',
                        description: 'Curso obligatorio de seguridad para personal contratista.',
                        courseType: 'InduccionCorta',
                        isPublished: true,
                        timeLimitHours: 2,
                    }
                });
            }
            await this.prisma.enrollment.create({
                data: {
                    userId: newUser.id,
                    courseId: inductionCourse.id,
                    status: 'EnProgreso',
                    progressPercentage: 0
                }
            });
            return newUser;
        }
        catch (error) {
            console.error('[USERS] Error creating worker:', error);
            throw new Error('No se pudo crear el trabajador en la base de datos central');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map