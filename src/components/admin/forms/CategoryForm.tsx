"use client";

import { addCategory, updateCategory } from "@/actions/admin/category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type CategoryFormProps =
  | {
      type: "create";
      buttonClassName?: string;
      customButton?: React.ReactNode;
      category?: never; // not allowed
    }
  | {
      type: "update";
      buttonClassName?: string;
      customButton?: React.ReactNode;
      category: Pick<Category, "id" | "name">; // required
    };

const CategoryForm = ({
  type,
  buttonClassName = "btn-primary",
  customButton = null,
  category,
}: CategoryFormProps) => {
  const [name, setName] = useState(category?.name ?? "");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [_, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validName = name.trim().toLowerCase();

    setLoading(true);

    try {
      if (!validName) {
        toast.error("Category name is required");
        return;
      }

      if (type === "create") {
        const result = await addCategory(validName);
        if (result.success) {
          toast.success(result.message);
          startTransition(() => {
            router.refresh();
          });
        } else {
          toast.error(result.message);
        }
      } else {
        const result = await updateCategory(category.id, validName);

        if (result.success) {
          toast.success(result.message);
          startTransition(() => {
            router.refresh();
          });
        } else {
          toast.error(result.message);
        }
      }

      setOpen(false);
      setName("");
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          {customButton ? (
            customButton
          ) : (
            <button className={buttonClassName}>
              <Plus /> Add Category
            </button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Create a new category by entering a name.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Label htmlFor="name-1">Category Name</Label>
            <Input
              name="name"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin" />{" "}
                  {type === "create" ? "Creating..." : "Updating..."}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {type === "create" ? "Add Category" : "Update Category"}
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CategoryForm;
