"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postSchema } from "@/lib/validations";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { toast } from "sonner";
import { addPost } from "@/actions/admin/post";
import imageCompression from "browser-image-compression";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import CategoryForm from "./CategoryForm";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface Props extends Partial<Post> {
  type: "create" | "update";
  categories: Pick<Category, "id" | "name">[];
}

const PostForm = ({ type, categories, ...post }: Props) => {
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      image: "",
      authorId: post?.authorId || "",
      categoryId: post?.categoryId || "",
    },
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  };

  const submitForm = async (values: z.infer<typeof postSchema>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("authorId", values.authorId);
      formData.append("categoryId", values.categoryId);

      const compressedFile = await compressImage(values.image);
      formData.append("image", compressedFile);

      const slug = values.slug.split(" ").join("-").toLowerCase().trim();
      formData.append("slug", slug);

      if (type === "create") {
        const result = await addPost(formData);

        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      }

      router.push("/admin/posts");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" className="input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Slug" className="input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* category selector */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="py-6 w-full capitalize">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <div>
                      <CategoryForm
                        type="create"
                        buttonClassName="btn-ghost w-full mb-2 text-sm font-normal"
                      />
                    </div>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                        className="capitalize"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* image upload */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Controller
                  name="image"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          onChange(e.target.files[0]);
                        }
                      }}
                      className="input pt-2"
                    />
                  )}
                />
              </FormControl>
              <FormMessage />

              {field.value && (
                <Image
                  src={URL.createObjectURL(field.value)}
                  alt="Preview"
                  className="mt-2 h-[230px] object-cover"
                  height={230}
                  width={400}
                />
              )}
            </FormItem>
          )}
        />

        {/* Text editor */}
        <div className="mb-5">
          <Controller
            name="content"
            control={form.control}
            rules={{ required: "Content is required" }}
            render={({ field, fieldState }) => (
              <>
                <FormLabel className="mb-2">Content</FormLabel>
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  className="h-[450px]"
                />
                {fieldState.error ? (
                  <p className="text-destructive text-sm mt-13">
                    {fieldState.error.message}
                  </p>
                ) : (
                  <p className="text-transparent select-none text-sm mt-13">
                    dummy
                  </p>
                )}
              </>
            )}
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin" /> Loading...
            </span>
          ) : type === "create" ? (
            "Add Post"
          ) : (
            "Update Post"
          )}
        </button>
      </form>
    </Form>
  );
};

export default PostForm;
