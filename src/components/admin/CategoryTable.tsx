import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ExternalLink, SquarePen, Trash2 } from "lucide-react";
import CategoryForm from "./forms/CategoryForm";
import DeleteCatagory from "./forms/DeleteCatagory";

const ICON_SIZE = 18;

const CategoryTable = ({
  categories,
}: {
  categories: {
    id: string;
    name: string;
    date: Date;
  }[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S.No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Create Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, idx) => (
          <TableRow key={`row-${category.id}-${idx}`}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>{category.date.toLocaleDateString()}</TableCell>
            <TableCell>
              <span className="flex gap-2 items-center">
                <Link href={`/search?category=${category.name}`}>
                  <button>
                    <ExternalLink size={ICON_SIZE} />
                  </button>
                </Link>
                <CategoryForm
                  type="update"
                  category={category}
                  customButton={
                    <button>
                      <SquarePen size={ICON_SIZE} />
                    </button>
                  }
                />
                <DeleteCatagory
                  categoryId={category.id}
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

export default CategoryTable;
