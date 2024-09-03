import { FilterQuery, Types } from "mongoose";
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
  IProductQuery,
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
    ProductDocumentsNotFoundError,
    IProductQuery
  >({
    model: ProductModel,
    fabricateResourceNotFoundError: () => new ProductDocumentsNotFoundError(),
  });

  async getAll({
    query,
  }: {
    query: IProductQuery;
  }): Promise<IRepositoryServiceOverviewRes<IProductAdminSideSummary>> {
    const filter: FilterQuery<IProductDocument> = {};

    if (query.title) {
      filter.title = { $regex: query.title, $options: "i" };
    }

    if (query.categories) {
      filter.categories = { $in: query.categories.split(",") };
    }

    const documents = await this.repositoryService.getAll({ filter });

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
    // Remove product from all categories
    await CategoryService.removeProductsFromCategories([id.toObjectId()]);

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

  /**
   * Remove categories from all products
   * @param categoriesIds
   */
  public static readonly removeCategoriesFromProducts = async (
    categoriesIds: Types.ObjectId[]
  ): Promise<void> => {
    await ProductModel.updateMany(
      {},
      {
        $pullAll: {
          categories: categoriesIds,
        },
      }
    );
  };

  /**
   * Add testimonial to the product
   * @param productId
   * @param testimonialId
   */
  public static readonly addTestimonialToProduct = async ({
    testimonialId,
    productId,
  }: {
    productId: Types.ObjectId;
    testimonialId: Types.ObjectId;
  }): Promise<void> => {
    await ProductModel.updateOne(
      { _id: productId },
      {
        $push: {
          testimonials: testimonialId,
        },
      }
    );
  };
}
