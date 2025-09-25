import { db } from "@/db/drizzle";
import { categories, posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  const [post] = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      imageUrl: posts.imageUrl,
      content: posts.content,
      category: categories.name,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .leftJoin(categories, eq(categories.id, posts.categoryId))
    .where(eq(posts.slug, slug))
    .limit(1);

  console.log(post);

  return (
    <div className="min-h-screen max-w-4xl w-full mx-auto mt-10">
      <div className="mb-5">
        <h2 className="font-semibold text-2xl">{post.title}</h2>

        <div className="mt-1">
          <p>
            <span className="font-semibold">Published On:</span>{" "}
            {post.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="aspect-video rounded-2xl overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={500}
          height={300}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="mt-5">
        <div
          className="mt-5"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </div>
  );
};

export default PostPage;
