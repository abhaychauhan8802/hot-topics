import CategoryTable from "@/components/admin/CategoryTable";
import CategoryForm from "@/components/admin/forms/CategoryForm";
import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import { asc } from "drizzle-orm";

const Categories = async () => {
  const allCategories = await db
    .select({
      id: categories.id,
      name: categories.name,
      date: categories.createdAt,
    })
    .from(categories)
    .orderBy(asc(categories.name));

  return (
    <div>
      <h1 className="title">All Categories</h1>

      <div className="mt-5 w-full">
        <CategoryForm type="create" />

        <div className="mt-10">
          <CategoryTable categories={allCategories} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
