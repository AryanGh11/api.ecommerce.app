import { IOverviewAdminSide } from "./index.interfaces";
import { IProductAdminSideSummary, ProductService } from "../product";

export class OverviewService {
  async get(): Promise<IOverviewAdminSide> {
    // Get 10 latest (by created at date) products
    const latest: IProductAdminSideSummary[] = (
      await new ProductService().getAll({})
    ).data
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 9);

    // Get 10 most popular (by likes) products
    const mostPopular: IProductAdminSideSummary[] = (
      await new ProductService().getAll({})
    ).data
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 9);

    // Get 10 most views (by views) products
    const mostViews: IProductAdminSideSummary[] = (
      await new ProductService().getAll({})
    ).data
      .sort((a, b) => b.views - a.views)
      .slice(0, 9);

    // Get 10 features (by rates) products
    const features: IProductAdminSideSummary[] = (
      await new ProductService().getAll({})
    ).data
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 9);

    const response: IOverviewAdminSide = {
      latest,
      mostPopular,
      mostViews,
      features,
    };

    return response;
  }
}
