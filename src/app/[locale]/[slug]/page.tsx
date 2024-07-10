import { Page, fetchOnePage } from "@/app/dynamicRendering/index";
import { fetchAllPages } from "@/app/utils/index";
import MetadataBuilder from "@/components/MetadataBuilder";
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateStaticParams({params}: {params: {locale: string}}): Promise<{locale: string, slug: string}[]> {	
	const pages = await fetchAllPages(params.locale);
	return pages.data.map(({ attributes: { slug } }) => ({ slug }));
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