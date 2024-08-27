import crypto from "crypto";

import { EmailService } from "../email";
import { PasswordService } from "../../libraries/password";
import { UserModel, IUserDocument, IUserStaticMethods } from "./data-access";

import {
  buildAdminSideSummaryUser,
  buildAdminSideDetailedUser,
} from "./index.schemaHydrator";

import {
  RepositoryService,
  IRepositoryServiceOverviewRes,
} from "../../composable/repository-service";

import {
  UserInvalidPasswordError,
  UserDocumentsNotFoundError,
  UserEmailAlreadyExistError,
  UserUsernameAlreadyExistError,
  UserEmailAlreadyVerifiedError,
} from "./index.errors";

import {
  IUserCreatePayload,
  IUserUpdatePayload,
  IUserAdminSideSummary,
  IUserAdminSideDetailed,
} from "./index.interfaces";

export class UserService {
  private readonly repositoryService = new RepositoryService<
    IUserCreatePayload,
    IUserUpdatePayload,
    IUserDocument,
    IUserStaticMethods,
    UserDocumentsNotFoundError
  >({
    model: UserModel,
    fabricateResourceNotFoundError: () => new UserDocumentsNotFoundError(),
  });

  async getAll(): Promise<
    IRepositoryServiceOverviewRes<IUserAdminSideSummary>
  > {
    const documents = await this.repositoryService.getAll();

    const total = documents.total;
    const data = documents.data.map((doc) => buildAdminSideSummaryUser(doc));

    const response: IRepositoryServiceOverviewRes<IUserAdminSideSummary> = {
      total: total,
      data: data,
    };

    return response;
  }

  async getOne(id: string): Promise<IUserAdminSideDetailed> {
    const document = await this.repositoryService.getOne(id);

    return buildAdminSideDetailedUser(document);
  }

  async create(payload: IUserCreatePayload): Promise<IUserAdminSideDetailed> {
    const users = (await this.repositoryService.getAll()).data;

    // Check for duplicate username
    const duplicateUsername = users.find(
      (user) => user.username === payload.username
    );
    if (duplicateUsername) throw new UserUsernameAlreadyExistError();

    // Check for duplicate email
    const duplicateEmail = users.find((user) => user.email === payload.email);
    if (duplicateEmail) throw new UserEmailAlreadyExistError();

    // Generate a random auth token
    const authToken = crypto.randomBytes(16).toString("hex");

    const userPayload = {
      ...payload,
      authToken,
    };

    const document = await this.repositoryService.create(userPayload);

    return buildAdminSideDetailedUser(document);
  }

  async update({
    id,
    payload,
  }: {
    id: string;
    payload: Partial<IUserUpdatePayload>;
  }): Promise<IUserAdminSideDetailed> {
    const users = (await this.repositoryService.getAll()).data;
    const currentUser = users.find((user) => user.id === id);

    if (!currentUser) {
      throw new UserDocumentsNotFoundError();
    }

    // Filter out the current user
    const filteredUsers = users.filter((user) => {
      return user.id !== currentUser.id;
    });

    // Check for duplicate username
    if (payload.username) {
      const duplicateUsername = filteredUsers.find(
        (user) => user.username === payload.username
      );
      if (duplicateUsername) throw new UserUsernameAlreadyExistError();
    }

    // Check for duplicate email
    if (payload.email) {
      const duplicateEmail = filteredUsers.find(
        (user) => user.email === payload.email
      );
      if (duplicateEmail) throw new UserEmailAlreadyExistError();
    }

    const document = await this.repositoryService.update({
      id,
      payload,
    });

    return buildAdminSideDetailedUser(document);
  }

  async delete(id: string): Promise<void> {
    return await this.repositoryService.delete(id);
  }
}
