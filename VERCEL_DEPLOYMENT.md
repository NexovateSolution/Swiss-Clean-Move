# 🚀 Vercel Deployment Guide - SwissCleanMove

## ✅ Pre-Deployment Checklist

- [x] Code pushed to GitHub
- [x] TypeScript errors fixed
- [x] Database migrated to PostgreSQL (Supabase)
- [x] Strong JWT secrets generated
- [ ] Environment variables ready
- [ ] Vercel account created

---

## 📋 **Step-by-Step Deployment**

### **Step 1: Create Vercel Account (2 minutes)**

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

---

### **Step 2: Import Project (3 minutes)**

1. Click "Add New..." → "Project"
2. Find `Swiss-Clean-Move` repository
3. Click "Import"

---

### **Step 3: Configure Project Settings**

#### **Framework Preset:**
- ✅ Auto-detected: **Next.js**

#### **Build Settings:**
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `.next` (auto-filled)
- **Install Command:** `npm install` (auto-filled)

#### **Root Directory:**
- Leave as `.` (root)

---

### **Step 4: Add Environment Variables** ⚠️ **CRITICAL**

Click "Environment Variables" and add these **EXACT** values:

```env
DATABASE_URL
postgresql://postgres.rtggohmoxlozknrpdrgr:SwissCleanMove123@aws-1-eu-central-1.pooler.supabase.com:5432/postgres

JWT_SECRET
d04a5103ab98f3e5c26a220aecc897c20cd3ded3989bcf4eecc62bab958224a4f953ef671554469fa0ab332f6aab3e3c004d2b38044ae8d0104c19b96bfc437a

NEXTAUTH_SECRET
a1e2e5e9422c32f28f1ef0c7db103c530ce6bab321789143511183cefbd37b799b38b62ffd729cd3c6824eab1a4b0a4cde91f3e6b5056fd3c585a289116752ae

NEXTAUTH_URL
https://your-project.vercel.app

GMAIL_USER
mikiyasdesalegn9@gmail.com

GMAIL_APP_PASSWORD
tufptmkjhstwelcf
```

**Important Notes:**
- Add each variable separately (Name + Value)
- Select "Production", "Preview", and "Development" for all
- Don't add quotes around values
- Update `NEXTAUTH_URL` after deployment with your actual URL

---

### **Step 5: Deploy! 🚀**

1. Click "Deploy"
2. Wait 2-3 minutes for build
3. ✅ Your site will be live at: `https://your-project.vercel.app`

---

## 🌍 **Step 6: Connect Custom Domain (.ch)**

### **After First Deployment:**

1. Go to Project Settings → "Domains"
2. Click "Add Domain"
3. Enter: `www.swisscleanmove.ch` (or your client's domain)
4. Click "Add"

### **DNS Configuration:**

Vercel will show you DNS records. Tell your client to add these at their domain registrar:

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**For root domain:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Alternative (if A record doesn't work):**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

### **Update NEXTAUTH_URL:**

After domain is connected:
1. Go to Project Settings → Environment Variables
2. Find `NEXTAUTH_URL`
3. Update to: `https://www.swisscleanmove.ch`
4. Redeploy (Deployments → click "..." → Redeploy)

---

## ✅ **Step 7: Verify Deployment**

Test these features:

### **Public Pages:**
- ✅ Homepage loads
- ✅ Services pages work
- ✅ Contact form submits
- ✅ Quote form submits
- ✅ Language switching works (DE/FR/EN)

### **Admin Panel:**
- ✅ Login at `/admin/login`
- ✅ Dashboard loads
- ✅ Can view clients
- ✅ Can add payments
- ✅ Can upload photos
- ✅ Analytics work

### **Database:**
- ✅ Data persists
- ✅ Forms save to database
- ✅ Admin actions work

---

## 🔧 **Common Issues & Fixes**

### **Issue: Build Failed**

**Solution:**
- Check build logs in Vercel
- Verify all environment variables are set
- Make sure DATABASE_URL is correct

### **Issue: Can't Login to Admin**

**Solution:**
- Verify JWT_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### **Issue: Database Connection Error**

**Solution:**
- Verify DATABASE_URL is correct
- Check Supabase project is active
- Ensure connection string includes password

### **Issue: Emails Not Sending**

**Solution:**
- Verify GMAIL_USER and GMAIL_APP_PASSWORD
- Check Gmail App Password is still valid
- Test email in admin panel

---

## 🎯 **Post-Deployment Tasks**

### **1. Update NEXTAUTH_URL**
Once custom domain is connected, update the environment variable.

### **2. Test All Features**
Go through the checklist above.

### **3. Monitor Performance**
- Check Vercel Analytics
- Monitor error logs
- Watch for any issues

### **4. Set Up Automatic Deployments**
- ✅ Already configured!
- Every push to `main` branch auto-deploys
- Preview deployments for pull requests

---

## 📊 **Deployment Info**

| Item | Value |
|------|-------|
| **Hosting** | Vercel |
| **Region** | Auto (closest to user) |
| **Database** | Supabase (EU - Frankfurt) |
| **Domain** | .ch (Swiss) |
| **SSL** | Automatic (Let's Encrypt) |
| **CDN** | Global (Vercel Edge Network) |
| **Cost** | Free tier (or $20/month Pro) |

---

## 🔐 **Security Checklist**

- [x] Strong JWT secrets (128 characters)
- [x] Environment variables not in code
- [x] .env files in .gitignore
- [x] HTTPS enabled (automatic)
- [x] Security headers configured
- [x] Input sanitization implemented
- [x] Rate limiting added
- [x] SQL injection protection (Prisma)

---

## 🚀 **Performance Optimizations**

- ✅ Next.js 14 with App Router
- ✅ Static page generation
- ✅ Image optimization
- ✅ Code splitting
- ✅ CSS optimization
- ✅ Global CDN
- ✅ Edge caching

---

## 📞 **Support**

### **Vercel Issues:**
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support

### **Database Issues:**
- Supabase Docs: https://supabase.com/docs
- Check project status in dashboard

### **Domain Issues:**
- Verify DNS propagation: https://dnschecker.org
- Wait up to 48 hours for full propagation

---

## 🎉 **Success!**

Your SwissCleanMove website is now:
- ✅ **Live** on Vercel
- ✅ **Secure** with HTTPS
- ✅ **Fast** with global CDN
- ✅ **Scalable** with automatic scaling
- ✅ **Professional** with custom domain
- ✅ **Maintained** with auto-deployments

---

## 📝 **Next Steps**

1. **Test everything** thoroughly
2. **Show client** the live site
3. **Get feedback** and make adjustments
4. **Monitor** performance and errors
5. **Enjoy** your production-ready website! 🎊

---

**Deployment Time:** ~15 minutes  
**Difficulty:** Easy  
**Cost:** Free (or $20/month for Pro features)

**You've got this! 💪**
