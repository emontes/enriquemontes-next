import { Page, fetchOnePage } from "@/app/dynamicRendering/index";
import MetadataBuilder from "@/components/MetadataBuilder";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale?: string };
}): Promise<Metadata> {
  const slug = "home"
  const page = await fetchOnePage(slug, params.locale || "");
  const seo = page?.seo;

  if (!seo) return {};
  const metadata: Metadata = MetadataBuilder({ seo })
  return metadata;
}

const Home = async ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale)
  return await Page({
    params: {
      locale,
      slug: "home",
    },
  });
};
export default Home;