import IntroDocumentPopulator from "./index.populator";

import { IIntroDocument, IIntroModel, IntroSchema } from "./data-access";

import {
  IIntroAdminSideSummary,
  IIntroAdminSideDetailed,
} from "./index.interfaces";

export const buildAdminSideSummaryIntro = function (
  document: IIntroDocument
): IIntroAdminSideSummary {
  IntroDocumentPopulator.ensurePopulatedForSummary(document);

  const id: string = document._id.toString();
  const title: string = document.title;
  const text: string = document.text;
  const imageUrl: string = document.imageUrl;
  const createdAt = document.createdAt.toISOString();
  const updatedAt = document.updatedAt.toISOString();

  const data: IIntroAdminSideSummary = {
    id,
    title,
    text,
    imageUrl,
    createdAt,
    updatedAt,
  };

  return data;
};

export const buildAdminSideDetailedIntro = async function (
  document: IIntroDocument
): Promise<IIntroAdminSideDetailed> {
  if (!IntroDocumentPopulator.isPopulatedForDetailed(document))
    await IntroDocumentPopulator.populateForDetailed(document);

  return buildAdminSideSummaryIntro(document);
};

export const hydrateSchema = (schema: IntroSchema) => {
  // STATIC METHODS
  schema.statics.populateForSummary = function (
    this: IIntroModel,
    documents: IIntroDocument[]
  ): Promise<void> {
    return IntroDocumentPopulator.populateForSummary(this, documents);
  };
};
