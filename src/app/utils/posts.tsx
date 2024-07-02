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
            blog_categories: {
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

export interface PostData {
    id: number;
    attributes: {
      title: string;
      slug: string;
      description: string;
      date: string;
      content: string;
      image: {
        data: {
          attributes: {
            url: string;
            formats: {
              medium: {
                url: string;
              };
            };
          };
        };
      };
      blog_categories: {
        data: {
          id: number;
          attributes: {
            title: string;
            slug: string;
          };
        }[];
      };
    };
  }
  
  export async function fetchPostBySlug(slug: string, locale: string): Promise<PostData | null> {
    try {
      const res = await fetch(
        `${process.env.STRAPI_API_URL}/blog-posts?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`,
        {
          headers: {
            Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          next: { revalidate: 60 },
        }
      );
  
      if (!res.ok) {
        throw new Error('Failed to fetch post');
      }
  
      const data = await res.json();
    //   console.log('La Data: ', data.data[0])
      return data.data[0] || null;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  }