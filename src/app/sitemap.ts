import type { MetadataRoute } from "next";

const BASE_URL = "https://enriquemontes.com";

const locales = ["", "en", "es", "he", "ru", "de"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/contact",
    "/posts",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate URLs for each route and locale
  routes.forEach(route => {
    locales.forEach(locale => {
      const url = locale ? `${BASE_URL}/${locale}${route}` : `${BASE_URL}${route}`;
      sitemap.push({
        url: url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(lang => [
              lang === "" ? "x-default" : lang,
              lang ? `${BASE_URL}/${lang}${route}` : `${BASE_URL}${route}`
            ])
          )
        }
      });
    });
  });

  return sitemap;
}
