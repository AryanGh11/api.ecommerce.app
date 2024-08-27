import { UserConstraintsProvider } from "../../user";
import { RichJoi } from "../../../libraries/rich-joi";

export const signInWithEmailAndPasswordSchema = RichJoi.object({
  email: RichJoi.string().email().required(),
  password: RichJoi.string()
    .min(UserConstraintsProvider.password.minlength)
    .required(),
}).required();

export const signUpWithEmailAndPasswordSchema = RichJoi.object({
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

export const sendEmailVerificationSchema = RichJoi.object({
  email: RichJoi.string().email().required(),
}).required();
