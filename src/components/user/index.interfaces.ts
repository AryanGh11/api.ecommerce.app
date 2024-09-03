import { ITestimonialAdminSideSummary } from "../testimonial";

import {
  IBaseAdminSideQuery,
  IBaseAdminSideSummary,
  IBaseAdminSideDetailed,
} from "../../composable/repository-service";

export interface IUserAdminSideSummary extends IBaseAdminSideSummary {
  nickname: string;
  username: string;
  email: string;
}

export interface IUserAdminSideDetailed extends IBaseAdminSideDetailed {
  nickname: string;
  username: string;
  email: string;
  authToken: string;
  isEmailVerified: boolean;
  testimonials: ITestimonialAdminSideSummary[];
}

export interface IUserCreatePayload {
  nickname: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserUpdatePayload extends Partial<IUserCreatePayload> {}

export interface IUserQuery extends IBaseAdminSideQuery {
  nickname?: string;
  username?: string;
  email?: string;
}
