// src/app/[locale]/posts/[[...page]]/page.tsx

export const dynamic = 'auto';

import { fetchAllPosts } from "@/app/utils/posts";
import type { PostsListData } from "@/app/utils/posts";
import PostsList from "@/components/Posts/PostsList";

export default async function PostsListPage({
  params,
}: {
  params: Promise<{ locale: string; page?: string[] }>;
}) {
  const {locale, page = []} = await params;
  const pageNumber = page.length > 0 ? parseInt(page[0], 10) : 1;
  const postsData: PostsListData = await fetchAllPosts(locale, pageNumber);

  return (
    <div className="bg-gray-100">
      <PostsList
        posts={postsData.data}
        locale={locale}
        pagination={postsData.meta.pagination}
      />
    </div>
  );
}

