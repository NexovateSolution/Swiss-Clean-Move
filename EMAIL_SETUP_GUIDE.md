# 📧 Email Setup Guide - 100% FREE with Gmail!

## ✅ No Subscription, No Payment Required!

Your email system is now integrated with **Gmail** using Nodemailer - completely FREE!

---


## 🚀 Quick Setup (5 minutes)

### Step 1: Get Gmail App Password

1. **Go to:** https://myaccount.google.com/apppasswords
2. **Sign in** with your Gmail account
3. **Click "Select app"** → Choose "Mail"
4. **Click "Select device"** → Choose "Other (Custom name)"
5. **Type:** "SwissCleanMove Website"
6. **Click "Generate"**
7. **Copy the 16-character password** (looks like: `xxxx xxxx xxxx xxxx`)

> ⚠️ **Important:** This is NOT your regular Gmail password! It's a special app-specific password.

---

### Step 2: Create .env.local File

1. **In your project root**, create a file named `.env.local`
2. **Add these lines:**

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `xxxx xxxx xxxx xxxx` with the app password you just generated

**Example:**
```env
GMAIL_USER=info@swisscleanmove.ch
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

---

### Step 3: Restart Your Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

---

## ✅ That's It!

Now when you send emails from the admin panel:
- ✅ **Real emails** will be sent to recipients
- ✅ **From your Gmail** address
- ✅ **Professional template** with SwissCleanMove branding
- ✅ **100% FREE** - no limits for normal business use

---

## 📊 What You Get

### Email Features:
- ✅ Send to contacts, quotes, and clients
- ✅ Custom subject and message
- ✅ Professional HTML template
- ✅ SwissCleanMove branding
- ✅ Automatic status updates (REPLIED)
- ✅ Email tracking in console

### Gmail Limits (FREE):
- **500 emails per day** (more than enough for most businesses)
- **Unlimited storage** for sent emails
- **No cost** - completely free
- **Reliable delivery** - Gmail's trusted servers

---

## 🔧 Troubleshooting

### "Gmail not configured" message?
- Check that `.env.local` file exists in project root
- Verify the file name is exactly `.env.local` (not `.env.local.txt`)
- Restart your development server

### Emails not sending?
1. Verify your Gmail address is correct
2. Make sure you used an **App Password**, not your regular password
3. Check that 2-Step Verification is enabled on your Gmail account
4. Look at server console for error messages

### "Invalid credentials" error?
- Generate a new App Password
- Make sure there are no extra spaces in the password
- Try removing spaces: `xxxxyyyyzzzzwwww` instead of `xxxx yyyy zzzz wwww`

---

## 🎯 Testing

1. Go to **Admin Panel → Email Communication**
2. Select any contact/quote/client
3. Write a test email:
   - Subject: "Test Email"
   - Message: "This is a test"
4. Click **Send Email**
5. Check the recipient's inbox (or your own email if testing)

---

## 💡 Pro Tips

### Use a Business Gmail
- Create a dedicated Gmail for your business (e.g., `info@swisscleanmove.ch`)
- Or use your existing business email if it's Gmail/Google Workspace

### Keep Your App Password Safe
- Never share it publicly
- Don't commit `.env.local` to Git (it's already in `.gitignore`)
- If compromised, revoke it and generate a new one

### Monitor Your Emails
- Check Gmail's "Sent" folder to see all emails sent
- Gmail automatically saves copies of sent emails

---

## 🌟 Benefits Over Paid Services

| Feature | Gmail (FREE) | Paid Services |
|---------|--------------|---------------|
| Cost | $0/month | $10-50/month |
| Setup Time | 5 minutes | 15-30 minutes |
| Daily Limit | 500 emails | Varies |
| Reliability | Excellent | Varies |
| Support | Google | Varies |
| Credit Card | Not needed | Required |

---

## 📞 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Look at server console logs for error messages
3. Verify your Gmail settings at https://myaccount.google.com/security

---

**You're all set! Enjoy FREE email sending! 🎉**
