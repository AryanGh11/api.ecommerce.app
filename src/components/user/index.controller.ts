import ErrorHandler from "../../libraries/error-handler";

import { UserService } from "./index.service";
import { Router, Request, Response } from "express";
import { IUserCreatePayload, IUserUpdatePayload } from "./index.interfaces";
import { resourceSuccessfullyDeleted } from "../../constants/resourceSuccessfullyDeleted";

import {
  validateCreate,
  validateGetOne,
  validateUpdate,
  validateSendEmailVerification,
  validateSignInWithEmailAndPassword,
  validateSignUpWithEmailAndPassword,
} from "./api";

export const router = Router();

const service = new UserService();

// Get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await service.getAll();
    res.json(users);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Get user by id
router.get("/:id", validateGetOne, async (req: Request, res: Response) => {
  try {
    const user = await service.getOne(req.params.id);
    res.json(user);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Create a new user
router.post("/", validateCreate, async (req: Request, res: Response) => {
  try {
    const payload: IUserCreatePayload = req.body;
    const user = await service.create(payload);
    res.json(user);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Update an user
router.put("/:id", validateUpdate, async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const payload: IUserUpdatePayload = req.body;
    const user = await service.update({
      id,
      payload,
    });
    res.json(user);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Delete an user
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await service.delete(req.params.id);
    res.json({ message: resourceSuccessfullyDeleted });
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Sign in with email and password
router.post(
  "/auth/sign-in",
  validateSignInWithEmailAndPassword,
  async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const user = await service.signInWithEmailAndPassword({
        email,
        password,
      });
      res.json(user);
    } catch (e) {
      ErrorHandler.handleError(e, res);
    }
  }
);

// Sign up with email and password
router.post(
  "/auth/sign-up",
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
  "/auth/send-email-verification",
  validateSendEmailVerification,
  async (req: Request, res: Response) => {
    try {
      const email = req.body.email;
      await UserService.sendVerification({
        email,
      });
      res.json({ message: "Email verification sent" });
    } catch (e) {
      ErrorHandler.handleError(e, res);
    }
  }
);

// Verify email
router.get("/auth/verify-email", async (req: Request, res: Response) => {
  try {
    const authToken = req.query.authToken as string;

    if (!authToken) {
      return res.status(400).json({ error: "authToken is required" });
    }

    // verify email
    await UserService.verifyEmail(authToken);

    res.redirect(
      `${process.env.CLIENT_URL}/email-verification-response?success=true`
    );
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});
