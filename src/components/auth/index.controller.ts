import axios from "axios";
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

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } =
  process.env;

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

// Handle callback from google
router.get("/google", async (req: Request, res: Response) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email&access_type=offline&prompt=consent`;
  res.redirect(url);
});

router.get("/google/callback", async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token } = data;

    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    // Handle user authentication and retrieval using the profile data
    res.redirect("/"); // Adjust this based on your frontend routing
  } catch (error) {
    ErrorHandler.handleError(error, res);
    res.redirect("/login");
  }
});

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
