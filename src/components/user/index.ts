import UserDocumentPopulator from "./index.populator";
import UserConstraintsProvider from "./index.constraintsProvider";

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

import {
  UserInvalidPasswordError,
  UserDocumentsNotFoundError,
  UserEmailAlreadyExistError,
  UserUsernameAlreadyExistError,
  UserEmailAlreadyVerifiedError,
} from "./index.errors";

export {
  UserModel,
  UserSchema,
  UserService,
  IUserDocument,
  router as userRouter,
  IUserAdminSideSummary,
  UserDocumentPopulator,
  IUserAdminSideDetailed,
  UserConstraintsProvider,
  UserInvalidPasswordError,
  buildAdminSideSummaryUser,
  buildAdminSideDetailedUser,
  UserDocumentsNotFoundError,
  UserEmailAlreadyExistError,
  UserUsernameAlreadyExistError,
  UserEmailAlreadyVerifiedError,
};
