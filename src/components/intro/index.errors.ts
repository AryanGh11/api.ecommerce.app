import AppError from "../../common/errors/appError";

/**
 * @description An error thrown when an intro is not found.
 * @extends {AppError}
 */
export class IntroDocumentsNotFoundError extends AppError {
  constructor() {
    super({
      errorUniqueKey: "resources_not_found",
      errorMessage: "Intro not found",
      httpCode: 404,
      isOperational: true,
    });
  }
}
