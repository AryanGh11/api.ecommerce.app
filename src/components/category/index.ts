import CategoryDocumentPopulator from "./index.populator";

import { router } from "./index.controller";
import { CategoryService } from "./index.service";

import {
  CategoryModel,
  CategorySchema,
  ICategoryDocument,
} from "./data-access";

import {
  ICategoryAdminSideSummary,
  ICategoryAdminSideDetailed,
} from "./index.interfaces";

import {
  buildAdminSideSummaryCategory,
  buildAdminSideDetailedCategory,
} from "./index.schemaHydrator";

export {
  CategoryModel,
  CategorySchema,
  CategoryService,
  ICategoryDocument,
  router as categoryRouter,
  ICategoryAdminSideSummary,
  CategoryDocumentPopulator,
  ICategoryAdminSideDetailed,
  buildAdminSideSummaryCategory,
  buildAdminSideDetailedCategory,
};
