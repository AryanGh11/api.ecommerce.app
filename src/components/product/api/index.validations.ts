import ProductConstraintsProvider from "../index.constraintsProvider";

import { RichJoi } from "../../../libraries/rich-joi";

import {
  IProductCreatePayload,
  IProductUpdatePayload,
} from "../index.interfaces";

export const getOneSchema = RichJoi.objectId().required();

export const createSchema = RichJoi.object<IProductCreatePayload>({
  title: RichJoi.string()
    .min(ProductConstraintsProvider.title.minlength)
    .max(ProductConstraintsProvider.title.maxlength)
    .required(),
  description: RichJoi.string()
    .min(ProductConstraintsProvider.description.minlength)
    .max(ProductConstraintsProvider.description.maxlength)
    .required(),
  categories: RichJoi.objectIdArray().required(),
  price: RichJoi.number().min(ProductConstraintsProvider.price.min).required(),
  quantity: RichJoi.number()
    .min(ProductConstraintsProvider.quantity.min)
    .required(),
  images: RichJoi.array().items(RichJoi.string()).required(),
}).required();

export const updateSchema = RichJoi.object<IProductUpdatePayload>({
  title: RichJoi.string()
    .min(ProductConstraintsProvider.title.minlength)
    .max(ProductConstraintsProvider.title.maxlength)
    .optional(),
  description: RichJoi.string()
    .min(ProductConstraintsProvider.description.minlength)
    .max(ProductConstraintsProvider.description.maxlength)
    .optional(),
  categories: RichJoi.objectIdArray().optional(),
  price: RichJoi.number().min(ProductConstraintsProvider.price.min).optional(),
  quantity: RichJoi.number()
    .min(ProductConstraintsProvider.quantity.min)
    .optional(),
  images: RichJoi.array().items(RichJoi.string()).optional(),
}).optional();
