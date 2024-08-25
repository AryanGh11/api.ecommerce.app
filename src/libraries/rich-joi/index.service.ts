import Joi from "joi";

import { objectIdExtension, objectIdArrayExtension } from "./index.extensions";

const RichJoi: Joi.Root & {
  objectId(): Joi.StringSchema;
  objectIdArray(): Joi.ArraySchema;
} = Joi.extend(objectIdExtension, objectIdArrayExtension);

export default RichJoi;
