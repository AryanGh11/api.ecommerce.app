import { Types } from "mongoose";
import { ProductService } from "../product";

import {
  CategoryModel,
  ICategoryDocument,
  ICategoryStaticMethods,
} from "./data-access";

import {
  buildAdminSideSummaryCategory,
  buildAdminSideDetailedCategory,
} from "./index.schemaHydrator";

import {
  RepositoryService,
  IRepositoryServiceOverviewRes,
} from "../../composable/repository-service";

import {
  CategoryKeyAlreadyExistError,
  CategoryDocumentsNotFoundError,
} from "./index.errors";

import {
  ICategoryQuery,
  ICategoryCreatePayload,
  ICategoryUpdatePayload,
  ICategoryAdminSideSummary,
  ICategoryAdminSideDetailed,
} from "./index.interfaces";

export class CategoryService {
  private readonly repositoryService = new RepositoryService<
    ICategoryCreatePayload,
    ICategoryUpdatePayload,
    ICategoryDocument,
    ICategoryStaticMethods,
    CategoryDocumentsNotFoundError,
    ICategoryQuery
  >({
    model: CategoryModel,
    fabricateResourceNotFoundError: () => new CategoryDocumentsNotFoundError(),
  });

  async getAll(): Promise<
    IRepositoryServiceOverviewRes<ICategoryAdminSideSummary>
  > {
    const documents = await this.repositoryService.getAll();

    const total = documents.total;
    const data = documents.data.map((doc) =>
      buildAdminSideSummaryCategory(doc)
    );

    const response: IRepositoryServiceOverviewRes<ICategoryAdminSideSummary> = {
      total: total,
      data: data,
    };

    return response;
  }

  async getOne(id: string): Promise<ICategoryAdminSideDetailed> {
    const document = await this.repositoryService.getOne(id);

    return buildAdminSideDetailedCategory(document);
  }

  async create(
    payload: ICategoryCreatePayload
  ): Promise<ICategoryAdminSideDetailed> {
    const categories = (await this.repositoryService.getAll()).data;

    // Check for duplicate key
    const duplicateKey = categories.find(
      (category) => category.key === payload.key
    );
    if (duplicateKey) throw new CategoryKeyAlreadyExistError();

    const document = await this.repositoryService.create(payload);

    // Update products
    await ProductService.updateProductsForCategories({
      productsIds: payload.products.map((c) => c.toObjectId()),
      categoriesIds: [document._id],
    });

    return buildAdminSideDetailedCategory(document);
  }

  async update({
    id,
    payload,
  }: {
    id: string;
    payload: Partial<ICategoryUpdatePayload>;
  }): Promise<ICategoryAdminSideDetailed> {
    const categories = (await this.repositoryService.getAll()).data;
    const currentCategory = categories.find((category) => category.id === id);

    if (!currentCategory) {
      throw new CategoryDocumentsNotFoundError();
    }

    // Filter out the current category
    const filteredCategories = categories.filter((category) => {
      return category.id !== currentCategory.id;
    });

    // Check for duplicate key
    if (payload.key) {
      const duplicateKey = filteredCategories.find(
        (category) => category.key === payload.key
      );
      if (duplicateKey) throw new CategoryKeyAlreadyExistError();
    }

    const document = await this.repositoryService.update({
      id,
      payload,
    });

    // Update products
    if (payload.products) {
      await ProductService.updateProductsForCategories({
        productsIds: payload.products.map((c) => c.toObjectId()),
        categoriesIds: [document._id],
      });
    }

    return buildAdminSideDetailedCategory(document);
  }

  async delete(id: string): Promise<void> {
    // Remove category from all products
    await ProductService.removeCategoriesFromProducts([id.toObjectId()]);

    return await this.repositoryService.delete(id);
  }

  /**
   * Update products for the specfic categories
   * @param categoriesIds
   * @param productsIds
   */
  public static readonly updateCategoriesForProducts = async ({
    productsIds,
    categoriesIds,
  }: {
    categoriesIds: Types.ObjectId[];
    productsIds: Types.ObjectId[];
  }): Promise<void> => {
    await CategoryModel.updateMany(
      {},
      {
        $pullAll: {
          products: productsIds,
        },
      }
    );
    await CategoryModel.updateMany(
      { _id: categoriesIds },
      {
        $push: {
          products: productsIds,
        },
      }
    );
  };

  /**
   * Remove products from all categories
   * @param productsIds
   */
  public static readonly removeProductsFromCategories = async (
    productsIds: Types.ObjectId[]
  ): Promise<void> => {
    await CategoryModel.updateMany(
      {},
      {
        $pullAll: {
          products: productsIds,
        },
      }
    );
  };
}
