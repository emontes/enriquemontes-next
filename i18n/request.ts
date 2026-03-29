import { getRequestConfig } from 'next-intl/server';
import { routing } from '../src/navigation';

// Helper to safely import messages
async function loadMessages(locale: string) {
  try {
    const messages = await import(`../messages/${locale}.json`);
    return messages.default || {};
  } catch (error) {
    console.error(`Error loading messages for ${locale}:`, error);
    try {
      // Fallback to default locale
      const defaultMessages = await import(`../messages/${routing.defaultLocale}.json`);
      return defaultMessages.default || {};
    } catch (e) {
      console.error('Failed to load default messages:', e);
      return {}; // Return empty object as last resort
    }
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate that the incoming locale parameter is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  try {
    return {
      locale,
      messages: await loadMessages(locale),
    };
  } catch (error) {
    console.error('Failed to configure i18n:', error);
    return {
      locale: routing.defaultLocale,
      messages: {},
    };
  }
});
