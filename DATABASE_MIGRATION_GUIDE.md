# Database Migration Guide - SQLite to PostgreSQL

## ⚠️ CRITICAL: SQLite is NOT Production-Ready

Your current database uses SQLite (`file:./dev.db`), which is **NOT suitable for production** because:

- ❌ No concurrent access (locks on writes)
- ❌ No built-in backup/replication
- ❌ Limited scalability
- ❌ Risk of data corruption
- ❌ No remote access
- ❌ File-based (can be lost easily)

**You MUST migrate to PostgreSQL or MySQL before production deployment.**

---

## 🎯 Recommended: PostgreSQL Migration

### **Option 1: Vercel Postgres (Easiest - Recommended)**

**Free Tier Available:** 60 hours compute time/month

1. **Create Vercel Postgres Database**
   ```bash
   # In your Vercel dashboard:
   # 1. Go to Storage tab
   # 2. Click "Create Database"
   # 3. Select "Postgres"
   # 4. Choose your region (Europe for Swiss hosting)
   # 5. Copy the connection string
   ```

2. **Update Prisma Schema**
   ```prisma
   // prisma/schema.prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Update Environment Variables**
   ```bash
   # .env.local
   DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
   ```

4. **Run Migration**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   npx prisma db push
   ```

---

### **Option 2: Supabase (Free Tier - Good Alternative)**

**Free Tier:** 500MB database, unlimited API requests

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Choose region (Europe)
   - Copy connection string

2. **Get Connection String**
   ```
   Settings → Database → Connection String (Direct)
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

3. **Update .env.local**
   ```bash
   DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
   ```

4. **Run Migration**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

---

### **Option 3: Railway (Free $5 Credit)**

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Create new project
   - Add PostgreSQL service

2. **Get Connection String**
   - Click on PostgreSQL service
   - Copy `DATABASE_URL` from Variables tab

3. **Update .env.local**
   ```bash
   DATABASE_URL="postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway"
   ```

4. **Run Migration**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

---

### **Option 4: Neon (Serverless Postgres - Free Tier)**

**Free Tier:** 3GB storage, 100 hours compute/month

1. **Create Neon Account**
   - Go to [neon.tech](https://neon.tech)
   - Create new project
   - Choose region

2. **Get Connection String**
   ```
   postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

3. **Update .env.local**
   ```bash
   DATABASE_URL="postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require"
   ```

4. **Run Migration**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

---

## 📋 Migration Steps (Detailed)

### **Step 1: Backup Current Data**

```bash
# Export current SQLite data
npx prisma db pull
npx prisma generate

# Optional: Export to JSON for backup
node -e "
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function backup() {
  const data = {
    users: await prisma.user.findMany(),
    clients: await prisma.client.findMany({ include: { payments: true, photos: true, invoices: true } }),
    contacts: await prisma.contactSubmission.findMany(),
    quotes: await prisma.quoteSubmission.findMany(),
  };
  fs.writeFileSync('backup.json', JSON.stringify(data, null, 2));
  console.log('✅ Backup saved to backup.json');
}

backup().finally(() => prisma.\$disconnect());
"
```

### **Step 2: Update Prisma Schema**

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // Changed from sqlite
  url      = env("DATABASE_URL")
}

// Rest of your models remain the same...
```

### **Step 3: Create Migration**

```bash
# Delete old migrations (if any)
rm -rf prisma/migrations

# Create new migration for PostgreSQL
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### **Step 4: Seed Database (Optional)**

If you have existing data to migrate:

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  const backup = JSON.parse(fs.readFileSync('backup.json', 'utf-8'))
  
  // Seed users
  for (const user of backup.users) {
    await prisma.user.create({ data: user })
  }
  
  // Seed clients with relations
  for (const client of backup.clients) {
    const { payments, photos, invoices, ...clientData } = client
    await prisma.client.create({
      data: {
        ...clientData,
        payments: { create: payments },
        photos: { create: photos },
        invoices: { create: invoices },
      },
    })
  }
  
  console.log('✅ Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Run seed:
```bash
npx tsx prisma/seed.ts
```

### **Step 5: Test Connection**

```bash
# Test database connection
npx prisma db pull

# Open Prisma Studio to verify data
npx prisma studio
```

### **Step 6: Update Production Environment**

In your hosting platform (Vercel, Netlify, etc.):

1. Add `DATABASE_URL` environment variable
2. Add `JWT_SECRET` (generate new one)
3. Add `GMAIL_USER` and `GMAIL_APP_PASSWORD`
4. Deploy

---

## 🔒 Security Checklist After Migration

- [ ] Database connection uses SSL (`?sslmode=require`)
- [ ] Database password is strong (32+ characters)
- [ ] Connection string is in environment variables (not hardcoded)
- [ ] Database has automated backups enabled
- [ ] Database is in same region as your app (for speed)
- [ ] Database access is restricted by IP (if possible)

---

## 🚨 Common Issues & Solutions

### Issue: "Can't reach database server"
**Solution:** Check if your IP is whitelisted, or if database allows all IPs

### Issue: "SSL connection required"
**Solution:** Add `?sslmode=require` to connection string

### Issue: "Migration failed"
**Solution:** Delete `prisma/migrations` folder and run `npx prisma migrate dev --name init` again

### Issue: "Prisma Client not generated"
**Solution:** Run `npx prisma generate` after any schema changes

---

## 💰 Cost Comparison (Monthly)

| Provider | Free Tier | Paid Tier |
|----------|-----------|-----------|
| **Vercel Postgres** | 60 hours compute | $20/month |
| **Supabase** | 500MB, unlimited requests | $25/month |
| **Railway** | $5 credit | $5/month |
| **Neon** | 3GB, 100 hours | $19/month |
| **PlanetScale** | 5GB storage | $29/month |

**Recommendation:** Start with **Vercel Postgres** or **Supabase** free tier.

---

## ✅ Final Verification

After migration, test these features:

- [ ] Admin login works
- [ ] Client creation works
- [ ] Payment tracking works
- [ ] Photo upload works
- [ ] Invoice generation works
- [ ] Contact form submissions work
- [ ] Quote requests work
- [ ] Email sending works
- [ ] Analytics dashboard loads
- [ ] Export to Excel/PDF works

---

## 📞 Need Help?

If you encounter issues during migration:

1. Check Prisma documentation: https://www.prisma.io/docs
2. Check your database provider's docs
3. Verify environment variables are set correctly
4. Check database connection string format
5. Ensure database allows connections from your IP/region

---

**⚠️ IMPORTANT: Do NOT deploy to production with SQLite!**

Complete this migration BEFORE submitting to your client.
