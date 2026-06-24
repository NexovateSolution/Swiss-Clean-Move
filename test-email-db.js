const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const latest = await prisma.serviceFormSubmission.findFirst({
    orderBy: { createdAt: 'desc' },
  });
  console.log('Latest submission id:', latest.id);
  console.log('emailDebug:', latest.data.emailDebug || latest.emailDebug || 'Not found');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
