const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Fetching enrollments...");
    const enrollments = await prisma.enrollment.findMany({
        include: {
            user: { select: { id: true, dni: true, name: true, lastName: true } },
            course: { select: { id: true, title: true } }
        }
    });
    console.dir(enrollments, { depth: null });
}
main().finally(() => prisma.$disconnect());
