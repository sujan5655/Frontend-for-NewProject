export interface Category {
  id: number;
  category_name: string;
  slug: string;
  description: string;
  cat_image: string | null;
}

export interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "succeded" | "failed";
  error: string | null;
}
