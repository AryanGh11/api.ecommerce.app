import IntroConstraintsProvider from "../index.constraintsProvider";

import { RichJoi } from "../../../libraries/rich-joi";
import { IIntroCreatePayload } from "../index.interfaces";

export const getOneSchema = RichJoi.objectId().required();

export const createSchema = RichJoi.object<IIntroCreatePayload>({
  title: RichJoi.string()
    .min(IntroConstraintsProvider.title.minlength)
    .max(IntroConstraintsProvider.title.maxlength)
    .required(),
  text: RichJoi.string()
    .min(IntroConstraintsProvider.text.minlength)
    .max(IntroConstraintsProvider.text.maxlength)
    .required(),
  imageUrl: RichJoi.string().required(),
}).required();
