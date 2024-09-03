import TestimonialConstraintsProvider from "../index.constraintsProvider";

import { RichJoi } from "../../../libraries/rich-joi";

import {
  ITestimonialCreatePayload,
  ITestimonialUpdatePayload,
} from "../index.interfaces";

export const getOneSchema = RichJoi.objectId().required();

export const createSchema = RichJoi.object<ITestimonialCreatePayload>({
  title: RichJoi.string()
    .min(TestimonialConstraintsProvider.title.minlength)
    .max(TestimonialConstraintsProvider.title.maxlength)
    .required(),
  body: RichJoi.string()
    .min(TestimonialConstraintsProvider.body.minlength)
    .max(TestimonialConstraintsProvider.body.maxlength)
    .required(),
  user: RichJoi.objectId().required(),
  product: RichJoi.objectId().required(),
}).required();

export const updateSchema = RichJoi.object<ITestimonialUpdatePayload>({
  title: RichJoi.string()
    .min(TestimonialConstraintsProvider.title.minlength)
    .max(TestimonialConstraintsProvider.title.maxlength)
    .optional(),
  body: RichJoi.string()
    .min(TestimonialConstraintsProvider.body.minlength)
    .max(TestimonialConstraintsProvider.body.maxlength)
    .optional(),
}).required();
