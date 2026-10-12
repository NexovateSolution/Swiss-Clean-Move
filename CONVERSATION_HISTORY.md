# Project Conversation History & Continuation Log

**Date:** 2026-10-12  
**Feature:** Added "Create Invoice" beside PDF in Admin Service Forms Table

---

## 1. Summary of Changes
1. **Admin Service Forms Table (`src/app/admin/service-forms/page.tsx`):**
   - Added a **"Create Invoice"** button on the right side of the **PDF** button in the `ACTIONS` column.
   - Styled consistently with existing action buttons:
     - View: Blue badge (`bg-blue-100 text-blue-700`)
     - PDF: Green badge (`bg-green-100 text-green-700`)
     - Create Invoice: Purple badge (`bg-purple-100 text-purple-700`) with `<FileText className="w-3 h-3" />`.
   - Also added the **"Create Invoice"** button in the submission details modal footer beside "Download PDF".

2. **Replicated Client Page Invoice Creation Flow:**
   - Integrated the 2-step document creation modal:
     - **Step 1:** Select document language (🇩🇪 German, 🇫🇷 French, 🇮🇹 Italian, 🇬🇧 English).
     - **Step 2:** Select format & delivery action:
       - 🖨️ **Print & Send Email**
       - ⬇️ **Download & Send Email**
       - ⬇️ **Download Only**
   - Real-time toast notifications for generating, downloading, and emailing.

3. **Backend API Endpoints Updated:**
   - [`/api/admin/generate-receipt`](file:///c:/Users/mikiy/OneDrive/Desktop/SwissCleanMove_Website/src/app/api/admin/generate-receipt/route.ts):
     - Enhanced to accept either `clientId` or `submissionId`.
     - Automatically resolves records from `prisma.serviceFormSubmission` if not found in `prisma.client`.
     - Supports `type: 'invoice'` (Rechnung) and `type: 'receipt'` (Quittung).
   - [`/api/admin/send-receipt`](file:///c:/Users/mikiy/OneDrive/Desktop/SwissCleanMove_Website/src/app/api/admin/send-receipt/route.ts):
     - Enhanced to accept either `clientId` or `submissionId`.
     - Sends invoice PDF to customer's email with localized templates (DE, FR, IT, EN).
   - [`/api/admin/generate-invoice`](file:///c:/Users/mikiy/OneDrive/Desktop/SwissCleanMove_Website/src/app/api/admin/generate-invoice/route.ts) & [`/api/admin/send-invoice`](file:///c:/Users/mikiy/OneDrive/Desktop/SwissCleanMove_Website/src/app/api/admin/send-invoice/route.ts):
     - Enhanced to also support both `clientId` and `submissionId`.

4. **PDF Generator (`src/utils/pdfGenerator.ts`):**
   - Fixed German translation for `receiptOffer` so that `documentType === 'invoice'` produces `'RECHNUNG'` instead of default `'QUITTUNG'`.

5. **Translations (`messages/*.json`):**
   - Added `"createInvoice"` key to `admin.serviceForms.actions` in `en.json`, `de.json`, `fr.json`, and `it.json`.

---

## 2. Verification
- Checked with `npx tsc --noEmit`: 0 errors (clean compilation).
- Preserved existing functionality for both `/admin/clients` and `/admin/service-forms`.
