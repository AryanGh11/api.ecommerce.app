import { IUserAdminSideSummary } from "../user";
import { IProductAdminSideSummary } from "../product";

import {
  IBaseAdminSideQuery,
  IBaseAdminSideSummary,
} from "../../composable/repository-service";

export interface ITestimonialAdminSideSummary extends IBaseAdminSideSummary {
  title: string;
  body: string;
  user: IUserAdminSideSummary;
  product: IProductAdminSideSummary;
  rating: number;
}

export interface ITestimonialAdminSideDetailed
  extends ITestimonialAdminSideSummary {}

export interface ITestimonialCreatePayload {
  title: string;
  body: string;
  user: string;
  product: string;
  rating: number;
}

export interface ITestimonialUpdatePayload {
  title?: string;
  body?: string;
  rating?: number;
}

export interface ITestimonialQuery extends IBaseAdminSideQuery {
  title?: string;
  user?: string;
  product?: string;
}
