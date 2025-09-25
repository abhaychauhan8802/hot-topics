import Image from "next/image";
import Link from "next/link";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={`/news/${post.slug}`} className="flex gap-3 items-center">
      <div className="aspect-video overflow-hidden rounded-sm shrink-0 w-[90px]">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={40}
          height={10}
          loading="lazy"
          className="object-cover w-full h-full"
        />
      </div>
      <p className="text-base">{post.title}</p>
    </Link>
  );
};

export default PostCard;
