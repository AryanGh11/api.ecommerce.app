import { Model, Document, Types } from "mongoose";
import { IBaseSchema } from "../../../composable/repository-service";
import { IRepositoryServiceRequiredModelStaticMethods } from "../../../composable/repository-service";

export interface IUser extends IBaseSchema {
  nickname: string;
  username: string;
  email: string;
  password: string;
  authToken: string;
  isEmailVerified: boolean;
  testimonials: Types.ObjectId[];
  avatarUrl: string;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}

export type IUserModel = IUserStaticMethods & Model<IUserDocument>;

export interface IUserStaticMethods
  extends IRepositoryServiceRequiredModelStaticMethods<IUserDocument> {}
