import { Model, Document, Types } from "mongoose";
import { IBaseSchema } from "../../../composable/repository-service";
import { IRepositoryServiceRequiredModelStaticMethods } from "../../../composable/repository-service";

export interface IProduct extends IBaseSchema {
  title: string;
  description: string;
  categories: Types.ObjectId[];
  price: number;
  quantity: number;
  images: string[];
}

export interface IProductDocument extends IProduct, Document {
  _id: Types.ObjectId;
}

export type IProductModel = IProductStaticMethods & Model<IProductDocument>;

export interface IProductStaticMethods
  extends IRepositoryServiceRequiredModelStaticMethods<IProductDocument> {
  validateAndCleanUpBeforeDeletion(this: IProductModel): Promise<void>;
}
