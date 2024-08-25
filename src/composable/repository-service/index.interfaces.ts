import { Model } from "mongoose";

export interface IRepositoryServiceOverviewRes<T> {
  total: number;
  data: T[];
}

export interface IRepositoryServiceRequiredModelStaticMethods<IDocument> {
  populateForSummary(
    this: Model<IDocument>,
    documents: IDocument[]
  ): Promise<void>;
}

export interface IBaseSchema {
  createdAt: Date;
  updatedAt: Date;
}

export interface IBaseAdminSideSummary {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBaseAdminSideDetailed extends IBaseAdminSideSummary {}
