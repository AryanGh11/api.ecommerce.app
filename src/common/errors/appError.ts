/**
 * @description Base class for all the errors in the application.
 *             Contains all the common properties of an error.
 * @extends {Error}
 */
class AppError extends Error {
  /**
   * @description The common type of the error.
   *             This is used to identify the type of the error.
   * @example "SignInWithGoogleFailed"
   */
  public readonly commonType: string;

  /**
   * A unique key that identifies the error.
   * This is used to identify the error in the logs or sent to the client.
   */
  public readonly errorUniqueKey: string;

  /**
   * @description A boolean that indicates if the error is operational.
   *              Operational errors are errors that are caused by the user.
   *              For example, if the user tries to sign in with an email that is already in use.
   *              Operational errors are not logged.
   * @example true
   */
  public readonly isOperational: boolean;

  /**
   * @description A boolean that indicates if the administrator should be informed about the error.
   */
  public readonly informAdministartor: boolean;

  /**
   * @description The locale key of the error.
   *             This is used to translate the error message.
   * @example "sign_in_failed"
   * @see {@link Translation}
   */
  public readonly errorMessage: string;

  /**
   * @description The HTTP code of the error.
   *            This is used to send the correct HTTP code to the client.
   * @example 409
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status}
   */
  public readonly httpCode: number = 500;

  constructor({
    errorMessage,
    errorUniqueKey,
    isOperational,
    httpCode,
    informAdministartor,
  }: {
    errorMessage: string;
    errorUniqueKey: string;
    isOperational: boolean;
    httpCode: number;
    informAdministartor?: boolean;
  }) {
    super();
    this.name = "AppError";

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.commonType = this.constructor.name;
    this.errorUniqueKey = errorUniqueKey;
    this.isOperational = isOperational;
    this.errorMessage = errorMessage;
    this.httpCode = httpCode || this.httpCode;
    this.informAdministartor = informAdministartor ?? false;

    Error.captureStackTrace(this);
  }
}

export default AppError;
