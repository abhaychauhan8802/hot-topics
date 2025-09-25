import PostTable from "@/components/admin/PostTable";
import { db } from "@/db/drizzle";
import { categories, posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Plus } from "lucide-react";
import Link from "next/link";

const Posts = async () => {
  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      imageUrl: posts.imageUrl,
      createdAt: posts.createdAt,
      category: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(categories.id, posts.categoryId))
    .orderBy(desc(posts.createdAt));

  return (
    <div>
      <h1 className="title">All Posts</h1>

      <div className="mt-5 w-full">
        <Link href="/admin/posts/new" className="btn-primary">
          <Plus /> Add Post
        </Link>

        <div className="mt-10">
          <PostTable posts={allPosts} />
        </div>
      </div>
    </div>
  );
};

export default Posts;
