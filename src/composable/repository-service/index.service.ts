import AppError from "../../common/errors/appError";

import { Model, Document, UpdateQuery, FilterQuery } from "mongoose";

import {
  IBaseAdminSideQuery,
  IRepositoryServiceOverviewRes,
  IRepositoryServiceRequiredModelStaticMethods,
} from "./index.interfaces";

export class RepositoryService<
  ICreatePayload,
  IUpdatePayload,
  IDocument extends Document,
  IStaticMethods extends IRepositoryServiceRequiredModelStaticMethods<IDocument>,
  ResourceNotFoundError extends AppError,
  IQuery extends IBaseAdminSideQuery
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

  async getAll({
    filter,
  }: {
    filter?: FilterQuery<IQuery>;
  } = {}): Promise<IRepositoryServiceOverviewRes<IDocument>> {
    const documents = await this.model.find(filter ?? {});
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
