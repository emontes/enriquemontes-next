import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchPostBySlug, fetchAllPosts } from "@/app/utils/posts";
import type { PostData } from "@/app/utils/posts";
import { BiTime } from "react-icons/bi";

export async function generateStaticParams() {
	// Implementa esta función para generar rutas estáticas en build time
	// Deberás obtener todos los slugs de los posts
	const posts = await fetchAllPosts("es");
	return posts.data.map((post) => ({
		slug: post.attributes.slug,
	}));
}

export default async function Post({
	params,
}: { params: { locale: string; slug: string } }) {


    // const post: PostData = await fetchPostBySlug(params.slug, params.locale);

    const post: PostData | null = await fetchPostBySlug(params.slug, params.locale);

    if (!post) return notFound();

    // console.log('Post: ', post)

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString(params.locale, {
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
				className="prose max-w-none text-gray-500"
				rehypePlugins={[rehypeRaw]}
			>
				{post.attributes.content}
			</ReactMarkdown>
		</article>
	);
}
