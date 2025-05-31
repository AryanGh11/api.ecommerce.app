import { IProductAdminSideSummary } from "../product";

export interface IOverviewAdminSide {
  latest: IProductAdminSideSummary[];
  mostPopular: IProductAdminSideSummary[];
  mostViews: IProductAdminSideSummary[];
  features: IProductAdminSideSummary[];
}
