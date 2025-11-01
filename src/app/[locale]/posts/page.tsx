// src/app/[locale]/posts/page.tsx

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import PostsList from '@/components/Posts/PostsList';
import { fetchAllPosts } from '@/app/utils/posts';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function PostsStaticPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  // Fetch latest 100 posts with revalidation
  let postsData;
  try {
    postsData = await fetchAllPosts(locale, 1, 100, { cache: 'no-store' });
  } catch {
    postsData = { data: [] };
  }
  const messages = await getMessages();

  return (
    <div className="bg-gray-100">
      <NextIntlClientProvider messages={messages} locale={locale}>
        <PostsList posts={postsData?.data || []} locale={locale} />
      </NextIntlClientProvider>
    </div>
  );
}
