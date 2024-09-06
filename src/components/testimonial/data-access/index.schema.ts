import mongoose from "mongoose";
import TestimonialConstraintsProvider from "../index.constraintsProvider";

import { Schema } from "mongoose";
import { hydrateSchema } from "../index.schemaHydrator";

import {
  USER,
  PRODUCT,
  TESTIMONIAL,
  TESTIMONIALS,
} from "../../../constants/mongoose";

import {
  ITestimonialModel,
  ITestimonialDocument,
  ITestimonialStaticMethods,
} from "./index.schema.interfaces";

export const schema = new Schema<
  ITestimonialDocument,
  ITestimonialModel,
  {},
  ITestimonialStaticMethods
>(
  {
    title: {
      required: true,
      type: String,
      minlength: TestimonialConstraintsProvider.title.minlength,
      maxlength: TestimonialConstraintsProvider.title.maxlength,
    },
    body: {
      required: true,
      type: String,
      minlength: TestimonialConstraintsProvider.body.minlength,
      maxlength: TestimonialConstraintsProvider.body.maxlength,
    },
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: USER,
    },
    product: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: PRODUCT,
    },
    rating: {
      required: true,
      type: Number,
      min: TestimonialConstraintsProvider.rating.min,
      max: TestimonialConstraintsProvider.rating.max,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export type TestimonialSchema = typeof schema;

hydrateSchema(schema);

export const TestimonialModel = mongoose.model(
  TESTIMONIAL,
  schema,
  TESTIMONIALS
);
