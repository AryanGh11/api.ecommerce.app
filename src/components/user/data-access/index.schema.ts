import mongoose from "mongoose";
import UserConstraintsProvider from "../index.constraintsProvider";

import { Schema } from "mongoose";
import { hydrateSchema } from "../index.schemaHydrator";
import { USER, USERS } from "../../../constants/mongoose";

import {
  IUserModel,
  IUserDocument,
  IUserStaticMethods,
} from "./index.schema.interfaces";

export const schema = new Schema<
  IUserDocument,
  IUserModel,
  {},
  IUserStaticMethods
>(
  {
    nickname: {
      required: true,
      type: String,
      minlength: UserConstraintsProvider.nickname.minlength,
      maxlength: UserConstraintsProvider.nickname.maxlength,
    },
    username: {
      required: true,
      type: String,
      unique: true,
      trim: true,
      minlength: UserConstraintsProvider.username.minlength,
      maxlength: UserConstraintsProvider.username.maxlength,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
        message: (props: { value: string }) =>
          `${props.value} is not a valid email address`,
      },
    },
    password: {
      required: true,
      type: String,
      minlength: UserConstraintsProvider.password.minlength,
    },
  },
  {
    timestamps: true,
  }
);

export type UserSchema = typeof schema;

hydrateSchema(schema);

export const UserModel = mongoose.model(USER, schema, USERS);
