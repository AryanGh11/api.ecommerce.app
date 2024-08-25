import mongoose from "mongoose";
import ProductConstraintsProvider from "../index.constraintsProvider";

import { Schema } from "mongoose";
import { hydrateSchema } from "../index.schemaHydrator";
import { CATEGORY, PRODUCT, PRODUCTS } from "../../../constants/mongoose";

import {
  IProductModel,
  IProductDocument,
  IProductStaticMethods,
} from "./index.schema.interfaces";

export const schema = new Schema<
  IProductDocument,
  IProductModel,
  {},
  IProductStaticMethods
>(
  {
    title: {
      required: true,
      type: String,
      minlength: ProductConstraintsProvider.title.minlength,
      maxlength: ProductConstraintsProvider.title.maxlength,
    },
    description: {
      required: true,
      type: String,
      minlength: ProductConstraintsProvider.description.minlength,
      maxlength: ProductConstraintsProvider.description.maxlength,
    },
    categories: {
      required: true,
      type: [Schema.Types.ObjectId],
      ref: CATEGORY,
    },
    price: {
      required: true,
      type: Number,
      min: ProductConstraintsProvider.price.min,
    },
    quantity: {
      required: true,
      type: Number,
      min: ProductConstraintsProvider.quantity.min,
    },
    images: {
      required: true,
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export type ProductSchema = typeof schema;

hydrateSchema(schema);

export const ProductModel = mongoose.model(PRODUCT, schema, PRODUCTS);
