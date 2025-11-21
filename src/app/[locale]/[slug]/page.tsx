import { Page, fetchOnePage } from "@/app/dynamicRendering/index";
import { fetchAllPages, fetchPageSlugs } from "@/app/utils/index";
import MetadataBuilder from "@/components/MetadataBuilder";
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { setRequestLocale } from "next-intl/server";

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;

export async function generateStaticParams({ params }: { params: Promise<{ locale: string }> }): Promise<{ locale: string; slug: string }[]> {
  const { locale } = await params;
  const pages = await fetchPageSlugs(locale);
  
  if (!pages || !Array.isArray(pages)) {
    console.warn('No pages found or invalid response for locale:', locale);
    return [];
  }
  
  return pages.map((page) => ({
    locale,
    slug: page?.attributes?.slug || '',
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const page = await fetchOnePage(slug, locale);
  
  if (!page) {
    return {};
  }
  
  const { seo } = page;
  if (!seo) {
    return {};
  }
  
  return MetadataBuilder({ seo });
}

const EnriquePage = async ({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) => {
  const { locale, slug } = await params;
  
  setRequestLocale(locale);
  
  const page = await fetchOnePage(slug, locale);
  
  if (!page) {
    notFound();
  }
  
  return await Page({ params: Promise.resolve({ locale, slug }) });
};

export default EnriquePage;