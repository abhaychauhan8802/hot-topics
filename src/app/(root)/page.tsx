import CategoryNewsList from "@/components/CategoryNewsList";
import NewsList from "@/components/NewsList";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { asc } from "drizzle-orm";

const Home = async () => {
  const latestPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      imageUrl: posts.imageUrl,
    })
    .from(posts)
    .orderBy(asc(posts.createdAt))
    .limit(6);

  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      imageUrl: posts.imageUrl,
    })
    .from(posts)
    .orderBy(asc(posts.createdAt))
    .limit(12)
    .offset(6);

  return (
    <div>
      <h1 className="title mt-10 mb-2">Latest News</h1>
      <NewsList posts={latestPosts} />

      <h1 className="title mt-12 mb-2">Category</h1>
      <CategoryNewsList />

      <h1 className="title mt-12 mb-2">All News</h1>
      <NewsList posts={allPosts} />
    </div>
  );
};

export default Home;
