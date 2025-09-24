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
          <TableHead className="w-[120px]">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Create Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={100}
                height={50}
                loading="lazy"
                className="w-[100px] h-[50px] object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{post.title}</TableCell>
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
