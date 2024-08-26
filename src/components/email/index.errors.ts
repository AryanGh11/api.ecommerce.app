import AppError from "../../common/errors/appError";

/**
 * @description An error thrown when email sending failed.
 * @extends {AppError}
 */
export class EmailSendingFailedError extends AppError {
  constructor() {
    super({
      errorUniqueKey: "email_sending_failed",
      errorMessage: "Email sending failed",
      httpCode: 409,
      isOperational: true,
    });
  }
}
