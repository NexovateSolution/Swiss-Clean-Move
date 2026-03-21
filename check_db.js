const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.client.findFirst({where: {firstName: "John", lastName: "Wick"}})
  .then(c => console.log("Prefix for John Wick:", c?.prefix))
  .catch(console.error)
  .finally(()=>prisma.$disconnect());
