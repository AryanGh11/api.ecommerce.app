import TestimonialDocumentPopulator from "./index.populator";

import {
  ITestimonialModel,
  TestimonialSchema,
  ITestimonialDocument,
} from "./data-access";

import {
  ITestimonialAdminSideSummary,
  ITestimonialAdminSideDetailed,
} from "./index.interfaces";

import {
  IUserDocument,
  IUserAdminSideSummary,
  buildAdminSideSummaryUser,
} from "../user";

import {
  IProductDocument,
  IProductAdminSideSummary,
  buildAdminSideSummaryProduct,
} from "../product";

export const buildAdminSideSummaryTestimonial = function (
  document: ITestimonialDocument
): ITestimonialAdminSideSummary {
  TestimonialDocumentPopulator.ensurePopulatedForSummary(document);

  const populatedUser = document.user as unknown as IUserDocument;
  const populatedProduct = document.product as unknown as IProductDocument;

  const id: string = document._id.toString();
  const title: string = document.title;
  const body: string = document.body;
  const user: IUserAdminSideSummary = buildAdminSideSummaryUser(populatedUser);
  const product: IProductAdminSideSummary =
    buildAdminSideSummaryProduct(populatedProduct);
  const rating: number = document.rating;
  const createdAt = document.createdAt.toISOString();
  const updatedAt = document.updatedAt.toISOString();

  const data: ITestimonialAdminSideSummary = {
    id,
    title,
    body,
    user,
    product,
    rating,
    createdAt,
    updatedAt,
  };

  return data;
};

export const buildAdminSideDetailedTestimonial = async function (
  document: ITestimonialDocument
): Promise<ITestimonialAdminSideDetailed> {
  if (!TestimonialDocumentPopulator.isPopulatedForDetailed(document))
    await TestimonialDocumentPopulator.populateForDetailed(document);

  return buildAdminSideSummaryTestimonial(document);
};

export const hydrateSchema = (schema: TestimonialSchema) => {
  // STATIC METHODS
  schema.statics.populateForSummary = function (
    this: ITestimonialModel,
    documents: ITestimonialDocument[]
  ): Promise<void> {
    return TestimonialDocumentPopulator.populateForSummary(this, documents);
  };
};
