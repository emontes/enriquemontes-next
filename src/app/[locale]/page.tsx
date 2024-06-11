import { Page, fetchOnePage } from "@/app/dynamicRendering/index";
import MetadataBuilder from "@/components/MetadataBuilder";
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
  const metadata: Metadata = MetadataBuilder({ seo })
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