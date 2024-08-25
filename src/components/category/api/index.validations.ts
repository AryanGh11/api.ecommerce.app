import CategoryConstraintsProvider from "../index.constraintsProvider";

import { RichJoi } from "../../../libraries/rich-joi";

import {
  ICategoryCreatePayload,
  ICategoryUpdatePayload,
} from "../index.interfaces";

export const getOneSchema = RichJoi.objectId().required();

export const createSchema = RichJoi.object<ICategoryCreatePayload>({
  title: RichJoi.string()
    .min(CategoryConstraintsProvider.title.minlength)
    .max(CategoryConstraintsProvider.title.maxlength)
    .required(),
  key: RichJoi.string()
    .min(CategoryConstraintsProvider.key.minlength)
    .max(CategoryConstraintsProvider.key.maxlength)
    .required(),
  products: RichJoi.objectIdArray().required(),
}).required();

export const updateSchema = RichJoi.object<ICategoryUpdatePayload>({
  title: RichJoi.string()
    .min(CategoryConstraintsProvider.title.minlength)
    .max(CategoryConstraintsProvider.title.maxlength)
    .optional(),
  key: RichJoi.string()
    .min(CategoryConstraintsProvider.key.minlength)
    .max(CategoryConstraintsProvider.key.maxlength)
    .optional(),
  products: RichJoi.objectIdArray().optional(),
}).required();
