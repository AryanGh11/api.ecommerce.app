import ErrorHandler from "../../libraries/error-handler";

import { AuthService } from "./index.service";
import { Router, Request, Response } from "express";
import { IAuthSignInWithEmailAndPassword } from "./index.interfaces";

import {
  validateSendEmailVerification,
  validateSignInWithEmailAndPassword,
  validateSignUpWithEmailAndPassword,
} from "./api";

export const router = Router();

const service = new AuthService();

// Sign in with email and password
router.post(
  "/sign-in",
  validateSignInWithEmailAndPassword,
  async (req: Request, res: Response) => {
    const payload: IAuthSignInWithEmailAndPassword = req.body;
    try {
      const user = await service.signInWithEmailAndPassword({
        email: payload.email,
        password: payload.password,
      });
      res.json(user);
    } catch (e) {
      ErrorHandler.handleError(e, res);
    }
  }
);

// Sign up with email and password
router.post(
  "/sign-up",
  validateSignUpWithEmailAndPassword,
  async (req: Request, res: Response) => {
    const nickname = req.body.nickname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
      const user = await service.signUpWithEmailAndPassword({
        nickname,
        username,
        email,
        password,
      });
      res.json(user);
    } catch (e) {
      ErrorHandler.handleError(e, res);
    }
  }
);

// Send email verification
router.post(
  "/send-email-verification",
  validateSendEmailVerification,
  async (req: Request, res: Response) => {
    try {
      const email = req.body.email;
      await AuthService.sendVerification({
        email,
      });
      res.json({ message: "Email verification sent" });
    } catch (e) {
      ErrorHandler.handleError(e, res);
    }
  }
);

// Verify email
router.get("/verify-email", async (req: Request, res: Response) => {
  try {
    const authToken = req.query.authToken as string;

    if (!authToken) {
      return res.status(400).json({ error: "authToken is required" });
    }

    // verify email
    await AuthService.verifyEmail(authToken);

    res.redirect(
      `${process.env.CLIENT_URL}/email-verification-response?success=true`
    );
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});
