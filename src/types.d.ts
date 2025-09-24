interface Post {
  id: string;
  title: string;
  slug: string;
  content?: string;
  imageUrl: string;
  authorId?: string;
  categoryId?: string;
  createdAt?: Date;
  category?: string | null;
}

interface Category {
  id: string;
  name: string;
  createdAt: string;
}
