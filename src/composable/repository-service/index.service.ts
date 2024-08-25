import AppError from "../../common/errors/appError";

import { Model, Document, UpdateQuery } from "mongoose";

import {
  IRepositoryServiceOverviewRes,
  IRepositoryServiceRequiredModelStaticMethods,
} from "./index.interfaces";

/**
 * Represents a generic repository service for managing documents.
 *
 * It implements the `IRepositoryService` interface and provides
 * default implementations for the methods defined in the interface.
 *
 * You should prefer composition over inheritance when using this class and avoid
 * extending it directly. Instead, create a new instance of this class and use its
 * methods for default behavior.
 *
 * @template I - The plain interface of the model.
 * @template IDocument - The type of the document that the repository service manages.
 * @template IStaticMethods - The type of the static methods required by the repository service.
 * @template CreateOnePayload - The type of the payload used for creating a single document.
 * @template UpdateOnePayload - The type of the payload used for updating a single document.
 * @template UpdateManyPayload - The type of the payload used for updating multiple documents.
 *
 * @implements {IRepositoryService}
 */
export class RepositoryService<
  ICreatePayload,
  IUpdatePayload,
  IDocument extends Document,
  IStaticMethods extends IRepositoryServiceRequiredModelStaticMethods<IDocument>,
  ResourceNotFoundError extends AppError
> {
  private readonly model: IStaticMethods & Model<IDocument, {}>;
  private readonly fabricateResourceNotFoundError: () => ResourceNotFoundError;

  constructor({
    model,
    fabricateResourceNotFoundError,
  }: {
    model: IStaticMethods & Model<IDocument, {}> & any;
    fabricateResourceNotFoundError: () => ResourceNotFoundError;
  }) {
    this.model = model;
    this.fabricateResourceNotFoundError = fabricateResourceNotFoundError;
  }

  async getAll(): Promise<IRepositoryServiceOverviewRes<IDocument>> {
    const documents = await this.model.find();
    const total = documents.length;

    this.model.populateForSummary(documents);

    const response = {
      total: total,
      data: documents,
    };

    return response;
  }

  async getOne(id: string): Promise<IDocument> {
    const document = await this.model.findById(id);
    if (!document) throw this.fabricateResourceNotFoundError();
    return document;
  }

  async create(payload: ICreatePayload): Promise<IDocument> {
    const document = new this.model(payload);
    await document.save();
    return document;
  }

  async update({
    id,
    payload,
  }: {
    id: string;
    payload: Partial<IUpdatePayload>;
  }): Promise<IDocument> {
    const document = await this.model.findByIdAndUpdate(
      id,
      payload as UpdateQuery<IDocument>,
      {
        new: true,
      }
    );
    if (!document) throw this.fabricateResourceNotFoundError();
    return document;
  }

  async delete(id: string): Promise<void> {
    const document = await this.model.findById(id);
    if (!document) throw this.fabricateResourceNotFoundError();
    await document.deleteOne();
  }
}

export default RepositoryService;
