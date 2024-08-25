import { ICategoryAdminSideSummary } from "../category";

import {
  IBaseAdminSideSummary,
  IBaseAdminSideDetailed,
} from "../../composable/repository-service";

export interface IProductAdminSideSummary extends IBaseAdminSideSummary {
  title: string;
  description: string;
  categoriesCount: number;
  price: number;
  quantity: number;
  images: string[];
}

export interface IProductAdminSideDetailed extends IBaseAdminSideDetailed {
  title: string;
  description: string;
  categories: ICategoryAdminSideSummary[];
  price: number;
  quantity: number;
  images: string[];
}

export interface IProductCreatePayload {
  title: string;
  description: string;
  categories: string[];
  price: number;
  quantity: number;
  images: string[];
}

export interface IProductUpdatePayload extends Partial<IProductCreatePayload> {}
