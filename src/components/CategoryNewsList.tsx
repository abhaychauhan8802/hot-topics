import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import CategoryPost from "./CategoryPost";

const CategoryNewsList = async () => {
  const topCategories = await db
    .select({ name: categories.name, id: categories.id })
    .from(categories)
    .limit(3);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4">
        {topCategories.map((category) => (
          <CategoryPost key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNewsList;
