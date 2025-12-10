# Vercel Blob Storage Setup Guide

## 🎯 **Why This is Needed**

The photo gallery upload feature requires cloud storage because:
- ❌ **Vercel's filesystem is read-only** - uploaded files are lost after deployment
- ✅ **Vercel Blob** provides persistent cloud storage for files
- ✅ **Free tier available** - 500MB storage included

---

## 📋 **Setup Steps**

### **1. Enable Vercel Blob Storage**

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: **Swiss-Clean-Move**
3. Click on **Storage** tab in the top navigation
4. Click **Create Database** → Select **Blob**
5. Click **Create** (no configuration needed)

### **2. Connect to Your Project**

After creating the Blob store:
1. Vercel will automatically add the `BLOB_READ_WRITE_TOKEN` environment variable
2. This token is automatically available to all deployments
3. **No manual configuration needed!**

### **3. Verify Setup**

The environment variable should be automatically set:
```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

You can verify this in:
- **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

---

## ✅ **What's Already Done**

The code has been updated to use Vercel Blob:
- ✅ `@vercel/blob` package installed
- ✅ Photo upload API updated (`/api/admin/photos/upload/route.ts`)
- ✅ Photo management API updated (`/api/admin/photos/route.ts`)
- ✅ All photos will be stored in the cloud

---

## 🚀 **How It Works**

### **Before (Filesystem - Doesn't work on Vercel):**
```
Upload → Save to /public/uploads/ → ❌ Lost after deployment
```

### **After (Vercel Blob - Works in production):**
```
Upload → Save to Vercel Blob → ✅ Permanent cloud storage
```

---

## 📸 **Photo Storage Structure**

Photos are organized by client:
```
clients/
  ├── client-id-1/
  │   ├── 1702234567890_photo1.jpg
  │   └── 1702234567891_photo2.png
  └── client-id-2/
      └── 1702234567892_photo3.jpg
```

---

## 💰 **Pricing**

### **Free Tier (Hobby Plan):**
- ✅ 500MB storage
- ✅ 5GB bandwidth/month
- ✅ Perfect for small to medium projects

### **Pro Plan (if needed):**
- 100GB storage
- 1TB bandwidth/month
- $0.15/GB for additional storage

---

## 🔧 **Troubleshooting**

### **Issue: Photos not uploading**
**Solution:**
1. Check Vercel dashboard → Storage → Verify Blob is created
2. Check Environment Variables → Verify `BLOB_READ_WRITE_TOKEN` exists
3. Redeploy the application

### **Issue: "Missing BLOB_READ_WRITE_TOKEN"**
**Solution:**
1. Go to Vercel Dashboard → Your Project → Storage
2. If no Blob store exists, create one
3. The token will be automatically added
4. Redeploy

### **Issue: Old photos not showing**
**Reason:** Old photos were stored in filesystem (local only)
**Solution:** 
- Old photos need to be re-uploaded through the admin panel
- They will then be stored in Vercel Blob permanently

---

## 📝 **Next Steps**

1. **Enable Blob Storage** in Vercel Dashboard (takes 30 seconds)
2. **Wait for automatic redeploy** (or trigger manually)
3. **Test photo upload** in production
4. **Re-upload any existing photos** if needed

---

## 🎉 **Benefits**

✅ **Persistent Storage** - Photos survive deployments  
✅ **Global CDN** - Fast image loading worldwide  
✅ **Automatic Backups** - Vercel handles redundancy  
✅ **Scalable** - Grows with your needs  
✅ **Secure** - HTTPS by default  

---

## 📚 **Documentation**

- [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)
- [Vercel Blob Pricing](https://vercel.com/docs/storage/vercel-blob/usage-and-pricing)
