import { Page, fetchOnePage } from "@/app/dynamicRendering/index";
import { fetchAllPages } from "@/app/utils/index";
import MetadataBuilder from "@/components/MetadataBuilder";
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from "next-intl/server";

/**
 * Generates static params for the [locale]/[slug] page.
 * @param {Object} params - The params object with the locale.
 * @returns {Array} An array of objects with the locale and slug.
 */
export async function generateStaticParams({params}: {params: {locale: string}}): Promise<{locale: string, slug: string}[]> {
	// Implement this function to generate static routes at build time.
	// You should fetch all the slugs of the pages.
	const pages = await fetchAllPages(params.locale);
	return pages.data.map((page) => ({
    locale: page.attributes.locale,
    slug: page.attributes.slug,
	}));
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale?: string };
}): Promise<Metadata> {
  const page = await fetchOnePage(params.slug, params.locale || "");
  if (!page) return notFound();
  const { seo } = page;

  if (!seo) return {};
  const metadata: Metadata = MetadataBuilder({ seo })
  return metadata;
}

const EnriquePage = async ({ params: { locale, slug } }: { params: { locale: string; slug: string } }) => {
  unstable_setRequestLocale(locale)
  return await Page({
    params: {
      locale,
      slug,
    },
  });
};
export default EnriquePage;