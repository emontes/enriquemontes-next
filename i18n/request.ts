import { getRequestConfig } from 'next-intl/server';
import { locales } from '../src/navigation';

// Default locale fallback
const defaultLocale = 'en';

// Helper to safely import messages
async function loadMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.warn(`Failed to load messages for locale: ${locale}`, error);
    return (await import(`../messages/${defaultLocale}.json`)).default;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  // If requestLocale is not a string, use default locale
  const locale = typeof requestLocale === 'string' && locales.includes(requestLocale as any)
    ? requestLocale
    : defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale)
  };
});
