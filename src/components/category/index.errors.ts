import AppError from "../../common/errors/appError";

/**
 * @description An error thrown when a category is not found.
 * @extends {AppError}
 */
export class CategoryDocumentsNotFoundError extends AppError {
  constructor() {
    super({
      errorUniqueKey: "resources_not_found",
      errorMessage: "Category not found",
      httpCode: 404,
      isOperational: true,
    });
  }
}

/**
 * @description An error thrown when a key is already exist.
 * @extends {AppError}
 */
export class CategoryKeyAlreadyExistError extends AppError {
  constructor() {
    super({
      errorUniqueKey: "key_already_exist",
      errorMessage: "Key already exist",
      httpCode: 409,
      isOperational: true,
    });
  }
}
