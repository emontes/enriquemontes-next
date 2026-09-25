// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';
 
export default createMiddleware(routing);
 
export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en|es|he|ru|de)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    // `api` is excluded so /api/revalidate is reachable by the Strapi webhook
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};