// src/app/[locale]/posts/[[...page]]/page.tsx

import { fetchAllPosts } from "@/app/utils/posts";
import type { PostsListData } from "@/app/utils/posts";
import PostsList from "@/components/Posts/PostsList";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// Generate static params for common pages at build time
// Additional pages will be generated on-demand (ISR)
export async function generateStaticParams() {
  // Generate params for pages 1-5 for each locale
  const pages: Array<{ page?: string[] }> = [];
  
  // Page 1 (empty object for catch-all root)
  pages.push({});
  
  // Pages 2-5
  for (let i = 2; i <= 5; i++) {
    pages.push({ page: [i.toString()] });
  }
  
  return pages;
}

export default async function PostsListPage({
  params,
}: {
  params: Promise<{ locale: string; page?: string[] }>;
}) {
  const {locale, page = []} = await params;
  const pageNumber = page.length > 0 ? parseInt(page[0], 10) : 1;
  const postsData: PostsListData = await fetchAllPosts(locale, pageNumber);
  const messages = await getMessages();

  // Validate data
  if (!postsData || !postsData.data || !postsData.meta) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No posts found</h1>
          <p className="text-gray-600">Unable to load posts. Please check your Strapi connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <NextIntlClientProvider messages={messages} locale={locale}>
        <PostsList
          posts={postsData.data || []}
          locale={locale}
          pagination={postsData.meta.pagination}
        />
      </NextIntlClientProvider>
    </div>
  );
}

