import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { ExternalLink, Trash2 } from "lucide-react";
import DeletePost from "./forms/DeletePost";

const ICON_SIZE = 18;

const PostTable = ({
  posts,
}: {
  posts: Omit<Post, "authorId" | "categoryId">[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Create Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post, idx) => (
          <TableRow key={idx}>
            <TableCell className="aspect-video overflow-hidden w-[80px] rounded-xl shrink-0">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={50}
                height={10}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </TableCell>
            <TableCell className="font-medium max-w-[200px] overflow-hidden pr-20">
              {post.title}
            </TableCell>
            <TableCell>{post.category}</TableCell>
            <TableCell>{post.createdAt!.toLocaleDateString()}</TableCell>
            <TableCell>
              <span className="flex gap-2 items-center">
                <Link href={`/news/${post.slug}`}>
                  <ExternalLink size={ICON_SIZE} />
                </Link>
                {/* <Link href={`/admin/posts/edit/${post.id}`}>
                        <SquarePen size={ICON_SIZE} />
                      </Link> */}
                <DeletePost
                  postId={post.id}
                  customButton={
                    <button>
                      <Trash2 size={ICON_SIZE} />
                    </button>
                  }
                />
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PostTable;
