import z from "zod";

export const postSchema = z.object({
  slug: z.string().trim().nonempty().min(3),
  title: z.string().trim().nonempty().min(3),
  content: z.string().nonempty().min(100),
  image: z.any().refine((file) => file instanceof File, "File is required"),
  categoryId: z.string().nonempty(),
  authorId: z.string().nonempty(),
});
