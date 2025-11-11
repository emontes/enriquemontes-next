// next.config.js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  
  // Configure image optimization
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "abundant-book-6ad757f3c9.media.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/**",
      },
    ],
  },
  
  // Enable experimental optimizations (only those supported in Next.js 15.0.3)
  experimental: {
    // optimizeCss: true, // Disabled as it requires critters module
  },
  
  // Generate a unique build ID for each build
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

export default withNextIntl(nextConfig);