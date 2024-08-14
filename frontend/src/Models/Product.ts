import { SyntheticEvent } from "react";

export interface ProductGet {
  id: number;
  name: string;
  price: number;
  quatityInStock: number;
  description: string;
  image: string;
  supplierId: number; // Foreign key to Supplier
  categoryId: number; // Foreign key to category
}

export interface ProductPost {
  name: string;
  price: number;
  quatityInStock: number;
  description: string;
  image: string;
  supplierId: number; // Foreign key to Supplier
  categoryId: number; // Foreign key to category
}
