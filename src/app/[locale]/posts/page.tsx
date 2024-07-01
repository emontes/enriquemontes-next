import { fetchAllPosts } from "@/app/utils/posts";
import type { PostsListData } from "@/app/utils/posts";
import PostsList from "./PostsList";

export default async function PostsListPage({
	params: { locale },
}: { params: { locale: string } }) {
	const postsData: PostsListData = await fetchAllPosts(locale);

	return (
		<div className="bg-gray-100">
			<PostsList posts={postsData.data} locale={locale} />

			<div>
				<h3>Pagination</h3>
				<p>Page: {postsData.meta.pagination.page}</p>
				<p>Page Size: {postsData.meta.pagination.pageSize}</p>
				<p>Page Count: {postsData.meta.pagination.pageCount}</p>
				<p>Total: {postsData.meta.pagination.total}</p>
			</div>
		</div>
	);
}
