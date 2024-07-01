import { fetchAllPosts } from "@/app/utils/posts";
import type { PostsListData } from "@/app/utils/posts";


export default async function PostsList({ params: { locale } }: { params: { locale: string } }) {
  const postsData: PostsListData = await fetchAllPosts(locale);

  return (
    <div>
      <h1>Posts</h1>
      <h2>{locale} Locale</h2>
      {postsData.data.map((post) => (
        <div key={post.id}>
          <h3>{post.attributes.title}</h3>
          <p>Slug: {post.attributes.slug}</p>
          <p>Description: {post.attributes.description}</p>
          <p>Date: {post.attributes.date}</p>
          {post.attributes.image.data && (
            <img 
              src={post.attributes.image.data.attributes.formats.thumbnail.url} 
              alt={post.attributes.image.data.attributes.alternativeText || post.attributes.title}
            />
          )}
        </div>
      ))}
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
