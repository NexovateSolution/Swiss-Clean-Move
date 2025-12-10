# 🚀 Database Migration - Step by Step Instructions

## ✅ What's Been Done

1. ✅ Updated Prisma schema to use PostgreSQL
2. ✅ Created backup script
3. ✅ Created restore script
4. ✅ Added npm scripts for easy migration

---

## 📋 Migration Steps

### **Option A: Using Vercel Postgres (Recommended - Easiest)**

#### **Step 1: Backup Current SQLite Data**

```bash
npm run db:backup
```

This will create a backup file in `backups/backup-[timestamp].json`

---

#### **Step 2: Set Up Vercel Postgres**

**Option 2a: If you already have a Vercel account:**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose name: `swisscleanmove-db`
6. Choose region: **Europe (Frankfurt)** (closest to Switzerland)
7. Click "Create"

**Option 2b: If you don't have Vercel yet:**

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub/GitLab/Email
3. Follow steps above

---

#### **Step 3: Get Database Connection String**

1. In Vercel, click on your new database
2. Go to "Settings" tab
3. Scroll to "Connection String"
4. Click "Show" next to `POSTGRES_PRISMA_URL`
5. Copy the entire connection string

It will look like:
```
postgresql://default:xxxxx@ep-xxx-xxx.eu-central-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require
```

---

#### **Step 4: Update .env.local**

Open `.env.local` and update the `DATABASE_URL`:

```env
# Replace the old SQLite URL with your PostgreSQL URL
DATABASE_URL="postgresql://default:xxxxx@ep-xxx-xxx.eu-central-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require"

# Keep other variables
JWT_SECRET="your-super-secret-jwt-key-min-32-chars-CHANGE-THIS"
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
```

---

#### **Step 5: Generate Prisma Client for PostgreSQL**

```bash
npx prisma generate
```

---

#### **Step 6: Create Database Schema**

```bash
npx prisma db push
```

This will create all tables in your PostgreSQL database.

---

#### **Step 7: Restore Your Data**

```bash
npm run db:restore
```

This will restore all your SQLite data to PostgreSQL.

---

#### **Step 8: Verify Migration**

```bash
npx prisma studio
```

This opens Prisma Studio where you can verify all your data was migrated correctly.

Check:
- ✅ Users table has your admin user
- ✅ Clients table has all clients
- ✅ Payments are linked to clients
- ✅ Photos are linked to clients
- ✅ Contact submissions are present
- ✅ Quote submissions are present

---

#### **Step 9: Test Your Application**

```bash
npm run dev
```

Test these features:
- ✅ Admin login works
- ✅ Dashboard loads
- ✅ Clients page shows data
- ✅ Can add new client
- ✅ Can add payment
- ✅ Can upload photo
- ✅ Forms work

---

### **Option B: Using Supabase (Free Alternative)**

#### **Step 1: Backup Data**
```bash
npm run db:backup
```

#### **Step 2: Create Supabase Project**

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click "New Project"
4. Fill in:
   - Name: `swisscleanmove`
   - Database Password: (generate strong password)
   - Region: **Europe (Frankfurt)**
5. Click "Create new project"

#### **Step 3: Get Connection String**

1. Go to Project Settings (gear icon)
2. Click "Database" in sidebar
3. Scroll to "Connection string"
4. Select "URI" tab
5. Copy the connection string
6. Replace `[YOUR-PASSWORD]` with your database password

#### **Step 4-9: Same as Vercel steps above**

---

### **Option C: Using Railway (Free $5 Credit)**

#### **Step 1: Backup Data**
```bash
npm run db:backup
```

#### **Step 2: Create Railway Project**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Click "Provision PostgreSQL"

#### **Step 3: Get Connection String**

1. Click on the PostgreSQL service
2. Go to "Variables" tab
3. Copy the `DATABASE_URL` value

#### **Step 4-9: Same as Vercel steps above**

---

## 🔍 Troubleshooting

### Error: "Can't reach database server"

**Solution:** 
- Check your internet connection
- Verify the DATABASE_URL is correct
- Check if your IP is whitelisted (Vercel allows all IPs by default)

---

### Error: "SSL connection required"

**Solution:**
Add `?sslmode=require` to the end of your DATABASE_URL:
```
postgresql://user:pass@host:5432/db?sslmode=require
```

---

### Error: "Prisma Client not generated"

**Solution:**
```bash
npx prisma generate
```

---

### Error: "Migration failed"

**Solution:**
1. Delete `prisma/migrations` folder (if exists)
2. Run `npx prisma db push` again

---

### Data didn't restore properly

**Solution:**
1. Check the backup file exists in `backups/` folder
2. Run restore again: `npm run db:restore`
3. Specify backup file: `node scripts/restore-to-postgres.js backups/backup-[timestamp].json`

---

## ✅ Post-Migration Checklist

After migration is complete:

- [ ] All users can login
- [ ] All clients are visible
- [ ] All payments are linked correctly
- [ ] All photos are accessible
- [ ] Contact forms work
- [ ] Quote forms work
- [ ] Dashboard shows correct data
- [ ] Analytics work
- [ ] Invoice generation works
- [ ] Email sending works

---

## 🎉 Success!

Once all checks pass, you've successfully migrated to PostgreSQL!

**Next steps:**
1. Update production environment variables
2. Deploy to production
3. Delete old SQLite database file (keep backup!)

---

## 📞 Need Help?

If you encounter any issues:

1. Check the error message carefully
2. Verify DATABASE_URL is correct
3. Ensure database allows connections
4. Check Prisma documentation: https://www.prisma.io/docs
5. Ask for help with the specific error message

---

## 🔒 Important Notes

- ✅ Keep your backup files safe
- ✅ Never commit DATABASE_URL to git
- ✅ Use strong database passwords
- ✅ Enable SSL connections
- ✅ Set up automated backups in production

---

**Estimated Time: 15-30 minutes**

Good luck! 🚀
