export interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category?: Category;
  categoryId?: number;
  images: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
}
