import { IProductAdminSideSummary } from "../product/index.interfaces";

import {
  IBaseAdminSideQuery,
  IBaseAdminSideSummary,
  IBaseAdminSideDetailed,
} from "../../composable/repository-service";

export interface ICategoryAdminSideSummary extends IBaseAdminSideSummary {
  title: string;
  key: string;
  productsCount: number;
}

export interface ICategoryAdminSideDetailed extends IBaseAdminSideDetailed {
  title: string;
  key: string;
  products: IProductAdminSideSummary[];
}

export interface ICategoryCreatePayload {
  title: string;
  key: string;
  products: string[];
}

export interface ICategoryUpdatePayload
  extends Partial<ICategoryCreatePayload> {}

export interface ICategoryQuery extends IBaseAdminSideQuery {
  title?: string;
  key?: string;
  products?: string;
}
