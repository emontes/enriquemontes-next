// middleware.ts (root)
import createMiddleware from 'next-intl/middleware';
import { localePrefix, locales } from './src/navigation';

export default createMiddleware({
  defaultLocale: 'en',
  locales,
  alternateLinks: true,
  localeDetection: true,
  localePrefix,
});

export const config = {
  matcher: [
    '/',
    '/(en|es|he|ru|de)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
