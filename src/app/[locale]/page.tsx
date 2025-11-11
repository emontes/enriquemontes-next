import { Page, fetchOnePage } from "@/app/dynamicRendering/index";
import MetadataBuilder from "@/components/MetadataBuilder";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>;
}): Promise<Metadata> {
  const {locale} = await params;
  const slug = "home"
  const page = await fetchOnePage(slug, locale || "");
  const seo = page?.seo;

  if (!seo) return {};
  const metadata: Metadata = MetadataBuilder({ seo })
  return metadata;
}

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const {locale} = await params;
  setRequestLocale(locale)
  return await Page({
    params: Promise.resolve({
      locale,
      slug: "home",
    }),
  });
};
export default Home;