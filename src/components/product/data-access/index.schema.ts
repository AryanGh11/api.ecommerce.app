import mongoose from "mongoose";
import ProductConstraintsProvider from "../index.constraintsProvider";

import { Schema } from "mongoose";
import { hydrateSchema } from "../index.schemaHydrator";

import {
  PRODUCT,
  CATEGORY,
  PRODUCTS,
  TESTIMONIAL,
} from "../../../constants/mongoose";

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
    rating: {
      required: true,
      type: Number,
      min: ProductConstraintsProvider.rating.min,
      max: ProductConstraintsProvider.rating.max,
      default: 0,
    },
    testimonials: {
      required: true,
      type: [Schema.Types.ObjectId],
      ref: TESTIMONIAL,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export type ProductSchema = typeof schema;

hydrateSchema(schema);

export const ProductModel = mongoose.model(PRODUCT, schema, PRODUCTS);
