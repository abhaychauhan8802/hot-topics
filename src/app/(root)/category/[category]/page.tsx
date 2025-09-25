import NewsList from "@/components/NewsList";
import { db } from "@/db/drizzle";
import { categories, posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

const Category = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const category = (await params).category;

  const [iscategory] = await db
    .select({ name: categories.name })
    .from(categories)
    .where(eq(categories.name, category))
    .limit(1);

  if (!iscategory) {
    return notFound();
  }

  const postsBasedOnCategory = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      imageUrl: posts.imageUrl,
      category: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(categories.id, posts.categoryId))
    .where(eq(categories.name, category))
    .orderBy(desc(posts.createdAt));

  return (
    <div className="min-h-screen">
      <h1 className="title mt-10">
        <span className="capitalize">{category}</span>
      </h1>

      <div className="mt-5">
        {postsBasedOnCategory.length === 0 ? (
          <p className="text-center text-2xl">No results found</p>
        ) : (
          <NewsList posts={postsBasedOnCategory} />
        )}
      </div>
    </div>
  );
};

export default Category;
