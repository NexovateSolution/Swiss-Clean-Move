const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sub = await prisma.serviceFormSubmission.findFirst({
    where: { telephone: '098765432' },
    orderBy: { createdAt: 'desc' }
  });
  console.log(JSON.stringify(sub, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
