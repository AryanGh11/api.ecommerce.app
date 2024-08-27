import { Request, Response, NextFunction } from "express";

import {
  sendEmailVerificationSchema,
  signInWithEmailAndPasswordSchema,
  signUpWithEmailAndPasswordSchema,
} from "./index.validations";

export const validateSignInWithEmailAndPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = signInWithEmailAndPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateSignUpWithEmailAndPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = signUpWithEmailAndPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateSendEmailVerification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = sendEmailVerificationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
