import { fetchAllPosts } from "@/app/utils/posts";
import type { PostsListData } from "@/app/utils/posts";
import PostsList from "@/components/Posts/PostsList";
import { unstable_setRequestLocale } from "next-intl/server";
export default async function PostsListPage({
params: { locale },
}: { params: { locale: string } }) {
const postsData: PostsListData = await fetchAllPosts(locale);
unstable_setRequestLocale(locale)
return (
 <div className="bg-gray-100">
  <PostsList posts={postsData.data} locale={locale} />
  <div className="flex justify-center text-xs mt-4 text-gray-300">
   <h3 className="text-sm">Pagination</h3>
   <p>Page: {postsData.meta.pagination.page}</p>
   <p>Page Size: {postsData.meta.pagination.pageSize}</p>
   <p>Page Count: {postsData.meta.pagination.pageCount}</p>
   <p>Total: {postsData.meta.pagination.total}</p>
  </div>
 </div>
);
}