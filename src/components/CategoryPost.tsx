import { db } from "@/db/drizzle";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { posts } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import PostCard from "./PostCard";

const CategoryPost = async ({
  category,
}: {
  category: {
    id: string;
    name: string;
  };
}) => {
  const categoryPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      imageUrl: posts.imageUrl,
    })
    .from(posts)
    .where(eq(posts.categoryId, category.id))
    .orderBy(asc(posts.createdAt))
    .limit(4);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{category.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {categoryPosts.length > 0 ? (
          categoryPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div>No posts found</div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryPost;
