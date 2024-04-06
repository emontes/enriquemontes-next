import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  defaultLocale: 'en',
  locales: ['en', 'es', 'de'],
  alternateLinks: true,
  // localeDetection: false,
  localePrefix: 'as-needed', // esta es la que hace el truco de que deje el default sin por ejemplo /en
});
 
export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en|es|de)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};