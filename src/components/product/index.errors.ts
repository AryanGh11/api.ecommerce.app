import AppError from "../../common/errors/appError";

/**
 * @description An error thrown when a product is not found.
 * @extends {AppError}
 */
export class ProductDocumentsNotFoundError extends AppError {
  constructor() {
    super({
      errorUniqueKey: "resources_not_found",
      errorMessage: "Product not found",
      httpCode: 404,
      isOperational: true,
    });
  }
}
