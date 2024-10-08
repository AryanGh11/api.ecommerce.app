import { Request, Response, NextFunction } from "express";
import { getOneSchema, createSchema, updateSchema } from "./index.validations";

export const validateGetOne = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = getOneSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
