import { Page, fetchOnePage } from "@/app/dynamicRendering/index";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string; locale?: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const slug = "home"
  const page = await fetchOnePage(params.slug, params.locale || "");
  const { seo } = page;

  if (!seo) return null;
  const metadata: Metadata = {};

  // Agregar título y descripción solo si tienen valores válidos
  if (seo.metaTitle) {
    metadata.title = seo.metaTitle;
  }
  if (seo.metaDescription) {
    metadata.description = seo.metaDescription;
  }
  if (seo.keywords) {
    metadata.keywords = seo.keywords;
  }

  // Agregar OpenGraph solo si tiene propiedades válidas
  const openGraph: {
    type?: string;
    locale?: string;
    url?: string;
    siteName?: string;
    images?: string[];
  } = {};

  if (seo.metaSocial && seo.metaSocial.length > 0) {
    openGraph.type = "website";
    openGraph.locale = "en_us";
    openGraph.url = "https://enriquemontes.com";
    openGraph.siteName = "Enrique Montes";
    // Puedes agregar más propiedades de OpenGraph utilizando los datos de `page`
  }
  if (
    seo.metaImage &&
    seo.metaImage.data &&
    seo.metaImage.data.attributes &&
    seo.metaImage.data.attributes.url
  ) {
    openGraph.images = [seo.metaImage.data.attributes.url];
  }

  if (Object.keys(openGraph).length > 0) {
    metadata.openGraph = openGraph;
  }

  // Agregar Twitter solo si tiene propiedades válidas
  const twitter: {
    card?: string;
    creator?: string;
  } = {};
  if (seo.metaSocial && seo.metaSocial.length > 0) {
    twitter.card = "summary_large_image";
    twitter.creator = "@el_ade";
    // Puedes agregar más propiedades de Twitter utilizando los datos de `page`
  }
  if (Object.keys(twitter).length > 0) {
    metadata.twitter = twitter;
  }

  return metadata;
}

const Home = async ({ params: { locale } }: { params: { locale: string } }) => {
  return await Page({
    params: {
      locale,
      slug: "home",
    },
  });
};
export default Home;