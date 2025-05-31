import { Model, Document, Types } from "mongoose";
import { IBaseSchema } from "../../../composable/repository-service";
import { IRepositoryServiceRequiredModelStaticMethods } from "../../../composable/repository-service";

export interface IIntro extends IBaseSchema {
  title: string;
  text: string;
  imageUrl: string;
}

export interface IIntroDocument extends IIntro, Document {
  _id: Types.ObjectId;
}

export type IIntroModel = IIntroStaticMethods & Model<IIntroDocument>;

export interface IIntroStaticMethods
  extends IRepositoryServiceRequiredModelStaticMethods<IIntroDocument> {}
