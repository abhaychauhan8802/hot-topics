import PostTable from "@/components/admin/PostTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db/drizzle";
import { categories, posts } from "@/db/schema";
import { getSession } from "@/lib/server/auth";
import { desc, eq } from "drizzle-orm";

const AdminDashboard = async () => {
  const session = await getSession();
  const totalPosts = await db.$count(posts);
  const totalCategories = await db.$count(categories);

  const latestPosts = await db
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
    .orderBy(desc(posts.createdAt))
    .limit(10);

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <p>Welcome back {session?.name}</p>

      <div className="mt-5 w-full">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalPosts}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalCategories}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-5">
          <h2 className="text-xl font-semibold">Latest Posts</h2>
          <PostTable posts={latestPosts} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
