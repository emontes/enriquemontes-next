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

export default getRequestConfig(async ({ locale }) => {
  // For static export, locale is already provided
  const validLocale = locale && locales.includes(locale as any)
    ? locale
    : defaultLocale;

  try {
    return {
      locale: validLocale,
      messages: await loadMessages(validLocale),
    };
  } catch (error) {
    console.error('Failed to configure i18n:', error);
    return {
      locale: defaultLocale,
      messages: {},
    };
  }
});
