import { Model, Document, Types } from "mongoose";
import { IBaseSchema } from "../../../composable/repository-service";
import { IRepositoryServiceRequiredModelStaticMethods } from "../../../composable/repository-service";

export interface ICategory extends IBaseSchema {
  title: string;
  key: string;
  products: Types.ObjectId[];
}

export interface ICategoryDocument extends ICategory, Document {
  _id: Types.ObjectId;
}

export type ICategoryModel = ICategoryStaticMethods & Model<ICategoryDocument>;

export interface ICategoryStaticMethods
  extends IRepositoryServiceRequiredModelStaticMethods<ICategoryDocument> {}
