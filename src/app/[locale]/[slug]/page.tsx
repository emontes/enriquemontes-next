import { Page, fetchOnePage } from "@/app/dynamicRendering/index";
import { fetchAllPages, fetchPageSlugs } from "@/app/utils/index";
import MetadataBuilder from "@/components/MetadataBuilder";
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from "next-intl/server";

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;

export async function generateStaticParams({ params }: { params: Promise<{ locale: string }> }): Promise<{ locale: string; slug: string }[]> {
  try {
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
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  try {
    const { slug, locale } = await params;
    const page = await fetchOnePage(slug, locale).catch(error => {
      console.error(`Error fetching page ${slug} for locale ${locale}:`, error);
      return null;
    });
    
    if (!page) {
      return {};
    }
    
    const { seo } = page;
    if (!seo) {
      return {};
    }
    
    return MetadataBuilder({ seo });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}

const EnriquePage = async ({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) => {
  const { locale, slug } = await params;
  
  try {
    unstable_setRequestLocale(locale);
    
    const page = await fetchOnePage(slug, locale).catch(error => {
      console.error(`Error fetching page content for ${slug} (${locale}):`, error);
      return null;
    });
    
    if (!page) {
      notFound();
    }
    
    return await Page({ params: Promise.resolve({ locale, slug }) });
  } catch (error) {
    console.error(`Error rendering page ${slug} (${locale}):`, error);
    notFound();
  }
};

export default EnriquePage;