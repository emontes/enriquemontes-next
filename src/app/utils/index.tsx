
export const fetchNavbarContent = async (lang: string) => {
	try {
		const res = await fetch(
			`${process.env.STRAPI_API_URL}/enrique-header?populate[0]=HeaderLinks&populate[1]=HeaderLinks.DropDownItems&populate[2]=HeaderLinks.DropDownItems.Image&locale=${lang}`,
			{
				headers: {
					Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
				},
			},
		);
		const data = await res.json();

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
					Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
				},
			},
		);
		const data = await res.json();

		return data["data"]["attributes"];
	} catch (error) {
		console.log("error while fetching Footer Content from strapi:", error);
		return {};
	}
};

export const fetchResource = async (lang: string) => {
	try {
		const res = await fetch(
			`${process.env.STRAPI_API_URL}/resources?populate=*`,
			{
				headers: {
					Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
				},
			},
		);
		const data = await res.json();

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
					Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
				},
			},
		);
		const data = await res.json();

		return data["data"]["attributes"];
	} catch (error) {
		console.log("error while fetching Meta Data from strapi:", error);
		return {};
	}
};
