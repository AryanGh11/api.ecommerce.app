import IntroDocumentPopulator from "./index.populator";

import { router } from "./index.controller";
import { IntroService } from "./index.service";

import { IntroModel, IntroSchema, IIntroDocument } from "./data-access";

import {
  IIntroAdminSideSummary,
  IIntroAdminSideDetailed,
} from "./index.interfaces";

import {
  buildAdminSideSummaryIntro,
  buildAdminSideDetailedIntro,
} from "./index.schemaHydrator";

export {
  IntroModel,
  IntroSchema,
  IntroService,
  IIntroDocument,
  router as introRouter,
  IIntroAdminSideSummary,
  IntroDocumentPopulator,
  IIntroAdminSideDetailed,
  buildAdminSideSummaryIntro,
  buildAdminSideDetailedIntro,
};
