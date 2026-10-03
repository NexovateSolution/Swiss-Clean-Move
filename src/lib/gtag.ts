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

// ─── Google Tags ───────────────────────────────────────────────────────
export const GA_MEASUREMENT_ID = 'G-V1JXMFCH29';
export const GA_ADS_ID = 'AW-18285523751';

// ─── Future Conversion Labels ────────────────────────────────────────
// When Google Ads provides conversion labels, add them here.
// Format: 'AW-18285523751/XXXXXXXXX'
export const ConversionLabels = {
  /** Free‑offer / quote form submission */
  FREE_QUOTE_SUBMIT: 'AW-18285523751/jBUQCJ6q8gcEKfmm49E',
  /** Contact‑form submission */
  CONTACT_FORM_SUBMIT: 'AW-18285523751/jBUQCJ6q8gcEKfmm49E',
  /** Quote Wizard completion (final step) */
  QUOTE_WIZARD_COMPLETE: 'AW-18285523751/jBUQCJ6q8gcEKfmm49E',
  /** Phone‑number click (tel: link) */
  PHONE_CLICK: 'AW-18285523751/qUgiCMODrY4dEKfmm49E',
  /** WhatsApp button click */
  WHATSAPP_CLICK: 'AW-18285523751/2DBdCPTFnY8dEKfmm49E',
  /** Email link click */
  EMAIL_CLICK: 'AW-18285523751/HOvHCPuz1o8dEKfmm49E',
} as const;

export type ConversionEvent = keyof typeof ConversionLabels;

// ─── Type declarations for gtag on `window` ─────────────────────────
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
    __gtag_fired_conversions?: Set<string>;
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
): Promise<void> {
  return new Promise((resolve) => {
    const label = ConversionLabels[event];
    if (!label) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[gtag] Conversion label for "${event}" is not configured yet.`);
      }
      return resolve();
    }

    // Prevent duplicate firing in the same session/page-load
    if (window.__gtag_fired_conversions && window.__gtag_fired_conversions.has(event)) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[gtag] Conversion ${event} already fired. Skipping to prevent duplicates.`);
      }
      return resolve();
    }
    
    window.__gtag_fired_conversions = window.__gtag_fired_conversions || new Set<string>();
    window.__gtag_fired_conversions.add(event);

    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[gtag] window.gtag is not available, skipping conversion.');
      }
      return resolve();
    }

    let callbackFired = false;
    const fallbackTimeout = setTimeout(() => {
      if (!callbackFired) {
        callbackFired = true;
        if (process.env.NODE_ENV === 'development') {
          console.log(`[gtag] Conversion timeout reached for ${label}, proceeding.`);
        }
        resolve();
      }
    }, 2000);

    window.gtag('event', 'conversion', {
      send_to: label,
      event_callback: () => {
        if (!callbackFired) {
          callbackFired = true;
          clearTimeout(fallbackTimeout);
          if (process.env.NODE_ENV === 'development') {
            console.log(`[gtag] Conversion event_callback fired for ${label}`);
          }
          resolve();
        }
      },
      ...options,
    });
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

// ─── Action‑specific Helpers ─────────────────────────────────────────

export function trackPhoneClick(): void {
  trackEvent('click_phone');
  trackConversion('PHONE_CLICK').catch(() => {});
}

export function trackWhatsAppClick(): void {
  trackEvent('click_whatsapp');
  trackConversion('WHATSAPP_CLICK').catch(() => {});
}

export function trackEmailClick(): void {
  trackEvent('click_email');
  trackConversion('EMAIL_CLICK').catch(() => {});
}
