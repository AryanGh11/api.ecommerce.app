import mongoose from "mongoose";
import CategoryConstraintsProvider from "../index.constraintsProvider";

import { Schema } from "mongoose";
import { hydrateSchema } from "../index.schemaHydrator";
import { CATEGORY, CATEGORIES, PRODUCT } from "../../../constants/mongoose";

import {
  ICategoryModel,
  ICategoryDocument,
  ICategoryStaticMethods,
} from "./index.schema.interfaces";

export const schema = new Schema<
  ICategoryDocument,
  ICategoryModel,
  {},
  ICategoryStaticMethods
>(
  {
    title: {
      required: true,
      type: String,
      minlength: CategoryConstraintsProvider.title.minlength,
      maxlength: CategoryConstraintsProvider.title.maxlength,
    },
    key: {
      required: true,
      type: String,
      unique: true,
      trim: true,
      minlength: CategoryConstraintsProvider.key.minlength,
      maxlength: CategoryConstraintsProvider.key.maxlength,
    },
    products: {
      required: true,
      type: [Schema.Types.ObjectId],
      ref: PRODUCT,
    },
  },
  {
    timestamps: true,
  }
);

export type CategorySchema = typeof schema;

hydrateSchema(schema);

export const CategoryModel = mongoose.model(CATEGORY, schema, CATEGORIES);
