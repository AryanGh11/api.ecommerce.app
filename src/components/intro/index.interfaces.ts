import {
  IBaseAdminSideQuery,
  IBaseAdminSideSummary,
} from "../../composable/repository-service";

export interface IIntroAdminSideSummary extends IBaseAdminSideSummary {
  title: string;
  text: string;
  imageUrl: string;
}

export interface IIntroAdminSideDetailed extends IIntroAdminSideSummary {}

export interface IIntroCreatePayload {
  title: string;
  text: string;
  imageUrl: string;
}

export interface IIntroQuery extends IBaseAdminSideQuery {
  title?: string;
  text?: string;
  imageUrl?: string;
}
