import createMiddleware from 'next-intl/middleware';
import { localePrefix, locales } from './navigation';
 
export default createMiddleware({
  defaultLocale: 'en',
  locales,
  alternateLinks: true,
  // localeDetection: false,
  localePrefix, 
});
 
export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    // '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    // '/(en|es|he|ru|de)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};