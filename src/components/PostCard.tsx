import Image from "next/image";
import Link from "next/link";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={`/news/${post.slug}`} className="flex gap-2 items-center">
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={100}
        height={50}
        className="object-cover w-[100px] h-[50px]"
      />
      <p className="text-base">{post.title}</p>
    </Link>
  );
};

export default PostCard;
