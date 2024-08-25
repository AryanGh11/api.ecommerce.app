import CategoryDocumentPopulator from "./index.populator";

import {
  ICategoryDocument,
  ICategoryModel,
  CategorySchema,
} from "./data-access";

import {
  ICategoryAdminSideSummary,
  ICategoryAdminSideDetailed,
} from "./index.interfaces";

import {
  IProductDocument,
  IProductAdminSideSummary,
  buildAdminSideSummaryProduct,
} from "../product";

export const buildAdminSideSummaryCategory = function (
  document: ICategoryDocument
): ICategoryAdminSideSummary {
  CategoryDocumentPopulator.ensurePopulatedForSummary(document);

  const id: string = document._id.toString();
  const title: string = document.title;
  const key: string = document.key;
  const productsCount: number = document.products.length;
  const createdAt = document.createdAt.toISOString();
  const updatedAt = document.updatedAt.toISOString();

  const data: ICategoryAdminSideSummary = {
    id,
    title,
    key,
    productsCount,
    createdAt,
    updatedAt,
  };

  return data;
};

export const buildAdminSideDetailedCategory = async function (
  document: ICategoryDocument
): Promise<ICategoryAdminSideDetailed> {
  if (!CategoryDocumentPopulator.isPopulatedForDetailed(document))
    await CategoryDocumentPopulator.populateForDetailed(document);

  const populatedProducts = document.products as unknown as IProductDocument[];

  const id: string = document._id.toString();
  const title: string = document.title;
  const key: string = document.key;
  const products: IProductAdminSideSummary[] = populatedProducts.map((doc) =>
    buildAdminSideSummaryProduct(doc)
  );
  const createdAt = document.createdAt.toISOString();
  const updatedAt = document.updatedAt.toISOString();

  const data: ICategoryAdminSideDetailed = {
    id,
    title,
    key,
    products,
    createdAt,
    updatedAt,
  };

  return data;
};

export const hydrateSchema = (schema: CategorySchema) => {
  // STATIC METHODS
  schema.statics.populateForSummary = function (
    this: ICategoryModel,
    documents: ICategoryDocument[]
  ): Promise<void> {
    return CategoryDocumentPopulator.populateForSummary(this, documents);
  };
};
