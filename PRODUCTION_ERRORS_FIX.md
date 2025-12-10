# 🚨 Production Database Connection Fix

## **Problem**
All API endpoints are returning 500 errors because the database connection is failing.

---

## **Root Cause**
The `DATABASE_URL` environment variable is **not set in Vercel**, so Prisma cannot connect to your Supabase database.

---

## **✅ Solution: Add Environment Variables to Vercel**

### **Step 1: Go to Vercel Environment Variables**

1. Open https://vercel.com/dashboard
2. Select your **Swiss-Clean-Move** project
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)

### **Step 2: Add Required Environment Variables**

Add these **EXACT** variables (copy from your local `.env` file):

#### **1. DATABASE_URL** (REQUIRED)
```
DATABASE_URL=postgresql://postgres.rtggohmoxlozknrpdrgr:SwissCleanMove123@aws-1-eu-central-1.pooler.supabase.com:5432/postgres
```
- **Environment:** Production, Preview, Development (check all 3)

#### **2. JWT_SECRET** (REQUIRED)
```
JWT_SECRET=d04a5103ab98f3e5c26a220aecc897c20cd3ded3989bcf4eecc62bab958224a4f953ef671554469fa0ab332f6aab3e3c004d2b38044ae8d0104c19b96bfc437a
```
- **Environment:** Production, Preview, Development (check all 3)

#### **3. NEXTAUTH_SECRET** (REQUIRED)
```
NEXTAUTH_SECRET=a1e2e5e9422c32f28f1ef0c7db103c530ce6bab321789143511183cefbd37b799b38b62ffd729cd3c6824eab1a4b0a4cde91f3e6b5056fd3c585a289116752ae
```
- **Environment:** Production, Preview, Development (check all 3)

#### **4. GMAIL_USER** (REQUIRED for emails)
```
GMAIL_USER=mikiyasdesalegn9@gmail.com
```
- **Environment:** Production, Preview, Development (check all 3)

#### **5. GMAIL_APP_PASSWORD** (REQUIRED for emails)
```
GMAIL_APP_PASSWORD=tufptmkjhstwelcf
```
- **Environment:** Production, Preview, Development (check all 3)

#### **6. NEXTAUTH_URL** (REQUIRED)
```
NEXTAUTH_URL=https://your-production-domain.vercel.app
```
- **Replace** `your-production-domain` with your actual Vercel domain
- **Environment:** Production only

---

## **Step 3: Redeploy**

After adding all environment variables:

1. Go to **Deployments** tab
2. Click the **3 dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes

---

## **Step 4: Verify Database Connection**

After redeployment:

1. Go to your production site
2. Try to log in to admin panel
3. Check if clients/data appear
4. Test API endpoints

---

## **🔍 Why This Happened**

When you deploy to Vercel:
- ❌ `.env` and `.env.local` files are **NOT uploaded** (they're in `.gitignore`)
- ❌ Environment variables must be **manually added** in Vercel Dashboard
- ❌ Without `DATABASE_URL`, Prisma cannot connect to the database

---

## **📋 Quick Checklist**

- [ ] Add `DATABASE_URL` to Vercel
- [ ] Add `JWT_SECRET` to Vercel
- [ ] Add `NEXTAUTH_SECRET` to Vercel
- [ ] Add `GMAIL_USER` to Vercel
- [ ] Add `GMAIL_APP_PASSWORD` to Vercel
- [ ] Add `NEXTAUTH_URL` to Vercel
- [ ] Enable Vercel Blob Storage (for photos)
- [ ] Redeploy application
- [ ] Test admin login
- [ ] Test client data loading

---

## **🎯 Expected Result**

After adding environment variables and redeploying:
- ✅ Admin panel loads without errors
- ✅ Clients data appears
- ✅ Analytics dashboard works
- ✅ Quotes and contacts load
- ✅ Photo upload works (after Blob setup)

---

## **🚨 Important Notes**

### **Database URL Format:**
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Your Supabase connection string:
- **User:** `postgres.rtggohmoxlozknrpdrgr`
- **Password:** `SwissCleanMove123`
- **Host:** `aws-1-eu-central-1.pooler.supabase.com`
- **Port:** `5432`
- **Database:** `postgres`

### **Security:**
- ✅ Environment variables are **encrypted** in Vercel
- ✅ They are **NOT exposed** in the browser
- ✅ Only server-side code can access them

### **Data Migration:**
Your data is safe in Supabase! Once you add the `DATABASE_URL`:
- ✅ All clients will reappear
- ✅ All quotes will be accessible
- ✅ All contacts will load
- ✅ Nothing was deleted

---

## **📚 Reference**

See `VERCEL_DEPLOYMENT.md` for complete deployment guide.

---

## **Need Help?**

If errors persist after adding environment variables:

1. Check Vercel deployment logs:
   - Go to **Deployments** → Click latest deployment → **View Function Logs**

2. Common issues:
   - Wrong `DATABASE_URL` format
   - Missing environment variables
   - Supabase connection pooler not enabled

3. Verify Supabase:
   - Go to Supabase dashboard
   - Check if database is active
   - Verify connection string is correct
