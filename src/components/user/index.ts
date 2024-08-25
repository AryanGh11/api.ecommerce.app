import UserDocumentPopulator from "./index.populator";

import { router } from "./index.controller";
import { UserService } from "./index.service";
import { UserModel, UserSchema, IUserDocument } from "./data-access";

import {
  IUserAdminSideSummary,
  IUserAdminSideDetailed,
} from "./index.interfaces";

import {
  buildAdminSideSummaryUser,
  buildAdminSideDetailedUser,
} from "./index.schemaHydrator";

export {
  UserModel,
  UserSchema,
  UserService,
  IUserDocument,
  router as userRouter,
  IUserAdminSideSummary,
  UserDocumentPopulator,
  IUserAdminSideDetailed,
  buildAdminSideSummaryUser,
  buildAdminSideDetailedUser,
};
