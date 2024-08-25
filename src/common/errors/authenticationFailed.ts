import AppError from "./appError";

/**
 * @description An error when authentication fails.
 * @extends {AppError}
 */
export class AuthenticationFailedError extends AppError {
  constructor() {
    super({
      errorUniqueKey: "authentication_failed",
      errorMessage: "Authentication failed",
      httpCode: 401,
      isOperational: true,
    });
  }
}
