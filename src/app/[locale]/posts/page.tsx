// src/app/[locale]/posts/page.tsx

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import PostsList from '@/components/Posts/PostsList';
import { fetchAllPosts } from '@/app/utils/posts';
import { locales } from '@/navigation';

export const revalidate = 3600; // Revalidate every hour

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PostsStaticPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch latest 100 posts with revalidation
  let postsData;
  try {
    postsData = await fetchAllPosts(locale, 1, 100, { revalidate: 3600 });
  } catch {
    postsData = { data: [] };
  }
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="bg-gray-100">
        <PostsList posts={postsData?.data || []} locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}

