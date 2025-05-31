import { IIntroDocument } from "./data-access";
import { Model, PopulateOptions } from "mongoose";

/**
 * IntroDocumentPopulator
 *
 * If a class is populated for detailed, it must be
 * populated in a way that `isPopulatedForSummary` also returns true.
 */
export default class IntroDocumentPopulator {
  public static readonly getSummaryPopulateOptions =
    (): PopulateOptions[] => [];

  public static readonly getDetailedPopulateOptions = (): PopulateOptions[] => [
    ...IntroDocumentPopulator.getSummaryPopulateOptions(),
  ];

  public static readonly populateForSummary = async (
    model: Model<IIntroDocument>,
    documents: IIntroDocument[]
  ): Promise<void> => {
    await model.populate(
      documents,
      IntroDocumentPopulator.getSummaryPopulateOptions()
    );
  };

  public static readonly isPopulatedForSummary = (
    document: IIntroDocument
  ): boolean => {
    return true;
  };

  public static readonly ensurePopulatedForSummary = (
    document: IIntroDocument
  ): void => {
    if (!this.isPopulatedForSummary(document)) {
      throw new Error(`Intro ${document.id} is not populated for summary`);
    }
  };

  public static readonly populateForDetailed = async (
    document: IIntroDocument
  ): Promise<void> => {
    await document.populate(
      IntroDocumentPopulator.getDetailedPopulateOptions()
    );
  };

  public static readonly isPopulatedForDetailed = (
    document: IIntroDocument
  ): boolean => {
    return this.isPopulatedForSummary(document);
  };
}
