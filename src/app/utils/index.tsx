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
				next: { revalidate: 3600 },
			},
		);
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("error while fetching pages from strapi:", error);
		throw error;
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
				cache: 'force-cache',
				next: { revalidate: 3600 },
			},
		);
		const data = await res.json();

		if (!data || !data["data"]) return {};
		return data["data"]["attributes"];
	} catch (error) {
		console.error("error while fetching Navbar Content from strapi:", error);
		throw error;
	}
};

// Lightweight slug fetchers to avoid large payloads during build
export const fetchResourceSlugs = async (lang: string) => {
  try {
    const url = `${process.env.STRAPI_API_URL}/resources?fields[0]=slug&fields[1]=documentId&locale=${lang}&sort=createdAt:desc&pagination[pageSize]=1000`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Strapi-Response-Format": "v4",
      },
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("error while fetching resource slugs from strapi:", error);
    throw error;
  }
};

export const fetchDevelopmentSlugs = async (lang: string) => {
  try {
    const url = `${process.env.STRAPI_API_URL}/developments?fields[0]=slug&locale=${lang}&sort=createdAt:desc&pagination[pageSize]=1000`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Strapi-Response-Format": "v4",
      },
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("error while fetching development slugs from strapi:", error);
    throw error;
  }
};

export const fetchPageSlugs = async (lang: string) => {
  try {
    const url = `${process.env.STRAPI_API_URL}/enrique-pages?fields[0]=slug&locale=${lang}&pagination[pageSize]=1000`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Strapi-Response-Format": "v4",
      },
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("error while fetching page slugs from strapi:", error);
    throw error;
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
				cache: 'force-cache',
				next: { revalidate: 3600 },
			},
		);
		const data = await res.json();

		if (!data || !data["data"]) return {};
		return data["data"]["attributes"];
	} catch (error) {
		console.error("error while fetching Footer Content from strapi:", error);
		throw error;
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
				next: { revalidate: 3600 },
			},
		);
		const data = await res.json();

		if (!data || !data["data"]) return {};
		return data["data"]["attributes"];
	} catch (error) {
		console.error("error while fetching Meta Data from strapi:", error);
		throw error;
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
				next: { revalidate: 3600 },
			},
		);
		const data = await res.json();
		// console.log('La Data: ', data)
		// return data["data"]["attributes"];
		return data["data"]
		
	} catch (error) {
		console.error("error while fetching developments from strapi:", error);
		throw error;
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
				next: { revalidate: 3600 },
			},
		);
		const data = await res.json();
		
		if (data["data"] && data["data"][0]) {
			return data["data"][0];
		}
		return null;
		
	} catch (error) {
		console.error("error while fetching development from strapi:", error);
		throw error;
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
				next: { revalidate: 3600 },
			},
		);
		const data = await res.json();
		return data["data"]
		
	} catch (error) {
		console.error("error while fetching resources from strapi:", error);
		throw error;
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
		let res = await fetch(
			`${process.env.STRAPI_API_URL}/resources?${populateQuery}&locale=${locale}&filters[slug][$eq]=${slug}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
					"Strapi-Response-Format": "v4",
				},
				next: { revalidate: 3600 },
			},
		);
		let data = await res.json();
		
		// If not found by slug, try to find by documentId (for backward compatibility)
		if (!data["data"] || data["data"].length === 0) {
			res = await fetch(
				`${process.env.STRAPI_API_URL}/resources?${populateQuery}&locale=${locale}&filters[documentId][$eq]=${slug}`,
				{
					headers: {
						Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
						"Strapi-Response-Format": "v4",
					},
					next: { revalidate: 3600 },
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
		console.error("error while fetching resource from strapi:", error);
		throw error;
	}
};
