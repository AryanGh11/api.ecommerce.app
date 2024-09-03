import { IUserDocument } from "./data-access";
import { Model, PopulateOptions } from "mongoose";
import { TestimonialDocumentPopulator, TestimonialModel } from "../testimonial";

/**
 * UserDocumentPopulator
 *
 * If a class is populated for detailed, it must be
 * populated in a way that `isPopulatedForSummary` also returns true.
 */
export default class UserDocumentPopulator {
  public static readonly getSummaryPopulateOptions =
    (): PopulateOptions[] => [];

  public static readonly getDetailedPopulateOptions = (): PopulateOptions[] => [
    ...UserDocumentPopulator.getSummaryPopulateOptions(),
    {
      path: "testimonials",
      model: TestimonialModel,
      populate: TestimonialDocumentPopulator.getSummaryPopulateOptions(),
    },
  ];

  public static readonly populateForSummary = async (
    model: Model<IUserDocument>,
    documents: IUserDocument[]
  ): Promise<void> => {
    await model.populate(
      documents,
      UserDocumentPopulator.getSummaryPopulateOptions()
    );
  };

  public static readonly isPopulatedForSummary = (
    document: IUserDocument
  ): boolean => {
    return true;
  };

  public static readonly ensurePopulatedForSummary = (
    document: IUserDocument
  ): void => {
    if (!this.isPopulatedForSummary(document)) {
      throw new Error(`User ${document.id} is not populated for summary`);
    }
  };

  public static readonly populateForDetailed = async (
    document: IUserDocument
  ): Promise<void> => {
    await document.populate(UserDocumentPopulator.getDetailedPopulateOptions());
  };

  public static readonly isPopulatedForDetailed = (
    document: IUserDocument
  ): boolean => {
    return document.populated("testimonials");
  };
}
