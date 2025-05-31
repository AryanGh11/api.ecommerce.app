import mongoose from "mongoose";
import IntroConstraintsProvider from "../index.constraintsProvider";

import { Schema } from "mongoose";
import { INTRO, INTROS } from "../../../constants/mongoose";

import {
  IIntroModel,
  IIntroDocument,
  IIntroStaticMethods,
} from "./index.schema.interfaces";

export const schema = new Schema<
  IIntroDocument,
  IIntroModel,
  {},
  IIntroStaticMethods
>(
  {
    title: {
      required: true,
      type: String,
      minlength: IntroConstraintsProvider.title.minlength,
      maxlength: IntroConstraintsProvider.title.maxlength,
    },
    text: {
      required: true,
      type: String,
      minlength: IntroConstraintsProvider.text.minlength,
      maxlength: IntroConstraintsProvider.text.maxlength,
    },
    imageUrl: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export type IntroSchema = typeof schema;

export const IntroModel = mongoose.model(INTRO, schema, INTROS);
