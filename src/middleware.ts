import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es', 'de'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  alternateLinks: true,
  localeDetection: false,
  localePrefix: 'as-needed', // esta es la que hace el truco de que deje el default sin por ejemplo /en
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|es|de)/:path*'],
};