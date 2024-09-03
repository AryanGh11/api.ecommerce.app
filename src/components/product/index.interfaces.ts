import { ICategoryAdminSideSummary } from "../category";
import { ITestimonialAdminSideSummary } from "../testimonial";

import {
  IBaseAdminSideQuery,
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
  rating: number;
  testimonialsCount: number;
}

export interface IProductAdminSideDetailed extends IBaseAdminSideDetailed {
  title: string;
  description: string;
  categories: ICategoryAdminSideSummary[];
  price: number;
  quantity: number;
  images: string[];
  rating: number;
  testimonials: ITestimonialAdminSideSummary[];
}

export interface IProductCreatePayload {
  title: string;
  description: string;
  categories: string[];
  price: number;
  quantity: number;
  images: string[];
}

export interface IProductUpdatePayload extends Partial<IProductCreatePayload> {
  rating?: number;
}

export interface IProductQuery extends IBaseAdminSideQuery {
  title?: string;
  categories?: string;
}
