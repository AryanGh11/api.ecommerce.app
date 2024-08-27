import {
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
}

export interface IUserCreatePayload {
  nickname: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserUpdatePayload extends Partial<IUserCreatePayload> {}
