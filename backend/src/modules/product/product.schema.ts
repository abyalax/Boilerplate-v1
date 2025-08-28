import type { MetaRequest } from '~/common/types/meta';

export enum EProductStatus {
  AVAILABLE = 'Available',
  UNAVAILABLE = 'Unavailable',
}

export enum ESortBy {
  NAME = 'name',
  PRICE = 'price',
  STATUS = 'status',
  CATEGORY = 'category',
  STOCK = 'stock',
}

interface IFilter {
  price?: number;
  status?: EProductStatus;
  category?: string;
  stock?: number;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  status: EProductStatus;
  category: Category;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  products?: Product[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IQueryProducts extends MetaRequest<Product>, IFilter {}
