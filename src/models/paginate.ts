/* eslint-disable no-unused-vars */
import { Product } from '@models/product';

export interface PaginateContextModel {
  paginate: Paginate;
  setProducts: (products: Product[]) => void;
  incresePage: () => void;
  decresePage: () => void;
  selectPage: (page: number) => void;
  setProductsSegment: (page: number) => void;
}

export interface Paginate {
  actualPage: number;
  actualShow: number;
  range: number;
  products: Product[];
  productsSegment: Product[];
  maximumPages: number;
  pagesToShow: number;
}
