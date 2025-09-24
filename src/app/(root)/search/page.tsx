import NewsList from "@/components/NewsList";
import { db } from "@/db/drizzle";
import { categories, posts } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { q, category } = await searchParams;

  const conditions = [];

  if (category) {
    conditions.push(eq(categories.name, category as string));
  }

  if (q) {
    conditions.push(sql`${posts.title} ILIKE ${"%" + q + "%"}`);
  }

  const postsBasedOnQuery = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      imageUrl: posts.imageUrl,
      category: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(categories.id, posts.categoryId))
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  console.log(postsBasedOnQuery);

  return (
    <div className="min-h-screen">
      <h1 className="title mt-10">Results</h1>

      <div className="mt-5">
        <NewsList posts={postsBasedOnQuery} />
      </div>
    </div>
  );
};

export default Search;
