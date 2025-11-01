import { fetchOneResource, fetchResources } from "@/app/utils";
import ResourceDetail from "@/components/ResourceDetail/ResourceDetail";
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';

export async function generateStaticParams({params}: {params: Promise<{locale: string}>}): Promise<{locale: string, slug: string}[]> {	
	const {locale} = await params;
	const resources = await fetchResources(locale);
	return resources
		.map(({ attributes: { slug }, documentId }) => ({ 
			slug: slug || documentId 
		}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const {slug, locale} = await params;
  let resource = await fetchOneResource(slug, locale);
  
  // Fallback to Spanish if resource not found in requested locale
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
}

const ResourcePage = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const {locale, slug} = await params;
  unstable_setRequestLocale(locale);
  
  let resource = await fetchOneResource(slug, locale);
  
  // Fallback to Spanish if resource not found in requested locale
  if (!resource && locale !== 'es') {
    resource = await fetchOneResource(slug, 'es');
  }
  
  if (!resource) {
    notFound();
  }

  return await ResourceDetail({ resource, locale });
};

export default ResourcePage;
