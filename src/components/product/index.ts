import ProductDocumentPopulator from "./index.populator";

import { router } from "./index.controller";
import { ProductService } from "./index.service";
import { ProductModel, ProductSchema, IProductDocument } from "./data-access";

import {
  IProductAdminSideSummary,
  IProductAdminSideDetailed,
} from "./index.interfaces";

import {
  buildAdminSideSummaryProduct,
  buildAdminSideDetailedProduct,
} from "./index.schemaHydrator";

export {
  ProductModel,
  ProductSchema,
  ProductService,
  IProductDocument,
  router as productRouter,
  IProductAdminSideSummary,
  ProductDocumentPopulator,
  IProductAdminSideDetailed,
  buildAdminSideSummaryProduct,
  buildAdminSideDetailedProduct,
};
