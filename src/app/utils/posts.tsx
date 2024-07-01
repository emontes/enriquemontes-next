export interface PostsListData {
    data: {
		id: number;
		attributes: {
			title: string;
			slug: string;
			description: string;
			date: string;
			image: {
				data: {
					id: number;
					attributes: {
						name: string;
						alternativeText: string;
						url: string;
						formats: {
							thumbnail: {
								url: string;
							};
							small: {
								url: string;
							};
							medium: {
								url: string;
							};
						};
					};
				};
			};
            blogCategories: {
                data: {
                    id: number;
                    attributes: {
                        slug: string;
                        title: string;
                        name: string;
                    }
                }[]
            }
		};
	}[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}   

export const fetchAllPosts = async (lang: string) => {
	try {
		const res = await fetch(
			`${process.env.STRAPI_API_URL}/blog-posts?populate=*&locale=${lang}&sort=date:desc`,
			{
				headers: {
					Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
				},
			},
		);
		const data = await res.json();
        // console.log('La Data: ', data)

		return data;
	} catch (error) {
		console.log("error while fetching Postdata Content from strapi:", error);
		return {};
	}
};
