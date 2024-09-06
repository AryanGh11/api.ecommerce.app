import UserDocumentPopulator from "./index.populator";

import { IUserDocument, IUserModel, UserSchema } from "./data-access";

import {
  IUserAdminSideSummary,
  IUserAdminSideDetailed,
} from "./index.interfaces";

import {
  ITestimonialDocument,
  ITestimonialAdminSideSummary,
  buildAdminSideSummaryTestimonial,
} from "../testimonial";

export const buildAdminSideSummaryUser = function (
  document: IUserDocument
): IUserAdminSideSummary {
  UserDocumentPopulator.ensurePopulatedForSummary(document);

  const id: string = document._id.toString();
  const nickname: string = document.nickname;
  const username: string = document.username;
  const email: string = document.email;
  const avatarUrl: string = document.avatarUrl;
  const createdAt = document.createdAt.toISOString();
  const updatedAt = document.updatedAt.toISOString();

  const data: IUserAdminSideSummary = {
    id,
    nickname,
    username,
    email,
    avatarUrl,
    createdAt,
    updatedAt,
  };

  return data;
};

export const buildAdminSideDetailedUser = async function (
  document: IUserDocument
): Promise<IUserAdminSideDetailed> {
  if (!UserDocumentPopulator.isPopulatedForDetailed(document))
    await UserDocumentPopulator.populateForDetailed(document);

  const populatedTestimonials =
    document.testimonials as unknown as ITestimonialDocument[];

  const id: string = document._id.toString();
  const nickname: string = document.nickname;
  const username: string = document.username;
  const email: string = document.email;
  const authToken: string = document.authToken;
  const isEmailVerified: boolean = document.isEmailVerified;
  const testimonials: ITestimonialAdminSideSummary[] =
    populatedTestimonials.map((doc) => buildAdminSideSummaryTestimonial(doc));
  const avatarUrl: string = document.avatarUrl;
  const createdAt = document.createdAt.toISOString();
  const updatedAt = document.updatedAt.toISOString();

  const data: IUserAdminSideDetailed = {
    id,
    nickname,
    username,
    email,
    authToken,
    isEmailVerified,
    testimonials,
    avatarUrl,
    createdAt,
    updatedAt,
  };

  return data;
};

export const hydrateSchema = (schema: UserSchema) => {
  // STATIC METHODS
  schema.statics.populateForSummary = function (
    this: IUserModel,
    documents: IUserDocument[]
  ): Promise<void> {
    return UserDocumentPopulator.populateForSummary(this, documents);
  };
};
