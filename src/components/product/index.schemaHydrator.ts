import ProductDocumentPopulator from "./index.populator";

import { IProductDocument, IProductModel, ProductSchema } from "./data-access";

import {
  IProductAdminSideSummary,
  IProductAdminSideDetailed,
} from "./index.interfaces";

import {
  ICategoryDocument,
  ICategoryAdminSideSummary,
  buildAdminSideSummaryCategory,
} from "../category";
import {
  buildAdminSideSummaryTestimonial,
  ITestimonialAdminSideSummary,
  ITestimonialDocument,
} from "../testimonial";

export const buildAdminSideSummaryProduct = function (
  document: IProductDocument
): IProductAdminSideSummary {
  ProductDocumentPopulator.ensurePopulatedForSummary(document);

  const id: string = document._id.toString();
  const title: string = document.title;
  const description: string = document.description;
  const categoriesCount: number = document.categories.length;
  const price: number = document.price;
  const quantity: number = document.quantity;
  const images: string[] = document.images;
  const rating: number = document.rating;
  const testimonialsCount: number = document.testimonials.length;
  const createdAt = document.createdAt.toISOString();
  const updatedAt = document.updatedAt.toISOString();

  const data: IProductAdminSideSummary = {
    id,
    title,
    description,
    categoriesCount,
    price,
    quantity,
    images,
    rating,
    testimonialsCount,
    createdAt,
    updatedAt,
  };

  return data;
};

export const buildAdminSideDetailedProduct = async function (
  document: IProductDocument
): Promise<IProductAdminSideDetailed> {
  if (!ProductDocumentPopulator.isPopulatedForDetailed(document))
    await ProductDocumentPopulator.populateForDetailed(document);

  const populatedCategories =
    document.categories as unknown as ICategoryDocument[];
  const populatedTestimonials =
    document.testimonials as unknown as ITestimonialDocument[];

  const id: string = document._id.toString();
  const title: string = document.title;
  const description: string = document.description;
  const categories: ICategoryAdminSideSummary[] = populatedCategories.map(
    (doc) => buildAdminSideSummaryCategory(doc)
  );
  const price: number = document.price;
  const quantity: number = document.quantity;
  const images: string[] = document.images;
  const rating: number = document.rating;
  const testimonials: ITestimonialAdminSideSummary[] =
    populatedTestimonials.map((doc) => buildAdminSideSummaryTestimonial(doc));
  const createdAt = document.createdAt.toISOString();
  const updatedAt = document.updatedAt.toISOString();

  const data: IProductAdminSideDetailed = {
    id,
    title,
    description,
    categories,
    price,
    quantity,
    images,
    rating,
    testimonials,
    createdAt,
    updatedAt,
  };

  return data;
};

export const hydrateSchema = (schema: ProductSchema) => {
  // STATIC METHODS
  schema.statics.populateForSummary = function (
    this: IProductModel,
    documents: IProductDocument[]
  ): Promise<void> {
    return ProductDocumentPopulator.populateForSummary(this, documents);
  };
};
