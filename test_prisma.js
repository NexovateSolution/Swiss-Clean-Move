const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Testing Prisma connection...');
        const clientCount = await prisma.client.count();
        console.log('Client count:', clientCount);

        if (clientCount > 0) {
            const firstClient = await prisma.client.findFirst();
            console.log('First client sample:', JSON.stringify(firstClient, null, 2));
        } else {
            console.log('No clients found in database.');
        }
    } catch (e) {
        console.error('Prisma Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
