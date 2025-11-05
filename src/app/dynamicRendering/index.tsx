import { ComponentsMap } from "./types";
import qs from "qs";
import DevelopmentsServer from "@/components/StrapiSections/Developments/DevelopmentsSrver";

export const fetchOnePage = async (slug: string, locale: string) => {
	const query = qs.stringify({
		filters: { slug: { $eq: slug } },
		populate: [
			"seo.metaImage",
			"seo.metaSocial",
			"PageSections",
			"PageSections.Heading",
			"PageSections.Image",
			"PageSections.Images",
			"PageSections.SubTitle",
			"PageSections.BackgroundImage",
			"PageSections.ProfileImage",
			"PageSections.HeroActions",
			"PageSections.Job.desc",
			"PageSections.Service",
			"PageSections.Service.icon",
			"PageSections.resources",
			"PageSections.resources.image",
			"PageSections.developments.image",
			"PageSections.developments.resources.image",
			"PageSections.Background",
			"PageSections.testimonials.image",

		],
	});

	try {
		let url = `${process.env.STRAPI_API_URL}/enrique-pages?${query}`;
		if (locale) url += `&locale=${locale}`;

		const res = await fetch(url, {
			headers: {
				Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
				"Strapi-Response-Format": "v4",
			},
		});
		const data = await res.json();
		// console.log(data["data"][0]["attributes"])
		if (data["data"] && data["data"][0]) return data["data"][0]["attributes"];
	} catch (error) {
		console.log("error while fetching a signle Page from strapi:", error);
		return {};
	}
};

export async function Page({
	params,
  }: {
	params: Promise<{ slug: string; locale?: string }>;
  }) {
	const { slug, locale } = await params;
	const slugStr = Array.isArray(slug) ? slug.join("/") : slug;
	const page = await fetchOnePage(slugStr, locale || "");
  
	if (!page || !page.slug || !page.PageSections) return null;
	const { PageSections } = page;

	return (
		<main className="">
		{PageSections?.length
		  ? PageSections.map((data) => {
			  if (data.__component === "page-sections.dev") {
				return (
				  <DevelopmentsServer key={`${data.__component}-${data.id}`} {...data} locale={locale || "en"}/>
				);
			  }
			  const Component = ComponentsMap[data.__component] as React.ComponentType<any>;
			  return Component ? (
				<Component key={`${data.__component}-${data.id}`} {...data} />
			  ) : (
				""
			  );
			})
		  : ""}
	  </main>
	);
  }