import { fetchOneDevelopment, fetchDevelopments } from "@/app/utils";
import DevelopmentDetail from "@/components/DevelopmentDetail/DevelopmentDetail";
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function generateStaticParams({params}: {params: Promise<{locale: string}>}): Promise<{locale: string, slug: string}[]> {	
	try {
		const {locale} = await params;
		const developments = await fetchDevelopments(locale);
		return developments
			.filter(({ attributes: { slug } }) => slug !== null)
			.map(({ attributes: { slug } }) => ({ locale, slug }));
	} catch {
		return [];
	}
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  try {
    const {slug, locale} = await params;
    let development = await fetchOneDevelopment(slug, locale);
    
    if (!development && locale !== 'es') {
      development = await fetchOneDevelopment(slug, 'es');
    }
    
    if (!development) return {};
    
    const { attributes } = development;
    const t = await getTranslations({ locale, namespace: 'DevelopmentDetail' });
    
    return {
      title: `${t('metaTitle')}: ${attributes.title}`,
      description: attributes.description?.substring(0, 160) || '',
      openGraph: {
        title: `${t('metaTitle')}: ${attributes.title}`,
        description: attributes.description?.substring(0, 160) || '',
        images: attributes.image?.data?.attributes ? [{
          url: attributes.image.data.attributes.url.startsWith('http') 
            ? attributes.image.data.attributes.url 
            : `${process.env.STRAPI_API_URL}${attributes.image.data.attributes.url}`,
          width: attributes.image.data.attributes.width,
          height: attributes.image.data.attributes.height,
          alt: attributes.image.data.attributes.alternativeText || attributes.title,
        }] : [],
      },
    };
  } catch {
    return {};
  }
}

const DevelopmentPage = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const {locale, slug} = await params;
  unstable_setRequestLocale(locale);
  
  let development = await fetchOneDevelopment(slug, locale);
  
  // Fallback to Spanish if development not found in requested locale
  if (!development && locale !== 'es') {
    development = await fetchOneDevelopment(slug, 'es');
  }
  
  if (!development) {
    notFound();
  }

  return await DevelopmentDetail({ development, locale });
};

export default DevelopmentPage;
