import { db } from "@/db/drizzle";
import { categories, posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

const PostPage = async ({ params }: { params: Promise<{ slot: string }> }) => {
  const slot = (await params).slot;

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
    .where(eq(posts.slug, slot))
    .limit(1);

  console.log(post);

  return (
    <div className="min-h-screen w-full mt-5">
      <div className="flex flex-col items-center">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={500}
          height={300}
          className="w-full h-[50%] md:w-[60%] md:h-[30%] object-cover"
          loading="lazy"
        />
      </div>

      <div className="mt-5">
        <h2 className="font-semibold text-2xl">{post.title}</h2>

        <div
          className="mt-5"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        <div className="mt-5">
          <p>
            <span className="font-semibold ">Category:</span>{" "}
            <span className="capitalize">{post.category}</span>
          </p>

          <p>
            <span className="font-semibold">Published On:</span>{" "}
            {post.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
