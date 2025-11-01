// src/app/[locale]/posts/page.tsx

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import PostsList from '@/components/Posts/PostsList';
import { fetchAllPosts } from '@/app/utils/posts';

export const dynamic = 'force-static';

export default async function PostsStaticPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  // Fetch latest 100 posts, fully static
  const postsData = await fetchAllPosts(locale, 1, 100, { cache: 'force-cache', revalidate: false });
  const messages = await getMessages();

  return (
    <div className="bg-gray-100">
      <NextIntlClientProvider messages={messages} locale={locale}>
        <PostsList posts={postsData?.data || []} locale={locale} />
      </NextIntlClientProvider>
    </div>
  );
}
