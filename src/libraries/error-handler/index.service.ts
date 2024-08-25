import Joi from "joi";
import AppError from "../../common/errors/appError";

import { Request, Response } from "express";

/**
 * Handles errors thrown by the application.
 * If the error is an instance of AppError and is operational,
 * it will send a response to the client.
 * Otherwise, it will crash the process.
 */
class ErrorHandler {
  /**
   * @description Handles the error.
   * @param error - The error to handle.
   * @param req - The request object.
   * @param responseStream - The response object.
   */
  public static async handleError(error: unknown, responseStream: Response) {
    await this.crashIfUntrustedErrorOrSendResponse(error, responseStream);
  }

  /**
   * @description Handles a Joi validation error.
   * @param error - The error to handle.
   * @param req - The request object.
   * @param responseStream - The response object.
   */
  public static async handleJoivalidationError(
    error: Joi.ValidationError,
    // may be needed later to utilize the i18n
    req: Request<any, any, any, any, Record<string, any>>,
    responseStream: Response
  ) {
    responseStream.status(422).json({
      error: {
        key: "validation_error",
        message: error.details.map((detail) => detail.message).join(", "),
      },
    });
  }

  /**
   * Determines if the error should crash the process or send a response to the client.
   * @param error - The error to handle.
   * @param req - The request object.
   * @param responseStream - The response object.
   */
  private static async crashIfUntrustedErrorOrSendResponse(
    error: unknown,
    responseStream: Response
  ) {
    if (error instanceof AppError && error.isOperational)
      return ErrorHandler.sendErrorResponse(error, responseStream);

    console.error(error);
    ErrorHandler.crash(error);
  }

  /**
   * Sends an error response to the client.
   * @param error - The error to handle.
   * @param req - The request object.
   * @param responseStream - The response object.
   */
  private static sendErrorResponse(error: AppError, responseStream: Response) {
    responseStream.status(error.httpCode).json({
      error: {
        key: error.errorUniqueKey,
        message: error.errorMessage,
      },
    });
  }

  /**
   * Crashes the process.
   * @param error - The error to handle.
   */
  private static crash(error: unknown) {
    throw error;
  }
}

export default ErrorHandler;
