/**
 * Restore Data to PostgreSQL
 * Run this after setting up PostgreSQL connection
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function restoreData(backupFile) {
  try {
    console.log('📥 Starting PostgreSQL data restore...\n');

    // Read backup file
    const backupPath = backupFile || findLatestBackup();
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Backup file not found: ${backupPath}`);
    }

    console.log(`📂 Reading backup from: ${backupPath}`);
    const backup = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));

    console.log('\n📊 Backup contains:');
    console.log(`   - Users: ${backup.stats.users}`);
    console.log(`   - Clients: ${backup.stats.clients}`);
    console.log(`   - Payments: ${backup.stats.payments}`);
    console.log(`   - Photos: ${backup.stats.photos}`);
    console.log(`   - Invoices: ${backup.stats.invoices}`);
    console.log(`   - Contacts: ${backup.stats.contacts}`);
    console.log(`   - Quotes: ${backup.stats.quotes}\n`);

    // Restore users
    console.log('👥 Restoring users...');
    for (const user of backup.users) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: user,
        create: user,
      });
    }
    console.log(`✅ Restored ${backup.users.length} users`);

    // Restore clients with relations
    console.log('🏢 Restoring clients...');
    for (const client of backup.clients) {
      const { payments, photos, invoices, ...clientData } = client;

      await prisma.client.upsert({
        where: { id: client.id },
        update: clientData,
        create: clientData,
      });

      // Restore payments
      for (const payment of payments) {
        await prisma.payment.upsert({
          where: { id: payment.id },
          update: payment,
          create: payment,
        });
      }

      // Restore photos
      for (const photo of photos) {
        await prisma.photo.upsert({
          where: { id: photo.id },
          update: photo,
          create: photo,
        });
      }

      // Restore invoices
      for (const invoice of invoices) {
        await prisma.invoice.upsert({
          where: { id: invoice.id },
          update: invoice,
          create: invoice,
        });
      }
    }
    console.log(`✅ Restored ${backup.clients.length} clients`);

    // Restore contacts
    console.log('📧 Restoring contact submissions...');
    for (const contact of backup.contacts) {
      await prisma.contactSubmission.upsert({
        where: { id: contact.id },
        update: contact,
        create: contact,
      });
    }
    console.log(`✅ Restored ${backup.contacts.length} contacts`);

    // Restore quotes
    console.log('💰 Restoring quote submissions...');
    for (const quote of backup.quotes) {
      await prisma.quoteSubmission.upsert({
        where: { id: quote.id },
        update: quote,
        create: quote,
      });
    }
    console.log(`✅ Restored ${backup.quotes.length} quotes`);

    console.log('\n🎉 Data restore completed successfully!\n');
  } catch (error) {
    console.error('❌ Restore failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

function findLatestBackup() {
  const backupDir = path.join(__dirname, '..', 'backups');
  if (!fs.existsSync(backupDir)) {
    throw new Error('No backups directory found');
  }

  const files = fs.readdirSync(backupDir)
    .filter(f => f.startsWith('backup-') && f.endsWith('.json'))
    .sort()
    .reverse();

  if (files.length === 0) {
    throw new Error('No backup files found');
  }

  return path.join(backupDir, files[0]);
}

// Get backup file from command line argument or use latest
const backupFile = process.argv[2];

restoreData(backupFile)
  .then(() => {
    console.log('✅ Restore process completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Restore process failed:', error);
    process.exit(1);
  });
