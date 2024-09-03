import AppError from "../../common/errors/appError";

/**
 * @description An error thrown when a testimonial is not found.
 * @extends {AppError}
 */
export class TestimonialDocumentsNotFoundError extends AppError {
  constructor() {
    super({
      errorUniqueKey: "resources_not_found",
      errorMessage: "Testimonial not found",
      httpCode: 404,
      isOperational: true,
    });
  }
}
