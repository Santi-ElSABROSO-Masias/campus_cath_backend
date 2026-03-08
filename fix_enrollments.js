const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Fetching all users and courses...");
    const users = await prisma.user.findMany();
    const courses = await prisma.course.findMany();

    if (courses.length === 0) {
        console.log("No courses found to enroll users into.");
        return;
    }

    let enrolledCount = 0;
    for (const user of users) {
        for (const course of courses) {
            // Check if already enrolled
            const existing = await prisma.enrollment.findFirst({
                where: { userId: user.id, courseId: course.id }
            });

            if (!existing) {
                await prisma.enrollment.create({
                    data: {
                        userId: user.id,
                        courseId: course.id,
                        status: 'EnProgreso'
                    }
                });
                enrolledCount++;
            }
        }
    }

    console.log(`Successfully created ${enrolledCount} missing enrollments!`);
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
