import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await hashPassword('admin123')
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@swisscleanmove.ch' },
    update: {},
    create: {
      email: 'admin@swisscleanmove.ch',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN'
    }
  })

  console.log('Created admin user:', admin)

  // Create sample client data
  const sampleClient = await prisma.client.create({
    data: {
      firstName: 'Steinegger',
      lastName: 'Michel',
      email: 'michel.steinegger@hotmail.ch',
      phone: '079 586 88 66',
      address: 'Hauptstrasse 91',
      postalCode: '2552',
      location: 'Orpund',
      squareMeters: 93,
      serviceType: 'Apartment cleaning',
      buildingType: 'Apartment',
      fromDate: new Date('2025-09-27T08:00:00'),
      untilDate: new Date('2025-10-03T10:00:00'),
      totalPrice: 900,
      paidAmount: 0,
      balance: 900,
      status: 'UNPAID'
    }
  })

  console.log('Created sample client:', sampleClient)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
