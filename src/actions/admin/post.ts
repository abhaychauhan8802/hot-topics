"use server";

import cloudinary from "@/config/cloudinary";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { UploadApiResponse } from "cloudinary";
import { eq } from "drizzle-orm";

export const addPost = async (formData: FormData) => {
  try {
    const file = formData.get("image") as File;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const authorId = formData.get("authorId") as string;
    const categoryId = formData.get("categoryId") as string;

    if (!title || !slug || !content || !file || !authorId || !categoryId) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "hottopics/posts",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        );
        stream.end(buffer);
      }
    );

    await db.insert(posts).values({
      title,
      slug,
      content,
      imageUrl: uploadResponse.secure_url,
      authorId: authorId,
      categoryId: categoryId,
    });

    return {
      success: true,
      message: "Post added successfully",
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
      message: "Adding Post failed",
    };
  }
};

export const deletePost = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!id) {
      return {
        success: false,
        message: "Post ID is required",
      };
    }

    await db.delete(posts).where(eq(posts.id, id));

    return {
      success: true,
      message: "Post deleted successfully",
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
      message: "Adding Post failed",
    };
  }
};
