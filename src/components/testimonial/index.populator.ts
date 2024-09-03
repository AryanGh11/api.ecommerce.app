import { Model, PopulateOptions } from "mongoose";
import { ITestimonialDocument } from "./data-access";
import { UserDocumentPopulator, UserModel } from "../user";
import { ProductDocumentPopulator, ProductModel } from "../product";

/**
 * TestimonialDocumentPopulator
 *
 * If a class is populated for detailed, it must be
 * populated in a way that `isPopulatedForSummary` also returns true.
 */
export default class TestimonialDocumentPopulator {
  public static readonly getSummaryPopulateOptions = (): PopulateOptions[] => [
    {
      path: "user",
      model: UserModel,
      populate: UserDocumentPopulator.getSummaryPopulateOptions(),
    },
    {
      path: "product",
      model: ProductModel,
      populate: ProductDocumentPopulator.getSummaryPopulateOptions(),
    },
  ];

  public static readonly getDetailedPopulateOptions = (): PopulateOptions[] => [
    ...TestimonialDocumentPopulator.getSummaryPopulateOptions(),
  ];

  public static readonly populateForSummary = async (
    model: Model<ITestimonialDocument>,
    documents: ITestimonialDocument[]
  ): Promise<void> => {
    await model.populate(
      documents,
      TestimonialDocumentPopulator.getSummaryPopulateOptions()
    );
  };

  public static readonly isPopulatedForSummary = (
    document: ITestimonialDocument
  ): boolean => {
    return document.populated("user" && "product");
  };

  public static readonly ensurePopulatedForSummary = (
    document: ITestimonialDocument
  ): void => {
    if (!this.isPopulatedForSummary(document)) {
      throw new Error(
        `Testimonial ${document.id} is not populated for summary`
      );
    }
  };

  public static readonly populateForDetailed = async (
    document: ITestimonialDocument
  ): Promise<void> => {
    await document.populate(
      TestimonialDocumentPopulator.getDetailedPopulateOptions()
    );
  };

  public static readonly isPopulatedForDetailed = (
    document: ITestimonialDocument
  ): boolean => {
    return this.isPopulatedForSummary(document);
  };
}
