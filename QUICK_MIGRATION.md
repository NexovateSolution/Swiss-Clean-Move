# ⚡ Quick Migration Guide - TL;DR

## 🚀 5-Step Migration (15 minutes)

### **1️⃣ Backup SQLite Data**
```bash
npm run db:backup
```
✅ Creates backup in `backups/` folder

---

### **2️⃣ Get PostgreSQL Database**

**Easiest: Vercel Postgres (Free)**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Storage → Create Database → Postgres
3. Region: Europe (Frankfurt)
4. Copy connection string from Settings

**Alternative: Supabase (Free)**
1. Go to [supabase.com](https://supabase.com)
2. New Project → Choose Europe region
3. Settings → Database → Copy URI

---

### **3️⃣ Update .env.local**

Replace this:
```env
DATABASE_URL="file:./dev.db"
```

With this (your PostgreSQL URL):
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

---

### **4️⃣ Push Schema & Restore Data**

```bash
# Generate Prisma Client
npx prisma generate

# Create tables in PostgreSQL
npx prisma db push

# Restore your data
npm run db:restore
```

---

### **5️⃣ Verify & Test**

```bash
# Open Prisma Studio to check data
npx prisma studio

# Start dev server
npm run dev
```

Test:
- ✅ Login works
- ✅ Dashboard shows data
- ✅ Can add clients/payments

---

## ✅ Done!

Your database is now PostgreSQL! 🎉

---

## 🆘 Quick Fixes

**Error: Can't connect**
→ Check DATABASE_URL is correct

**Error: SSL required**
→ Add `?sslmode=require` to URL

**Data missing**
→ Run `npm run db:restore` again

---

**Full Guide:** See `MIGRATION_STEPS.md`
