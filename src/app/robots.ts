import type { MetadataRoute } from "next";

/**
 * @see https://github.com/search?q=path%3Aapp%2Frobots.ts&type=code
 * @see https://robotstxt.org/robotstxt.html
 * @see https://rotecna.com/robots.txt
 */

const BASE_URL = process.env.BASE_URL || "https://enriquemontes.com";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
