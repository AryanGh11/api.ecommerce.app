import { CategoryDocumentPopulator, CategoryModel } from "../category";
import { IProductDocument } from "./data-access";
import { Model, PopulateOptions } from "mongoose";

/**
 * ProductDocumentPopulator
 *
 * If a class is populated for detailed, it must be
 * populated in a way that `isPopulatedForSummary` also returns true.
 */
export default class ProductDocumentPopulator {
  public static readonly getSummaryPopulateOptions =
    (): PopulateOptions[] => [];

  public static readonly getDetailedPopulateOptions = (): PopulateOptions[] => [
    ...ProductDocumentPopulator.getSummaryPopulateOptions(),
    {
      path: "categories",
      model: CategoryModel,
      populate: CategoryDocumentPopulator.getSummaryPopulateOptions(),
    },
  ];

  public static readonly populateForSummary = async (
    model: Model<IProductDocument>,
    documents: IProductDocument[]
  ): Promise<void> => {
    await model.populate(
      documents,
      ProductDocumentPopulator.getSummaryPopulateOptions()
    );
  };

  public static readonly isPopulatedForSummary = (
    document: IProductDocument
  ): boolean => {
    return true;
  };

  public static readonly ensurePopulatedForSummary = (
    document: IProductDocument
  ): void => {
    if (!this.isPopulatedForSummary(document)) {
      throw new Error(`Product ${document.id} is not populated for summary`);
    }
  };

  public static readonly populateForDetailed = async (
    document: IProductDocument
  ): Promise<void> => {
    await document.populate(
      ProductDocumentPopulator.getDetailedPopulateOptions()
    );
  };

  public static readonly isPopulatedForDetailed = (
    document: IProductDocument
  ): boolean => {
    return document.populated("categories");
  };
}
