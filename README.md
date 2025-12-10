# SwissCleanMove Website

A modern, bilingual (German/French) website for a Swiss cleaning and moving company built with Next.js 14, TypeScript, and Tailwind CSS.

## ⚠️ IMPORTANT: Database Migration Required

**Before production deployment, you MUST migrate from SQLite to PostgreSQL.**

📘 **Quick Start:** See `QUICK_MIGRATION.md` (15 minutes)  
📖 **Detailed Guide:** See `MIGRATION_STEPS.md` (30 minutes)  
📋 **Full Info:** See `README_MIGRATION.md`

The migration is simple and automated with backup/restore scripts included.

## Features

### 🌐 Bilingual Support
- German (DE) and French (FR) language support
- Seamless language switching
- Internationalized routing with next-intl

### 🎨 Modern Design
- Swiss-inspired color palette (blue, green, red, white)
- Clean, professional design
- Mobile-first responsive layout
- Smooth animations and transitions

### 📱 Pages & Components
- **Home**: Hero section, services overview, testimonials, CTA
- **About**: Company story, team, values, mission
- **Services**: Detailed service cards with pricing
- **Free Offer**: Comprehensive quote request form
- **Contact**: Contact form, map integration, business info
- **Legal**: Impressum, privacy policy, terms & conditions

### 🛠️ Technical Features
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- SEO-optimized with meta tags
- Fast loading performance
- Accessible design

### 🚀 Services Covered
- Umzugsreinigung (Moving Cleaning)
- Gastronomie Reinigung (Restaurant Cleaning)
- Büro Reinigung (Office Cleaning)
- Hauswartung (Property Maintenance)
- Entsorgung (Disposal Services)
- Umzug (Moving Services)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── about/
│   │   ├── contact/
│   │   ├── free-offer/
│   │   ├── legal/
│   │   ├── services/
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   └── WhatsAppButton.tsx
├── i18n.ts
└── middleware.ts
messages/
├── de.json                 # German translations
└── fr.json                 # French translations
```

## Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_SITE_URL=https://swisscleanmove.ch
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
NEXT_PUBLIC_WHATSAPP_NUMBER=+41123456789
```

### Customization

#### Colors
The Swiss color palette is defined in `tailwind.config.ts`:
- Swiss Blue: `#0066CC`
- Swiss Green: `#00AA44`
- Swiss Red: `#FF0000`
- Swiss White: `#FFFFFF`

#### Contact Information
Update contact details in:
- Translation files (`messages/de.json`, `messages/fr.json`)
- Component files (Header, Footer, Contact page)

#### Services
Modify services in the translation files and update corresponding icons in the components.

## Features to Implement

### Phase 1 (Current)
- ✅ Bilingual website structure
- ✅ All main pages
- ✅ Responsive design
- ✅ Contact forms
- ✅ SEO optimization

### Phase 2 (Future)
- [ ] Google Maps integration
- [ ] Backend API for form submissions
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Customer login system
- [ ] Online contract system
- [ ] Invoice generation
- [ ] Payment integration

## SEO Optimization

The website includes:
- Meta tags for all pages
- Open Graph tags
- Structured data markup
- Semantic HTML
- Image alt texts
- Sitemap-ready structure

## Performance

- Optimized images
- Minimal JavaScript bundle
- CSS optimization with Tailwind
- Fast loading times (<3s target)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2024 SwissCleanMove. All rights reserved.

## Contact

For technical questions about this website:
- Email: dev@swisscleanmove.ch
- Phone: +41 12 345 67 89

---

**Made with ❤️ in Switzerland 🇨🇭**
