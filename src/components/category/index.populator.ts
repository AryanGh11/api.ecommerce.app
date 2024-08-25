import { ICategoryDocument } from "./data-access";
import { Model, PopulateOptions } from "mongoose";
import { ProductDocumentPopulator, ProductModel } from "../product";

/**
 * CategoryDocumentPopulator
 *
 * If a class is populated for detailed, it must be
 * populated in a way that `isPopulatedForSummary` also returns true.
 */
export default class CategoryDocumentPopulator {
  public static readonly getSummaryPopulateOptions =
    (): PopulateOptions[] => [];

  public static readonly getDetailedPopulateOptions = (): PopulateOptions[] => [
    ...CategoryDocumentPopulator.getSummaryPopulateOptions(),
    {
      path: "products",
      model: ProductModel,
      populate: ProductDocumentPopulator.getSummaryPopulateOptions(),
    },
  ];

  public static readonly populateForSummary = async (
    model: Model<ICategoryDocument>,
    documents: ICategoryDocument[]
  ): Promise<void> => {
    await model.populate(
      documents,
      CategoryDocumentPopulator.getSummaryPopulateOptions()
    );
  };

  public static readonly isPopulatedForSummary = (
    document: ICategoryDocument
  ): boolean => {
    return true;
  };

  public static readonly ensurePopulatedForSummary = (
    document: ICategoryDocument
  ): void => {
    if (!this.isPopulatedForSummary(document)) {
      throw new Error(`Category ${document.id} is not populated for summary`);
    }
  };

  public static readonly populateForDetailed = async (
    document: ICategoryDocument
  ): Promise<void> => {
    await document.populate(
      CategoryDocumentPopulator.getDetailedPopulateOptions()
    );
  };

  public static readonly isPopulatedForDetailed = (
    document: ICategoryDocument
  ): boolean => {
    return document.populated("products");
  };
}
