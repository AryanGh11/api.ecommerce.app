import { Types } from "mongoose";
import { CategoryService } from "../category";
import { ProductDocumentsNotFoundError } from "./index.errors";

import {
  buildAdminSideSummaryProduct,
  buildAdminSideDetailedProduct,
} from "./index.schemaHydrator";

import {
  RepositoryService,
  IRepositoryServiceOverviewRes,
} from "../../composable/repository-service";

import {
  ProductModel,
  IProductDocument,
  IProductStaticMethods,
} from "./data-access";

import {
  IProductCreatePayload,
  IProductUpdatePayload,
  IProductAdminSideSummary,
  IProductAdminSideDetailed,
} from "./index.interfaces";

export class ProductService {
  private readonly repositoryService = new RepositoryService<
    IProductCreatePayload,
    IProductUpdatePayload,
    IProductDocument,
    IProductStaticMethods,
    ProductDocumentsNotFoundError
  >({
    model: ProductModel,
    fabricateResourceNotFoundError: () => new ProductDocumentsNotFoundError(),
  });

  async getAll(): Promise<
    IRepositoryServiceOverviewRes<IProductAdminSideSummary>
  > {
    const documents = await this.repositoryService.getAll();

    const total = documents.total;
    const data = documents.data.map((doc) => buildAdminSideSummaryProduct(doc));

    const response: IRepositoryServiceOverviewRes<IProductAdminSideSummary> = {
      total: total,
      data: data,
    };

    return response;
  }

  async getOne(id: string): Promise<IProductAdminSideDetailed> {
    const document = await this.repositoryService.getOne(id);

    return buildAdminSideDetailedProduct(document);
  }

  async create(
    payload: IProductCreatePayload
  ): Promise<IProductAdminSideDetailed> {
    const document = await this.repositoryService.create(payload);

    // Update categories
    await CategoryService.updateCategoriesForProducts({
      categoriesIds: payload.categories.map((c) => c.toObjectId()),
      productsIds: [document._id],
    });

    return buildAdminSideDetailedProduct(document);
  }

  async update({
    id,
    payload,
  }: {
    id: string;
    payload: Partial<IProductUpdatePayload>;
  }): Promise<IProductAdminSideDetailed> {
    const document = await this.repositoryService.update({
      id,
      payload,
    });

    // Update categories
    if (payload.categories) {
      await CategoryService.updateCategoriesForProducts({
        categoriesIds: payload.categories.map((c) => c.toObjectId()),
        productsIds: [document._id],
      });
    }

    return buildAdminSideDetailedProduct(document);
  }

  async delete(id: string): Promise<void> {
    return await this.repositoryService.delete(id);
  }

  /**
   * Update categories for the specfic products
   * @param productsIds
   * @param categoriesIds
   */
  public static readonly updateProductsForCategories = async ({
    productsIds,
    categoriesIds,
  }: {
    productsIds: Types.ObjectId[];
    categoriesIds: Types.ObjectId[];
  }): Promise<void> => {
    await ProductModel.updateMany(
      {},
      {
        $pullAll: {
          categories: categoriesIds,
        },
      }
    );
    await ProductModel.updateMany(
      { _id: productsIds },
      {
        $push: {
          categories: categoriesIds,
        },
      }
    );
  };
}
