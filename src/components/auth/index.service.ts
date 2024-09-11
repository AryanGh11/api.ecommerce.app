import { EmailService } from "../email";
import { PasswordService } from "../../libraries/password";

import {
  UserModel,
  UserService,
  IUserAdminSideDetailed,
  UserInvalidPasswordError,
  UserDocumentsNotFoundError,
  buildAdminSideDetailedUser,
  UserEmailAlreadyExistError,
  UserUsernameAlreadyExistError,
  UserEmailAlreadyVerifiedError,
} from "../user";

export class AuthService {
  private readonly _userService = new UserService();

  async signInWithEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IUserAdminSideDetailed> {
    const document = await UserModel.findOne({ email });

    if (!document) {
      throw new UserDocumentsNotFoundError();
    }

    const isPasswordValid = await PasswordService.compare(
      password,
      document.password
    );

    if (!isPasswordValid) {
      throw new UserInvalidPasswordError();
    }

    const user = await buildAdminSideDetailedUser(document);

    return user;
  }

  async signUpWithEmailAndPassword({
    nickname,
    username,
    email,
    password,
  }: {
    nickname: string;
    username: string;
    email: string;
    password: string;
  }): Promise<IUserAdminSideDetailed> {
    const isEmailAlreadyExist = await UserModel.findOne({ email });
    if (isEmailAlreadyExist) {
      throw new UserEmailAlreadyExistError();
    }

    const isUsernameAlreadyExist = await UserModel.findOne({ username });
    if (isUsernameAlreadyExist) {
      throw new UserUsernameAlreadyExistError();
    }

    const user = await this._userService.create({
      nickname,
      username,
      email,
      password,
    });

    return user;
  }

  public static async checkAuthToken(authToken: string): Promise<void> {
    const user = await UserModel.findOne({ authToken });

    if (!user) {
      throw new UserDocumentsNotFoundError();
    }
  }

  public static async sendVerification({
    email,
  }: {
    email: string;
  }): Promise<void> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new UserDocumentsNotFoundError();
    }

    if (user.isEmailVerified === true) {
      throw new UserEmailAlreadyVerifiedError();
    }

    const subject = "Email verification";
    const text = `Please click the following link to verify your email: <a href="${process.env.BASE_URL}/auth/verify-email?authToken=${user.authToken}">Click here</a>`;

    await EmailService.sendEmail({ to: email, subject, text });
  }

  public static async verifyEmail(authToken: string): Promise<void> {
    const user = await UserModel.findOneAndUpdate(
      { authToken },
      {
        isEmailVerified: true,
      }
    );

    if (!user) {
      throw new UserDocumentsNotFoundError();
    }
  }
}
