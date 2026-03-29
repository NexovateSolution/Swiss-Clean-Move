# SwissCleanMove System Architecture & User Manual

## 1. Project Overview
SwissCleanMove is a modern, responsive web application for a premier Swiss cleaning and relocation service. The platform features robust customer-facing booking wizards, multi-language localization (English, German, French), and a comprehensive back-office administrative dashboard for managing quotes, forms, and service requests.

## 2. Technology Stack
The application is built upon a modern, highly scalable JavaScript web stack, ensuring lightning-fast load times, SEO optimization, and an excellent developer experience.

### Core Architecture
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router) - Provides server-side rendering (SSR), static site generation (SSG), and API routes, running on Node.js.
- **Language:** [TypeScript](https://www.typescriptlang.org/) (v5) - Adds strict static typing to JavaScript for improved code quality, predictability, and maintainability.
- **Frontend Library:** [React 18](https://react.dev/) - Utilizing Function Components, Hooks (useState, useEffect, useMemo), and Context Providers.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3.3) - Utility-first CSS framework for rapid, responsive UI development.

### Database & Backend
- **ORM:** [Prisma](https://www.prisma.io/) (v5.6) - Type-safe Node.js and TypeScript ORM mapping object models to the underlying relational database.
- **Notifications:** [Nodemailer](https://nodemailer.com/) - Server-side module handling the SMTP routing for automated email receipts and notifications.

### Utilities & Libraries
- **Internationalization (i18n):** `next-intl` (v3.0) - Manages multi-lingual routing (`/en`, `/de`, `/fr`) and JSON-based translation dictionaries.
- **Animations:** `framer-motion` - Production-ready motion library powering the smooth UI entry animations and transitions.
- **Icons:** `lucide-react` - Minimalist and extremely optimizable SVG icon system.
- **Document Generation:** `jspdf` & `jspdf-autotable` - Used by the admin panel to instantly convert form submissions into properly formatted PDF exports.

---

## 3. Core System Modules Detailed

### 3.1 Multi-Language Routing (`next-intl`)
The Next.js App Router captures the language prefix via dynamic routing syntax: `src/app/[locale]/`. 
- Every page rendered inside `[locale]` loads the corresponding `messages/{locale}.json` file.
- The `useTranslations` hook extracts localized strings on the frontend.
- **API Mapping:** Because backend API requests do not natively inherit the client's locale loop, endpoints (such as form processing and invoice generation) use a centralized, type-safe translation module located at `src/lib/translations.ts`. This module maintains a comprehensive trilingual dictionary and exports a `createTranslator` utility. This guarantees that backend-generated emails and PDFs are strictly printed in the customer's native language without relying on disk-read operations.

### 3.2 The Service Form Wizard (10 Modular Forms)
In order to support highly specific quotation pipelines, the generic quote form is split into 10 unique paths, managed by `src/components/ServiceFormWizard.tsx`.

1. **Routing Strategy:** The `ServiceSlug` identifies which form segment to display based on what service the customer clicked.
2. **Components (`ServiceFormsPart1/2/3.tsx`):** We mapped 10 complex React forms. Instead of placing thousands of lines of code into one file, specific logical categories (e.g. Cleaning vs. Relocation) are handled by specific wrapper components.
3. **Data Aggregation:** The main `ServiceFormWizard` component orchestrates a singular `d` (data) state object. As the user traverses the pagination checks, all unique variables (like `disposalType`, `windowsCount`, and `elevatorAvailable`) are merged into a single payload and transmitted to the `api/service-forms` route.

### 3.3 The Administrator Portal
Operating parallel to the public site, the admin portal (`/admin`) is a specialized React zone utilizing custom layout protections.
- **Shared Architecture:** When administrators create new projects on behalf of clients (`/admin/new-project`), the system imports the exact same `ServiceFormWizard` used by the public site. This shared dependency ensures the back-office staff always uses the exact same inputs as the customers, eliminating synchronization bugs.
- **Dynamic Content Formatting:** The Submission Detail view (`/admin/service-forms`) recursively maps over the arbitrary `data` JSON payload. It relies on a "Prettify" parsing algorithm to strip out raw camelCase string identifiers (like `preferredTime`) into human-readable table rows ("Preferred Time"), and checks backend dictionaries to reconstruct user answers.

---

## 4. Development & Operation Guide

### Environment Setup
Before running the project locally, ensure you have an `.env` file at the root containing your critical database connection string and Gmail SMTP credentials:
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
GMAIL_USER="your-email@gmail.com"
GMAIL_APP_PASSWORD="your-app-password"
```

### Running Locally
To run the server in development mode, execute the following commands in the terminal:
1. `npm install` - Installs the required dependencies.
2. `npx prisma generate` - Generates the TypeScript Prisma client.
3. `npm run dev` - Boots the Next.js hot-reloading server, accessible at `http://localhost:3000`.

### Making Changes
- **Adding a New Translation:** For frontend components, add your translation keys into `messages/en.json`, `messages/de.json`, and `messages/fr.json`. For backend forms, emails, and PDFs, you MUST also add the field label and value mappings into the shared dictionary objects located directly in `src/lib/translations.ts`. If you forget to update the shared module, backend operations will fallback to English or raw camelCase formatting.
- **Database Schema Sync:** If you introduce new core meta-fields requiring native column backing in the Database, update `prisma/schema.prisma` first, then run `npx prisma db push` to synchronize your database without requiring complex migration histories. 

---

*Generated by Nexovate Solutions | Built for SwissCleanMove*
