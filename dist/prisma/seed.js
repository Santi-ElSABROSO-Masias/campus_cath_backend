"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const company = await prisma.company.create({
        data: {
            name: 'Empresa Contratista Demo',
            isActive: true,
        },
    });
    const user = await prisma.user.upsert({
        where: { dni: 'temp_12345678' },
        update: {},
        create: {
            dni: 'temp_12345678',
            email: 'trabajador.demo@contratista.com',
            name: 'Juan',
            lastName: 'Perez',
            password: 'password123',
            role: 'Trabajador',
            userType: 'Temporal',
            companyId: company.id,
        },
    });
    console.log('Seed exitoso. Usuario de prueba creado:');
    console.log(`DNI: ${user.dni} | Password: ${user.password}`);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map