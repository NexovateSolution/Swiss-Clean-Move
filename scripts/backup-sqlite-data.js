/**
 * Backup SQLite Data Before Migration
 * Run this before migrating to PostgreSQL
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function backupData() {
  try {
    console.log('📦 Starting SQLite data backup...\n');

    // Fetch all data
    const users = await prisma.user.findMany();
    const clients = await prisma.client.findMany({
      include: {
        payments: true,
        photos: true,
        invoices: true,
      },
    });
    const contacts = await prisma.contactSubmission.findMany();
    const quotes = await prisma.quoteSubmission.findMany();

    const backup = {
      timestamp: new Date().toISOString(),
      users,
      clients,
      contacts,
      quotes,
      stats: {
        users: users.length,
        clients: clients.length,
        payments: clients.reduce((sum, c) => sum + c.payments.length, 0),
        photos: clients.reduce((sum, c) => sum + c.photos.length, 0),
        invoices: clients.reduce((sum, c) => sum + c.invoices.length, 0),
        contacts: contacts.length,
        quotes: quotes.length,
      },
    };

    // Save backup
    const backupDir = path.join(__dirname, '..', 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const filename = `backup-${new Date().toISOString().replace(/:/g, '-')}.json`;
    const filepath = path.join(backupDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(backup, null, 2));

    console.log('✅ Backup completed successfully!\n');
    console.log('📊 Backup Statistics:');
    console.log(`   - Users: ${backup.stats.users}`);
    console.log(`   - Clients: ${backup.stats.clients}`);
    console.log(`   - Payments: ${backup.stats.payments}`);
    console.log(`   - Photos: ${backup.stats.photos}`);
    console.log(`   - Invoices: ${backup.stats.invoices}`);
    console.log(`   - Contacts: ${backup.stats.contacts}`);
    console.log(`   - Quotes: ${backup.stats.quotes}`);
    console.log(`\n💾 Backup saved to: ${filepath}\n`);

    return filepath;
  } catch (error) {
    console.error('❌ Backup failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

backupData()
  .then(() => {
    console.log('🎉 Backup process completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Backup process failed:', error);
    process.exit(1);
  });
