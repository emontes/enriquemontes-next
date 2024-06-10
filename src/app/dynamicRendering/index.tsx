import { redirect } from "next/navigation";
import { ComponentsMap } from "./types";
import qs from "qs";

export const fetchOnePage = async (slug: string, locale: string) => {
	const query = qs.stringify({
		filters: { slug: { $eq: slug } },
		populate: [
			"seo.metaImage",
			"seo.metaSocial",
			"PageSections",
			"PageSections.Heading",
			"PageSections.BackgroundImage",
			"PageSections.HeroActions",
		],
	});

	try {
		let url = `${process.env.STRAPI_API_URL}/enrique-pages?${query}`;
		if (locale) url += `&locale=${locale}`;

		const res = await fetch(url, {
			headers: {
				Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
			},
		});
		const data = await res.json();
		console.log(data["data"][0]["attributes"])
		if (data["data"] && data["data"][0]) return data["data"][0]["attributes"];
	} catch (error) {
		console.log("error while fetching a signle Page from strapi:", error);
		return {};
	}
};
  
  export async function Page({
	params,
  }: {
	params: { slug: string; locale?: string };
  }) {
	const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
	const page = await fetchOnePage(slug, params.locale || "");
	if (!page || !page.slug || !page.PageSections) return redirect(`/404`);
	const { PageSections } = page;
  
	return (
	  <main className="">
		{PageSections && PageSections.length
		  ? PageSections.map((data) => {
			  const Component = ComponentsMap[data.__component] as React.ComponentType<any>;
			  return Component ? <Component key={`${data.__component}-${data.id}`} {...data} /> : "";
			})
		  : ""}
	  </main>
	);
}

