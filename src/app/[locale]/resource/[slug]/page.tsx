import { fetchOneResource, fetchResourceSlugs } from "@/app/utils";
import ResourceDetail from "@/components/ResourceDetail/ResourceDetail";
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{locale: string, slug: string}[]> {	
	const locales = ['en', 'es', 'he', 'ru', 'de'];
	const allParams: {locale: string, slug: string}[] = [];
	
	for (const locale of locales) {
		try {
			const resources = await fetchResourceSlugs(locale);
			const params = resources
				.filter((r: any) => r?.attributes?.slug)
				.map((r: any) => ({ locale, slug: r.attributes.slug }));
			allParams.push(...params);
		} catch (error) {
			console.error(`Error generating static params for resources (${locale}):`, error);
		}
	}
	
	return allParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  try {
    const { slug, locale } = await params;
    let resource = await fetchOneResource(slug, locale);
    
    if (!resource && locale !== 'es') {
      resource = await fetchOneResource(slug, 'es');
    }
    
    if (!resource) return {};
    
    const { attributes } = resource;
    const t = await getTranslations({ locale, namespace: 'ResourceDetail' });
    
    return {
      title: `${attributes.title} | ${t('metaTitle')}`,
      description: `${t('metaTitle')}: ${attributes.kind}. ${attributes.title}`,
      openGraph: {
        title: `${attributes.title} | ${t('metaTitle')}`,
        description: `${t('metaTitle')}: ${attributes.kind}. ${attributes.title}`,
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

const ResourcePage = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { locale, slug } = await params;
  unstable_setRequestLocale(locale);
  
  let resource = await fetchOneResource(slug, locale);
  
  if (!resource && locale !== 'es') {
    resource = await fetchOneResource(slug, 'es');
  }
  
  if (!resource) {
    notFound();
  }

  return await ResourceDetail({ resource, locale });
};

export default ResourcePage;
