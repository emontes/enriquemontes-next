import { getRequestConfig } from 'next-intl/server';
import { locales } from '../src/navigation';

// Default locale fallback
const defaultLocale = 'en';

// Helper to safely import messages
async function loadMessages(locale: string) {
  try {
    const messages = await import(`../messages/${locale}.json`);
    return messages.default || {};
  } catch (error) {
    console.error(`Error loading messages for ${locale}:`, error);
    try {
      // Fallback to default locale
      const defaultMessages = await import(`../messages/${defaultLocale}.json`);
      return defaultMessages.default || {};
    } catch (e) {
      console.error('Failed to load default messages:', e);
      return {}; // Return empty object as last resort
    }
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Ensure we have a valid locale
  const locale = typeof requestLocale === 'string' && locales.includes(requestLocale as any)
    ? requestLocale
    : defaultLocale;

  try {
    return {
      locale,
      messages: await loadMessages(locale),
      // Enable SSG for all pages
      unstable_serialize: 'json',
    };
  } catch (error) {
    console.error('Failed to configure i18n:', error);
    return {
      locale: defaultLocale,
      messages: {},
      unstable_serialize: 'json',
    };
  }
});
