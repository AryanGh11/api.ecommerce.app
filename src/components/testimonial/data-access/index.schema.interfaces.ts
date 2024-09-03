import { Model, Document, Types } from "mongoose";
import { IBaseSchema } from "../../../composable/repository-service";
import { IRepositoryServiceRequiredModelStaticMethods } from "../../../composable/repository-service";

export interface ITestimonial extends IBaseSchema {
  title: string;
  body: string;
  user: Types.ObjectId;
  product: Types.ObjectId;
}

export interface ITestimonialDocument extends ITestimonial, Document {
  _id: Types.ObjectId;
}

export type ITestimonialModel = ITestimonialStaticMethods &
  Model<ITestimonialDocument>;

export interface ITestimonialStaticMethods
  extends IRepositoryServiceRequiredModelStaticMethods<ITestimonialDocument> {}
