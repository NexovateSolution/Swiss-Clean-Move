/**
 * Google Ads / Google Tag (gtag.js) — Centralized tracking utility
 *
 * This module provides a single source of truth for all Google Ads
 * tracking configuration and conversion helpers.
 *
 * Usage:
 *   import { GA_ADS_ID, trackConversion, ConversionEvent } from '@/lib/gtag';
 *
 * Current state:
 *   - Google Ads global tag is installed (AW-18285523751)
 *   - Conversion labels are NOT yet available; placeholders are defined below.
 *   - Once labels are provided, fill them in and call trackConversion().
 */

// ─── Google Ads Tag ID ───────────────────────────────────────────────
export const GA_ADS_ID = 'AW-18285523751';

// ─── Future Conversion Labels ────────────────────────────────────────
// When Google Ads provides conversion labels, add them here.
// Format: 'AW-18285523751/XXXXXXXXX'
export const ConversionLabels = {
  /** Free‑offer / quote form submission */
  FREE_QUOTE_SUBMIT: '',
  /** Contact‑form submission */
  CONTACT_FORM_SUBMIT: '',
  /** Quote Wizard completion (final step) */
  QUOTE_WIZARD_COMPLETE: '',
  /** Phone‑number click (tel: link) */
  PHONE_CLICK: '',
  /** WhatsApp button click */
  WHATSAPP_CLICK: '',
  /** Email link click */
  EMAIL_CLICK: '',
} as const;

export type ConversionEvent = keyof typeof ConversionLabels;

// ─── Type declarations for gtag on `window` ─────────────────────────
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

// ─── Core helper — call gtag safely ──────────────────────────────────
function gtag(...args: unknown[]): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

// ─── Page‑view (called automatically by gtag.js on route change) ─────
export function trackPageView(url: string): void {
  gtag('config', GA_ADS_ID, {
    page_path: url,
  });
}

// ─── Conversion tracking ─────────────────────────────────────────────
/**
 * Fire a Google Ads conversion event.
 *
 * @param event   - One of the predefined ConversionEvent keys
 * @param options - Optional: value, currency, transaction_id, etc.
 *
 * @example
 *   // Once FREE_QUOTE_SUBMIT label is set:
 *   trackConversion('FREE_QUOTE_SUBMIT');
 *
 *   // With value:
 *   trackConversion('FREE_QUOTE_SUBMIT', { value: 1.0, currency: 'CHF' });
 */
export function trackConversion(
  event: ConversionEvent,
  options: Record<string, unknown> = {},
): void {
  const label = ConversionLabels[event];
  if (!label) {
    // Label not yet configured — silently skip in production
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `[gtag] Conversion label for "${event}" is not configured yet.`,
      );
    }
    return;
  }

  gtag('event', 'conversion', {
    send_to: label,
    ...options,
  });
}

// ─── Generic custom‑event helper ─────────────────────────────────────
/**
 * Fire an arbitrary gtag event (useful for custom events beyond conversions).
 */
export function trackEvent(
  action: string,
  params: Record<string, unknown> = {},
): void {
  gtag('event', action, params);
}
