"use client";

import { deleteCategory } from "@/actions/admin/category";
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
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const DeleteCatagory = ({
  customButton,
  categoryId,
}: {
  customButton?: React.ReactNode;
  categoryId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deleteCategory(categoryId);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

      startTransition(() => {
        router.refresh();
      });

      setOpen(false);
    } catch (error: unknown) {
      const err = error as Error;
      console.log(err.message);
      toast.error("Error deleting post");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          {customButton ? customButton : <button>Delete Category</button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you wnat to delete this Category.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DeleteCatagory;
