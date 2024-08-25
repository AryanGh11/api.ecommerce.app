import Joi from "joi";

import { Extension } from "joi";
import { isValidObjectId } from "mongoose";

export const objectIdExtension: Extension = {
  type: "objectId",
  base: Joi.string(),
  messages: {
    "objectId.invalid": "Invalid ObjectId format",
  },
  validate(value, helpers) {
    if (!isValidObjectId(value)) {
      return { value, errors: helpers.error("objectId.invalid") };
    }
    return { value };
  },
};

export const objectIdArrayExtension: Extension = {
  type: "objectIdArray",
  base: Joi.array(),
  messages: {
    "objectIdArray.invalid": "Invalid ObjectId format in array",
  },
  validate(value, helpers) {
    for (const id of value) {
      if (!isValidObjectId(id)) {
        return { value, errors: helpers.error("objectIdArray.invalid") };
      }
    }
    return { value };
  },
};
