const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUsers() {
    const users = await prisma.user.findMany();
    console.log(JSON.stringify(users, null, 2));
}

checkUsers().finally(() => window.process ? process.exit(0) : null);
