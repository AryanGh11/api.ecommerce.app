import AppError from "../../common/errors/appError";

/**
 * @description An error thrown when an user is not found.
 * @extends {AppError}
 */
export class UserDocumentsNotFoundError extends AppError {
  constructor() {
    super({
      errorUniqueKey: "resources_not_found",
      errorMessage: "Resource not found",
      httpCode: 404,
      isOperational: true,
    });
  }
}

/**
 * @description An error thrown when an username is already exist.
 * @extends {AppError}
 */
export class UserUsernameAlreadyExistError extends AppError {
  constructor() {
    super({
      errorUniqueKey: "username_already_exist",
      errorMessage: "Username already exist",
      httpCode: 409,
      isOperational: true,
    });
  }
}

/**
 * @description An error thrown when an email is already exist.
 * @extends {AppError}
 */
export class UserEmailAlreadyExistError extends AppError {
  constructor() {
    super({
      errorUniqueKey: "email_already_exist",
      errorMessage: "Email already exist",
      httpCode: 409,
      isOperational: true,
    });
  }
}

/**
 * @description An error thrown when user's password is invalid.
 * @extends {AppError}
 */
export class UserInvalidPasswordError extends AppError {
  constructor() {
    super({
      errorUniqueKey: "invalid_password",
      errorMessage: "Invalid password",
      httpCode: 409,
      isOperational: true,
    });
  }
}

/**
 * @description An error thrown when user's email is already verified.
 * @extends {AppError}
 */
export class UserEmailAlreadyVerifiedError extends AppError {
  constructor() {
    super({
      errorUniqueKey: "email_already_verified",
      errorMessage: "Email already verified",
      httpCode: 409,
      isOperational: true,
    });
  }
}
