// src/components/Posts/PostsList.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { BiTime } from "react-icons/bi";
import Title from "../Title";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface PostListProps {
  posts: any;
  locale: string;
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

const PostsList = ({ posts, locale, pagination }: PostListProps) => {
  return (
    <PostsListContent posts={posts} locale={locale} pagination={pagination} />
  );
};

export default PostsList;

const PostsListContent = ({ posts, locale, pagination }) => {
  const t = useTranslations("Posts");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Safety check for posts
  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="pt-8 container mx-auto px-4">
        <Title title={t("allPosts")} />
        <div className="text-center py-12">
          <p className="text-gray-600">No posts available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 container mx-auto px-4">
      <Title title={t("allPosts")} />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Área principal de noticias (3/4) */}
        <div className="lg:w-3/4 space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-transparent hover:border-blue-300"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  {/* Imagen del post */}
                  {post?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url && (
                    <Image
                      src={post.attributes.image.data.attributes.formats.thumbnail.url}
                      alt={post.attributes.title || 'Post image'}
                      width={300}
                      height={200}
                      className="h-48 w-full object-cover md:w-48 transition duration-300 transform hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post?.attributes?.blog_categories?.data?.map((category) => (
                      <span
                        key={category.id}
                        className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {category.attributes.title}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/${locale}/post/${post.attributes.slug}`}
                    className="block mt-1 text-xl leading-tight font-medium text-black hover:text-blue-600 transition duration-300"
                  >
                    {post.attributes.title}
                  </Link>
                  <p className="mt-2 text-gray-600">
                    {post.attributes.description}
                  </p>
                  <Link
                    href={`/${locale}/post/${post.attributes.slug}`}
                    className="mt-4 inline-block text-blue-500 hover:text-blue-700 transition duration-300"
                  >
                    {t("continueReading")} →
                  </Link>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 flex items-center">
                      <BiTime className="mr-2" />
                      {formatDate(post.attributes.date)}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* Barra lateral (1/4) */}
        <div className="lg:w-1/4 space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
            <h2 className="text-lg font-semibold mb-4 text-blue-600 uppercase">
              {t("aboutMe")}
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/images/banner-about.jpg"
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full ring-2 ring-blue-300 ring-offset-4 hover:ring-blue-500 transition duration-300"
              />
              <p className="text-sm text-gray-400 text-center">
                La paciencia es un elemento clave del éxito
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
            <h2 className="text-lg font-semibold mb-4 text-blue-600 uppercase">
              {t("recentPosts")}
            </h2>
            <ul className="space-y-0">
              {posts.slice(0, 5).map((post) => (
                <li key={post.id} className="group">
                  <Link
                    href={`/${locale}/post/${post?.attributes?.slug || '#'}`}
                    className="flex items-start space-x-2 group-hover:bg-gray-50 p-2 rounded transition duration-300"
                  >
                    {post?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url && (
                      <Image
                        src={post.attributes.image.data.attributes.formats.thumbnail.url}
                        alt={post.attributes.title || 'Post image'}
                        width={60}
                        height={60}
                        className="rounded"
                      />
                    )}

                    <div>
                      <p className="text-[10px] font-medium group-hover:text-blue-600 transition duration-300">
                        {post?.attributes?.title || 'Untitled'}
                      </p>
                      <p className="-mt-3 text-[8px] text-gray-400">
                        {post?.attributes?.date && formatDate(post.attributes.date)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
            <h2 className="text-lg font-semibold mb-4 text-blue-600 uppercase">
              {t("categories")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Crypto",
                "Consejos",
                "Datos",
                "Linux",
                "React",
                "Servidores",
                "Varios",
                "Web",
                "Wordpress",
              ].map((category, index) => (
                <Link
                  key={category}
                  href={`/${locale}/category/${category.toLowerCase()}`}
                  className={`text-xs font-medium px-2 py-1 rounded-full text-white 
                    ${
                      [
                        "bg-blue-500",
                        "bg-green-500",
                        "bg-yellow-500",
                        "bg-red-500",
                        "bg-purple-500",
                        "bg-indigo-500",
                        "bg-pink-500",
                        "bg-teal-500",
                        "bg-orange-500",
                      ][index % 9]
                    }
                    hover:opacity-80 transition duration-300`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
