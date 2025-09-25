import CategoryPost from "@/components/CategoryPost";
import NewsList from "@/components/NewsList";
import { db } from "@/db/drizzle";
import { categories, posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const Home = async () => {
  const latestPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      imageUrl: posts.imageUrl,
    })
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .limit(3);

  const technologyPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      imageUrl: posts.imageUrl,
      category: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(categories.id, posts.categoryId))
    .where(eq(categories.name, "technology"))
    .orderBy(desc(posts.createdAt))
    .limit(6);

  const educationPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      imageUrl: posts.imageUrl,
      category: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(categories.id, posts.categoryId))
    .where(eq(categories.name, "eduction"))
    .orderBy(desc(posts.createdAt))
    .limit(6);

  const topCategories = await db
    .select({ name: categories.name, id: categories.id })
    .from(categories)
    .limit(6);

  return (
    <div>
      <h1 className="title mt-10 mb-2">Latest News</h1>
      {latestPosts.length === 0 ? (
        <p className="text-center text-2xl">No results found</p>
      ) : (
        <NewsList posts={latestPosts} />
      )}

      <h1 className="title mt-12 mb-2">Category</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {topCategories.slice(0, 3).map((category) => (
          <CategoryPost key={category.name} category={category} />
        ))}
      </div>

      <h1 className="title mt-12 mb-2">Technology</h1>
      {technologyPosts.length === 0 ? (
        <p className="text-center text-2xl">No results found</p>
      ) : (
        <NewsList posts={technologyPosts} />
      )}

      <h1 className="title mt-12 mb-2">Education</h1>
      {educationPosts.length === 0 ? (
        <p className="text-center text-2xl">No results found</p>
      ) : (
        <NewsList posts={educationPosts} />
      )}

      <div className="grid md:grid-cols-3 gap-4 mt-12">
        {topCategories.slice(3, 6).map((category) => (
          <CategoryPost key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Home;
