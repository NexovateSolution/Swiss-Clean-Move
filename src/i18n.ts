import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'de', 'fr', 'nl'];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge(base: unknown, override: unknown): unknown {
  if (Array.isArray(base) && Array.isArray(override)) return override;
  if (isPlainObject(base) && isPlainObject(override)) {
    const result: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(override)) {
      result[key] = deepMerge((base as Record<string, unknown>)[key], value);
    }
    return result;
  }
  return override ?? base;
}

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) notFound();

  const enMessages = (await import('../messages/en.json')).default;

  // Use English as a complete base and override with locale-specific strings.
  // This prevents untranslated keys from rendering as raw message IDs.
  if (locale === 'en') {
    return {
      locale,
      messages: enMessages as any
    };
  }

  const localeMessages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages: deepMerge(enMessages, localeMessages) as any
  };
});
