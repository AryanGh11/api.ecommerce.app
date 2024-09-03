import TestimonialDocumentPopulator from "./index.populator";

import { router } from "./index.controller";
import { TestimonialService } from "./index.service";
import {
  TestimonialModel,
  TestimonialSchema,
  ITestimonialDocument,
} from "./data-access";

import {
  ITestimonialAdminSideSummary,
  ITestimonialAdminSideDetailed,
} from "./index.interfaces";

import {
  buildAdminSideSummaryTestimonial,
  buildAdminSideDetailedTestimonial,
} from "./index.schemaHydrator";

export {
  TestimonialModel,
  TestimonialSchema,
  TestimonialService,
  ITestimonialDocument,
  router as testimonialRouter,
  ITestimonialAdminSideSummary,
  TestimonialDocumentPopulator,
  ITestimonialAdminSideDetailed,
  buildAdminSideSummaryTestimonial,
  buildAdminSideDetailedTestimonial,
};
