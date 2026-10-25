# Universal Form Backup & Restoration Guide

## Backup Metadata
- **Date Created**: October 26, 2026
- **Purpose**: Preserved snapshot of the Universal Multi-Step Quote Form (`UniversalQuoteForm`) before restoring the original service-specific multi-step form wizard (`ServiceFormWizard`).
- **Location**: `backups/universal-form/`

## Backed Up Files
1. **Component Implementation & Slices**:
   - `backups/universal-form/components/universal-form/UniversalQuoteForm.tsx`
   - `backups/universal-form/components/universal-form/types.ts`
   - `backups/universal-form/components/universal-form/SectionTitle.tsx`
   - `backups/universal-form/components/universal-form/StepIndicator.tsx`
   - `backups/universal-form/components/universal-form/slices/ServiceSelectionSlice.tsx`
   - `backups/universal-form/components/universal-form/slices/CustomerDetailsSlice.tsx`
   - `backups/universal-form/components/universal-form/slices/PropertyLocationSlice.tsx`
   - `backups/universal-form/components/universal-form/slices/MovingDetailsSlice.tsx`
   - `backups/universal-form/components/universal-form/slices/CleaningDetailsSlice.tsx`
   - `backups/universal-form/components/universal-form/slices/DateContactSlice.tsx`
   - `backups/universal-form/components/universal-form/slices/ReviewSubmitSlice.tsx`
   - `backups/universal-form/components/universal-form/slices/AdminPricingSlice.tsx`

2. **Page Implementations**:
   - `backups/universal-form/app/[locale]/form/page.tsx`
   - `backups/universal-form/app/admin/new-project/page.tsx`

## How to Restore the Universal Form
If you ever want to re-enable the Universal Quote Form in the future:
1. Copy the components back to `src/components/universal-form/`:
   ```bash
   cp -r backups/universal-form/components/universal-form/* src/components/universal-form/
   ```
2. Copy the form page back:
   ```bash
   cp backups/universal-form/app/[locale]/form/page.tsx src/app/[locale]/form/page.tsx
   ```
3. Copy the admin new-project page back:
   ```bash
   cp backups/universal-form/app/admin/new-project/page.tsx src/app/admin/new-project/page.tsx
   ```
4. Run `npm test` and `npx tsc --noEmit` to verify type safety.
