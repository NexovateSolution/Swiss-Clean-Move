const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const c = await prisma.client.findFirst({ orderBy: { createdAt: 'desc' } });
  console.log(JSON.stringify(c, null, 2));
  await prisma.$disconnect();
}
main().catch(err => { console.error(err); prisma.$disconnect(); });
