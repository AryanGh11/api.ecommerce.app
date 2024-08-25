import UserConstraintsProvider from "../index.constraintsProvider";

import { RichJoi } from "../../../libraries/rich-joi";
import { IUserCreatePayload, IUserUpdatePayload } from "../index.interfaces";

export const getOneSchema = RichJoi.objectId().required();

export const createSchema = RichJoi.object<IUserCreatePayload>({
  nickname: RichJoi.string()
    .min(UserConstraintsProvider.nickname.minlength)
    .max(UserConstraintsProvider.nickname.maxlength)
    .required(),
  username: RichJoi.string()
    .min(UserConstraintsProvider.username.minlength)
    .max(UserConstraintsProvider.username.maxlength)
    .required(),
  email: RichJoi.string().email().required(),
  password: RichJoi.string()
    .min(UserConstraintsProvider.password.minlength)
    .required(),
}).required();

export const updateSchema = RichJoi.object<IUserUpdatePayload>({
  nickname: RichJoi.string()
    .min(UserConstraintsProvider.nickname.minlength)
    .max(UserConstraintsProvider.nickname.maxlength)
    .optional(),
  username: RichJoi.string()
    .min(UserConstraintsProvider.username.minlength)
    .max(UserConstraintsProvider.username.maxlength)
    .optional(),
  email: RichJoi.string().email().optional(),
  password: RichJoi.string()
    .min(UserConstraintsProvider.password.minlength)
    .optional(),
}).optional();
