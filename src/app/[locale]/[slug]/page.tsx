import { Page, fetchOnePage } from "@/app/dynamicRendering/index";
import { fetchAllPages } from "@/app/utils/index";
import MetadataBuilder from "@/components/MetadataBuilder";
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateStaticParams({params}: {params: Promise<{locale: string}>}): Promise<{locale: string, slug: string}[]> {	
	const {locale} = await params;
	const pages = await fetchAllPages(locale);
	return pages.data.map(({ attributes: { slug } }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>;
}): Promise<Metadata> {
  const {slug, locale} = await params;
  const page = await fetchOnePage(slug, locale || "");
  if (!page) return notFound();
  const { seo } = page;

  if (!seo) return {};
  const metadata: Metadata = MetadataBuilder({ seo })
  return metadata;
}

const EnriquePage = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const {locale, slug} = await params;
  unstable_setRequestLocale(locale)
  return await Page({
    params: {
      locale,
      slug,
    },
  });
};
export default EnriquePage;