"use server";

import { db } from "@/db/drizzle";
import { categories, posts } from "@/db/schema";
import { eq } from "drizzle-orm";

export const addCategory = async (name: string) => {
  try {
    if (!name) {
      return {
        success: false,
        message: "Category name is required",
      };
    }

    await db.insert(categories).values({
      name,
    });

    return {
      success: true,
      message: "Category added successfully",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Error adding category",
    };
  }
};

export const updateCategory = async (id: string, name: string) => {
  try {
    if (!name || !id) {
      return {
        success: false,
        message: "Category name is required",
      };
    }

    await db
      .update(categories)
      .set({
        name,
      })
      .where(eq(categories.id, id));

    return {
      success: true,
      message: "Category updated successfully",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error updating category:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "Error updating category",
    };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "Category ID is required",
      };
    }

    const postsWithThisCategory = await db
      .select()
      .from(posts)
      .where(eq(posts.categoryId, id))
      .limit(1);

    if (postsWithThisCategory.length > 0) {
      return {
        success: false,
        message:
          "This category has posts associated with it, please delete the posts first",
      };
    }

    await db.delete(categories).where(eq(categories.id, id));

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error deleting category:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "Error deleting category",
    };
  }
};
