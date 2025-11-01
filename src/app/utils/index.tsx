import qs from "qs";

export const fetchAllPages = async (lang: string) => {
	try {
		const res = await fetch(
			`${process.env.STRAPI_API_URL}/enrique-pages?populate=*&locale=${lang}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
					"Strapi-Response-Format": "v4",
				},
			},
		);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log("error while fetching pages from strapi:", error);
		return {};
	}
}
export const fetchNavbarContent = async (lang: string) => {
	try {
		const res = await fetch(
			`${process.env.STRAPI_API_URL}/enrique-header?populate[0]=HeaderLinks&populate[1]=HeaderLinks.DropDownItems&populate[2]=HeaderLinks.DropDownItems.Image&locale=${lang}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
					"Strapi-Response-Format": "v4",
				},
			},
		);
		const data = await res.json();

		if (!data || !data["data"]) return {};
		return data["data"]["attributes"];
	} catch (error) {
		console.log("error while fetching Navbar Content from strapi:", error);
		return {};
	}
};

export const fetchFooterContent = async (lang: string) => {
	try {
		const res = await fetch(
			`${process.env.STRAPI_API_URL}/enrique-footer?populate=*&locale=${lang}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
					"Strapi-Response-Format": "v4",
				},
			},
		);
		const data = await res.json();

		if (!data || !data["data"]) return {};
		return data["data"]["attributes"];
	} catch (error) {
		console.log("error while fetching Footer Content from strapi:", error);
		return {};
	}
};

export const fetchMetaData = async (lang: string) => {
	try {
		let res = await fetch(
			`${process.env.STRAPI_API_URL}/inneractive-meta-data?populate=SEOImage&locale=${lang}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
					"Strapi-Response-Format": "v4",
				},
			},
		);
		const data = await res.json();

		if (!data || !data["data"]) return {};
		return data["data"]["attributes"];
	} catch (error) {
		console.log("error while fetching Meta Data from strapi:", error);
		return {};
	}
};

export const fetchDevelopments = async (lang: string) => {
	try {
		let res = await fetch(
			`${process.env.STRAPI_API_URL}/developments?populate=image&populate=resources.image&locale=${lang}&sort=createdAt:desc&pagination[pageSize]=50`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
					"Strapi-Response-Format": "v4",
				},
			},
		);
		const data = await res.json();
		// console.log('La Data: ', data)
		// return data["data"]["attributes"];
		return data["data"]
		
	} catch (error) {
		console.log("error while fetching Meta Data from strapi:", error);
		return {};
	}
};

export const fetchOneDevelopment = async (slug: string, locale: string) => {
	try {
		let res = await fetch(
			`${process.env.STRAPI_API_URL}/developments?populate=image&populate=resources.image&locale=${locale}&filters[slug][$eq]=${slug}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
					"Strapi-Response-Format": "v4",
				},
			},
		);
		const data = await res.json();
		
		if (data["data"] && data["data"][0]) {
			return data["data"][0];
		}
		return null;
		
	} catch (error) {
		console.log("error while fetching development from strapi:", error);
		return null;
	}
};

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const fetchResources = async (lang: string) => {
	try {
		let res = await fetch(
			`${process.env.STRAPI_API_URL}/resources?populate=image&populate[developments][populate]=image,resources&populate[developments][populate][resources][populate]=image&locale=${lang}&sort=createdAt:desc&pagination[pageSize]=50`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
					"Strapi-Response-Format": "v4",
				},
			},
		);
		const data = await res.json();
		return data["data"]
		
	} catch (error) {
		console.log("error while fetching resources from strapi:", error);
		return [];
	}
};

export const fetchOneResource = async (slug: string, locale: string) => {
	try {
		// Build proper deep populate query
		const populateQuery = qs.stringify({
			populate: {
				image: true,
				developments: {
					populate: {
						image: true,
						resources: {
							populate: {
								image: true
							}
						}
					}
				}
			}
		}, { encodeValuesOnly: true });

		// First try to find by slug field
		const url = `${process.env.STRAPI_API_URL}/resources?${populateQuery}&locale=${locale}&filters[slug][$eq]=${slug}`;
		console.log('[fetchOneResource] Fetching:', url);
		
		let res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
				"Strapi-Response-Format": "v4",
			},
		});
		let data = await res.json();
		console.log('[fetchOneResource] Response data keys:', Object.keys(data));
		if (data.data?.[0]) {
			console.log('[fetchOneResource] First result has image:', !!data.data[0].attributes?.image);
			console.log('[fetchOneResource] First result developments count:', data.data[0].attributes?.developments?.data?.length || 0);
		}
		
		// If not found by slug, try to find by documentId (for backward compatibility)
		if (!data["data"] || data["data"].length === 0) {
			res = await fetch(
				`${process.env.STRAPI_API_URL}/resources?${populateQuery}&locale=${locale}&filters[documentId][$eq]=${slug}`,
				{
					headers: {
						Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
						"Strapi-Response-Format": "v4",
					},
				},
			);
			data = await res.json();
		}
		
		// If still not found, try to find by matching slugified title
		if (!data["data"] || data["data"].length === 0) {
			const allResources = await fetchResources(locale);
			const matched = allResources.find(resource => 
				slugify(resource.attributes.title) === slug
			);
			return matched || null;
		}
		
		if (data["data"] && data["data"][0]) {
			return data["data"][0];
		}
		return null;
		
	} catch (error) {
		console.log("error while fetching resource from strapi:", error);
		return null;
	}
};
