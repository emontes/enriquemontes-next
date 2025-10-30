import { Page, fetchOnePage } from "@/app/dynamicRendering/index";
import MetadataBuilder from "@/components/MetadataBuilder";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

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
  unstable_setRequestLocale(locale)
  return await Page({
    params: {
      locale,
      slug: "home",
    },
  });
};
export default Home;