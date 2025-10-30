import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchPostBySlug, fetchAllPosts } from "@/app/utils/posts";
import type { PostData } from "@/app/utils/posts";
import { BiTime } from "react-icons/bi";
import MetadataBuilder from "@/components/MetadataBuilder";
import type { Metadata } from "next";

export async function generateStaticParams({ params }: { params: Promise<{ locale: string }> }): Promise<{ locale: string; slug: string }[]> {
    const {locale} = await params;
    const posts = await fetchAllPosts("es");
    return posts.data.map(({ attributes: { slug } }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
    const {slug, locale} = await params;
    const post: PostData | null = await fetchPostBySlug(slug, locale);

    if (!post) return {};

    let canonicalUrl = `https://enriquemontes.com/posts/${post.attributes.slug}`;
    if (locale !== "en") {
        canonicalUrl = `https://enriquemontes.com/${locale}/posts/${post.attributes.slug}`;
    }

    const seo = {
        metaTitle: post.attributes.title,
        metaDescription: post.attributes.description || post.attributes.content.substring(0, 150),
        canonical: canonicalUrl,
        metaImage: {
            data: {
                attributes: {
                    url: post.attributes.image.data?.attributes.url || "",
                },
            },
        },
    };

    const metadata: Metadata = MetadataBuilder({ seo });
    return metadata;
}

export default async function Post({
    params,
}: { params: Promise<{ locale: string; slug: string }> }) {
    const {slug, locale} = await params;
    const post: PostData | null = await fetchPostBySlug(slug, locale);

    if (!post) return notFound();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <article className="max-w-3xl mx-auto px-4 py-8 markdown">
            <h1 className="text-4xl font-bold mb-4">{post.attributes.title}</h1>
            <div className="mb-4">
                {post.attributes.blog_categories.data.map((category) => (
                    <span
                        key={category.id}
                        className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                        {category.attributes.title}
                    </span>
                ))}
            </div>
            {post.attributes.image.data && (
                <Image
                    src={post.attributes.image.data.attributes.url}
                    alt={post.attributes.title}
                    width={800}
                    height={400}
                    className="w-full h-auto rounded-lg mb-6"
                />
            )}
            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 flex items-center">
                    <BiTime className="mr-2" />
                    {formatDate(post.attributes.date)}
                </p>
            </div>
            <ReactMarkdown
                className="prose prose-sm md:prose-lg lg:prose-xl max-w-none text-gray-500 markdown"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-4">
                            <table className="table-auto w-full border-collapse border border-gray-300 bg-white shadow-md rounded-md text-sm">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-gray-200 text-gray-700 text-left">
                            {children}
                        </thead>
                    ),
                    th: ({ children }) => (
                        <th className="bg-slate-200 px-4 py-2 border border-gray-300 font-semibold">{children}</th>
                    ),
                    td: ({ children }) => (
                        <td className="px-4 py-2 border border-gray-300">{children}</td>
                    ),
                    tr: ({ children, ...props }) => (
                        <tr className="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition-colors" {...props}>
                            {children}
                        </tr>
                    ),
                }}
            >
                {post.attributes.content}
            </ReactMarkdown>
        </article>
    );
}
