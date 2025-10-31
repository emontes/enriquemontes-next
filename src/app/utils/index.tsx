
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

export const fetchResources = async (lang: string) => {
	try {
		let res = await fetch(
			`${process.env.STRAPI_API_URL}/resources?populate=image&populate=developments.image&locale=${lang}&sort=createdAt:desc&pagination[pageSize]=50`,
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

export const fetchOneResource = async (documentId: string, locale: string) => {
	try {
		let res = await fetch(
			`${process.env.STRAPI_API_URL}/resources?populate=image&populate=developments.image&locale=${locale}&filters[documentId][$eq]=${documentId}`,
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
		console.log("error while fetching resource from strapi:", error);
		return null;
	}
};
