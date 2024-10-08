import ErrorHandler from "./libraries/error-handler";

import { AuthService } from "./components/auth";
import { Request, Response, NextFunction } from "express";
import { AuthenticationFailedError } from "./common/errors/authenticationFailed";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers["auth_token"] as string;

  if (!authToken) {
    return ErrorHandler.handleError(new AuthenticationFailedError(), res);
  }

  try {
    // If auth_token is valid, proceed to the next middleware
    await AuthService.checkAuthToken(authToken);
    next();
  } catch (error) {
    return ErrorHandler.handleError(new AuthenticationFailedError(), res);
  }
};

export default authMiddleware;
