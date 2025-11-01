import type { MetadataRoute } from "next";
import { fetchDevelopments, fetchResources } from "@/app/utils";
import { fetchAllPosts } from "@/app/utils/posts";

export const revalidate = 86400; // Revalidate daily

const BASE_URL = process.env.BASE_URL || "https://enriquemontes.com";

const locales = ["", "en", "es", "he", "ru", "de"];

async function withTimeout<T>(p: Promise<T>, ms = 5000, fallback: T | null = null): Promise<T | null> {
  return Promise.race([
    p.then((v) => v).catch(() => fallback),
    new Promise<T | null>((resolve) => setTimeout(() => resolve(fallback), ms))
  ]);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/about",
    "/contact",
    "/posts",
    "/resources",
    "/developments",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Static routes with alternates
  routes.forEach((route) => {
    locales.forEach((locale) => {
      const url = locale ? `${BASE_URL}/${locale}${route}` : `${BASE_URL}${route}`;
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((lang) => [
              lang === "" ? "x-default" : lang,
              lang ? `${BASE_URL}/${lang}${route}` : `${BASE_URL}${route}`
            ])
          ),
        },
      });
    });
  });

  const mapStrapiLocale = (l: string) => (l === "" ? "en" : l);

  // Dynamic entries: posts
  try {
    const postsResults = await Promise.all(
      locales.map((l) =>
        withTimeout(
          fetchAllPosts(mapStrapiLocale(l), 1, 100, { cache: "force-cache" }),
          8000,
          { data: [] } as any
        )
      )
    );
    postsResults.forEach((posts, idx) => {
      const l = locales[idx];
      if (posts?.data?.length) {
        for (const p of posts.data) {
          const slug = (p as any)?.attributes?.slug;
          if (!slug) continue;
          const url = l ? `${BASE_URL}/${l}/post/${slug}` : `${BASE_URL}/post/${slug}`;
          sitemap.push({
            url,
            lastModified: (p as any)?.attributes?.date ? new Date((p as any).attributes.date) : new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
          });
        }
      }
    });
  } catch (e) {
    // ignore failures
  }

  // Dynamic entries: resources (slug优先, fallback to documentId)
  try {
    const resourcesResults = await Promise.all(
      locales.map((l) => withTimeout(fetchResources(mapStrapiLocale(l)), 8000, []))
    );
    resourcesResults.forEach((resources, idx) => {
      const l = locales[idx];
      if (Array.isArray(resources)) {
        for (const r of resources as any[]) {
          const slug = (r as any)?.attributes?.slug || (r as any)?.documentId;
          if (!slug) continue;
          const url = l ? `${BASE_URL}/${l}/resource/${slug}` : `${BASE_URL}/resource/${slug}`;
          sitemap.push({
            url,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
          });
        }
      }
    });
  } catch (e) {
    // ignore failures
  }

  // Dynamic entries: developments (slug per locale)
  try {
    const developmentsResults = await Promise.all(
      locales.map((l) => withTimeout(fetchDevelopments(mapStrapiLocale(l)), 8000, [] as any))
    );
    developmentsResults.forEach((developments, idx) => {
      const l = locales[idx];
      if (Array.isArray(developments)) {
        for (const d of developments as any[]) {
          const slug = (d as any)?.attributes?.slug;
          if (!slug) continue;
          const url = l ? `${BASE_URL}/${l}/developments/${slug}` : `${BASE_URL}/developments/${slug}`;
          sitemap.push({
            url,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
          });
        }
      }
    });
  } catch (e) {
    // ignore failures
  }

  return sitemap;
}

