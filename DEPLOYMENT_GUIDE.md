# SwissCleanMove Website - Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Setup
- [ ] Node.js 18+ installed
- [ ] All dependencies installed (`npm install`)
- [ ] Build process working (`npm run build`)
- [ ] No TypeScript errors
- [ ] All tests passing

### 2. Configuration
- [ ] Update contact information in translation files
- [ ] Configure environment variables
- [ ] Set up Google Maps API key (when ready)
- [ ] Configure WhatsApp number
- [ ] Update social media links

### 3. Content Review
- [ ] All German translations complete
- [ ] All French translations complete
- [ ] Contact information accurate
- [ ] Service descriptions updated
- [ ] Legal pages reviewed
- [ ] SEO meta tags optimized

## Environment Variables

Create a `.env.local` file for local development:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://swisscleanmove.ch
NEXT_PUBLIC_SITE_NAME=SwissCleanMove

# Contact Information
NEXT_PUBLIC_PHONE=+41123456789
NEXT_PUBLIC_EMAIL=info@swisscleanmove.ch
NEXT_PUBLIC_WHATSAPP=+41123456789

# Google Services (when ready)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id_here

# Form Handling (when backend is ready)
NEXT_PUBLIC_FORM_ENDPOINT=https://api.swisscleanmove.ch/forms
FORM_SECRET_KEY=your_secret_key_here

# Email Service (when ready)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Push to GitHub/GitLab
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy automatically

3. **Custom Domain**
   - Add `swisscleanmove.ch` in Vercel dashboard
   - Update DNS records as instructed
   - SSL certificate will be auto-generated

### Option 2: Netlify

1. **Build Configuration**
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**
   - Connect repository to Netlify
   - Configure build settings
   - Set environment variables
   - Deploy

### Option 3: Traditional Hosting

1. **Build for Production**
   ```bash
   npm run build
   npm run export  # If using static export
   ```

2. **Upload Files**
   - Upload `out/` folder contents to web server
   - Configure web server for SPA routing
   - Set up SSL certificate

## DNS Configuration

### Required DNS Records
```
Type    Name                Value                   TTL
A       @                   [Server IP]             300
A       www                 [Server IP]             300
CNAME   www                 swisscleanmove.ch       300
```

### Email Setup (Optional)
```
Type    Name                Value                   TTL
MX      @                   mail.swisscleanmove.ch  300
TXT     @                   "v=spf1 include:_spf.google.com ~all"
```

## Performance Optimization

### 1. Image Optimization
- Use Next.js Image component
- Compress images before upload
- Use WebP format when possible
- Implement lazy loading

### 2. Code Optimization
- Enable compression in hosting
- Minify CSS and JavaScript
- Use CDN for static assets
- Enable browser caching

### 3. SEO Optimization
- Submit sitemap to search engines
- Set up Google Search Console
- Configure Google Analytics
- Optimize meta descriptions

## Security Checklist

### 1. HTTPS
- [ ] SSL certificate installed
- [ ] HTTP redirects to HTTPS
- [ ] HSTS headers configured
- [ ] Mixed content issues resolved

### 2. Headers
Configure security headers:
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### 3. Form Security
- [ ] CSRF protection enabled
- [ ] Rate limiting implemented
- [ ] Input validation on server
- [ ] Spam protection (reCAPTCHA)

## Monitoring & Analytics

### 1. Google Analytics
```javascript
// Add to _app.tsx when ready
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: document.title,
  page_location: window.location.href,
});
```

### 2. Error Monitoring
Consider implementing:
- Sentry for error tracking
- LogRocket for session replay
- Hotjar for user behavior

### 3. Performance Monitoring
- Core Web Vitals tracking
- Page load speed monitoring
- Uptime monitoring

## Backup Strategy

### 1. Code Backup
- Repository hosted on GitHub/GitLab
- Regular commits and pushes
- Tagged releases for versions

### 2. Content Backup
- Regular database backups (when applicable)
- Form submission backups
- Media file backups

## Post-Deployment Tasks

### 1. Testing
- [ ] Test all pages in both languages
- [ ] Verify forms work correctly
- [ ] Check mobile responsiveness
- [ ] Test loading speeds
- [ ] Verify SEO elements

### 2. Search Engine Submission
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Create and submit XML sitemap
- [ ] Set up Google My Business

### 3. Social Media Setup
- [ ] Create Facebook business page
- [ ] Set up Instagram business account
- [ ] Create LinkedIn company page
- [ ] Configure social media links

## Maintenance Schedule

### Daily
- Monitor website uptime
- Check for form submissions
- Respond to customer inquiries

### Weekly
- Review analytics data
- Check for broken links
- Update social media content
- Backup important data

### Monthly
- Update dependencies
- Review security logs
- Analyze performance metrics
- Update content as needed

### Quarterly
- Security audit
- Performance optimization
- Content strategy review
- SEO analysis and improvements

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Review TypeScript errors

2. **Routing Issues**
   - Verify middleware configuration
   - Check locale routing setup
   - Ensure proper redirects

3. **Performance Issues**
   - Optimize images
   - Review bundle size
   - Check for memory leaks

### Support Contacts

- **Technical Support**: dev@swisscleanmove.ch
- **Hosting Provider**: [Provider support]
- **Domain Registrar**: [Registrar support]

## Future Enhancements

### Phase 2 Features
- Backend API integration
- Customer dashboard functionality
- Online payment processing
- Email automation
- CRM integration

### Phase 3 Features
- Mobile app development
- Advanced analytics
- Multi-language expansion
- AI-powered features

---

**Deployment Guide Version 1.0**  
**Created**: October 2024  
**Last Updated**: October 2024
