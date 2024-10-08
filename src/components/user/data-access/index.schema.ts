import mongoose from "mongoose";
import UserConstraintsProvider from "../index.constraintsProvider";

import { Schema } from "mongoose";
import { hydrateSchema } from "../index.schemaHydrator";
import { PasswordService } from "../../../libraries/password";
import { TESTIMONIAL, USER, USERS } from "../../../constants/mongoose";

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
    authToken: {
      required: true,
      type: String,
      unique: true,
      trim: true,
    },
    isEmailVerified: {
      required: true,
      type: Boolean,
      default: false,
    },
    testimonials: {
      required: true,
      type: [Schema.Types.ObjectId],
      ref: TESTIMONIAL,
      default: [],
    },
    avatarUrl: {
      required: true,
      type: String,
      default:
        "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to hash password before saving
schema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await PasswordService.hash(this.password);
  next();
});

export type UserSchema = typeof schema;

hydrateSchema(schema);

export const UserModel = mongoose.model(USER, schema, USERS);
