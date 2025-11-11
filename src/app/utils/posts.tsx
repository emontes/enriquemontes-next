// src/app/utils/posts.tsx

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

// Función de utilidad para reintentos con backoff exponencial
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  maxRetries: number = 5,
  baseDelay: number = 1000
): Promise<Response> => {
  const isProd = process.env.NODE_ENV === 'production';
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        // 20 segundos timeout para entornos con más latencia (p. ej., Strapi Cloud)
        signal: AbortSignal.timeout(20000)
      });

      if (response.ok) {
        return response;
      }

      const status = response.status;
      const retryable = status === 429 || (status >= 500 && status <= 599);

      // Si no es un error recuperable, no reintentar
      if (!retryable) {
        if (!isProd) {
          console.log(`Strapi request non-retryable status ${status} on attempt ${attempt}/${maxRetries}`);
        }
        throw new Error(`HTTP ${status}`);
      }

      if (attempt < maxRetries) {
        const jitter = Math.floor(Math.random() * 250);
        const delay = baseDelay * Math.pow(2, attempt - 1) + jitter;
        if (!isProd) {
          console.log(`Strapi request failed (status ${status}) attempt ${attempt}/${maxRetries}, retrying in ${delay}ms...`);
        }
        await sleep(delay);
        continue;
      }
    } catch (error) {
      if (attempt === maxRetries) {
        if (!isProd) {
          console.error('Strapi request error, exhausted retries:', error);
        }
        throw new Error(`Failed after ${maxRetries} attempts`);
      }

      // Esperar antes de reintentar (con jitter)
      const jitter = Math.floor(Math.random() * 250);
      const delay = baseDelay * Math.pow(2, attempt - 1) + jitter;
      if (!isProd) {
        console.log(`Strapi request error (attempt ${attempt}/${maxRetries}), retrying in ${delay}ms...`);
      }
      await sleep(delay);
    }
  }

  throw new Error(`Failed after ${maxRetries} attempts`);
};

// Lightweight slug fetcher to keep build-time cache small
export const fetchPostSlugs = async (
  lang: string,
  pageSize: number = 1000
) => {
  try {
    const url = `${process.env.STRAPI_API_URL}/blog-posts?fields[0]=slug&fields[1]=date&locale=${lang}&sort=date:desc&pagination[page]=1&pagination[pageSize]=${pageSize}`;
    const res = await fetchWithRetry(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Strapi-Response-Format": "v4",
      },
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("Error fetching post slugs:", error);
    return [];
  }
};

export const fetchAllPosts = async (
  lang: string,
  page: number = 1,
  pageSize: number = 10,
  options?: { cache?: "force-cache" | "no-store"; revalidate?: number | false }
) => {
  try {
    const url = `${process.env.STRAPI_API_URL}/blog-posts?populate=*&locale=${lang}&sort=date:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    
    const fetchOptions: RequestInit & { next?: { revalidate?: number }; cache?: RequestCache } = {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Strapi-Response-Format": "v4",
      },
    };

    // Control de cache: por defecto, mantener ISR 5 minutos
    if (options?.cache) {
      fetchOptions.cache = options.cache;
    } else {
      const revalidate = options?.revalidate === false ? undefined : (options?.revalidate ?? 300);
      if (typeof revalidate === "number") {
        fetchOptions.next = { revalidate };
      }
    }

    const res = await fetchWithRetry(url, fetchOptions);
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts after retries:", error);
    
    // Retornar datos vacíos pero con estructura válida para que la UI no se rompa
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 0,
          total: 0
        }
      }
    };
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
      const res = await fetchWithRetry(
        `${process.env.STRAPI_API_URL}/blog-posts?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            "Strapi-Response-Format": "v4",
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