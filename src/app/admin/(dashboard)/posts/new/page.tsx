import PostForm from "@/components/admin/forms/PostForm";
import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import { getSession } from "@/lib/server/auth";
import { asc } from "drizzle-orm";

const AddPost = async () => {
  const session = await getSession();
  const userId = session?.id;

  const allCategories = await db
    .select({
      id: categories.id,
      name: categories.name,
    })
    .from(categories)
    .orderBy(asc(categories.name));

  return (
    <div>
      <h1 className="title">Add New Post</h1>

      <div className="mt-5">
        <PostForm
          type="create"
          categories={allCategories}
          {...{ authorId: userId }}
        />
      </div>
    </div>
  );
};

export default AddPost;
