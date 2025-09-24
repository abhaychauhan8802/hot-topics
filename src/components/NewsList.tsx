import Image from "next/image";
import Link from "next/link";

const NewsList = ({
  posts,
}: {
  posts: Pick<Post, "id" | "title" | "slug" | "imageUrl">[];
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/news/${post.slug}`}
          className="relative overflow-hidden shadow-lg rounded-xl group"
        >
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={500}
            height={300}
            className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
            {/* <span className="text-xs font-semibold uppercase">{post.category}</span> */}
            <h3 className="mt-1 text-base font-bold leading-snug group-hover:underline">
              {post.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NewsList;
