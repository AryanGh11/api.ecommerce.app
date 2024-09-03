import { UserService } from "../user";
import { ProductService } from "../product";
import { TestimonialDocumentsNotFoundError } from "./index.errors";

import {
  buildAdminSideSummaryTestimonial,
  buildAdminSideDetailedTestimonial,
} from "./index.schemaHydrator";

import {
  RepositoryService,
  IRepositoryServiceOverviewRes,
} from "../../composable/repository-service";

import {
  TestimonialModel,
  ITestimonialDocument,
  ITestimonialStaticMethods,
} from "./data-access";

import {
  ITestimonialQuery,
  ITestimonialCreatePayload,
  ITestimonialUpdatePayload,
  ITestimonialAdminSideSummary,
  ITestimonialAdminSideDetailed,
} from "./index.interfaces";

export class TestimonialService {
  private readonly repositoryService = new RepositoryService<
    ITestimonialCreatePayload,
    ITestimonialUpdatePayload,
    ITestimonialDocument,
    ITestimonialStaticMethods,
    TestimonialDocumentsNotFoundError,
    ITestimonialQuery
  >({
    model: TestimonialModel,
    fabricateResourceNotFoundError: () =>
      new TestimonialDocumentsNotFoundError(),
  });

  async getAll(): Promise<
    IRepositoryServiceOverviewRes<ITestimonialAdminSideSummary>
  > {
    const documents = await this.repositoryService.getAll();

    const total = documents.total;
    const data = documents.data.map((doc) =>
      buildAdminSideSummaryTestimonial(doc)
    );

    const response: IRepositoryServiceOverviewRes<ITestimonialAdminSideSummary> =
      {
        total: total,
        data: data,
      };

    return response;
  }

  async getOne(id: string): Promise<ITestimonialAdminSideDetailed> {
    const document = await this.repositoryService.getOne(id);

    return buildAdminSideDetailedTestimonial(document);
  }

  async create(
    payload: ITestimonialCreatePayload
  ): Promise<ITestimonialAdminSideDetailed> {
    const document = await this.repositoryService.create(payload);

    // Add testimonial to user
    await UserService.addTestimonialToUser({
      userId: payload.user.toObjectId(),
      testimonialId: document._id,
    });

    // Add testimonial to product
    await ProductService.addTestimonialToProduct({
      productId: payload.product.toObjectId(),
      testimonialId: document._id,
    });

    return buildAdminSideDetailedTestimonial(document);
  }

  async update({
    id,
    payload,
  }: {
    id: string;
    payload: Partial<ITestimonialUpdatePayload>;
  }): Promise<ITestimonialAdminSideDetailed> {
    const document = await this.repositoryService.update({
      id,
      payload,
    });

    return buildAdminSideDetailedTestimonial(document);
  }

  async delete(id: string): Promise<void> {
    return await this.repositoryService.delete(id);
  }
}
