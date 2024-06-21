import { Page, fetchOnePage } from "@/app/dynamicRendering/index";
import MetadataBuilder from "@/components/MetadataBuilder";
import type { Metadata } from "next";
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string; locale?: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const page = await fetchOnePage(params.slug, params.locale || "");
  if (!page) return notFound();
  const { seo } = page;

  if (!seo) return {};
  const metadata: Metadata = MetadataBuilder({ seo })
  return metadata;
}

const Home = async ({ params: { locale, slug } }: { params: { locale: string; slug: string } }) => {
  return await Page({
    params: {
      locale,
      slug,
    },
  });
};
export default Home;