import { IntroDocumentsNotFoundError } from "./index.errors";
import { IntroModel, IIntroDocument, IIntroStaticMethods } from "./data-access";

import {
  buildAdminSideSummaryIntro,
  buildAdminSideDetailedIntro,
} from "./index.schemaHydrator";

import {
  RepositoryService,
  IRepositoryServiceOverviewRes,
} from "../../composable/repository-service";

import {
  IIntroQuery,
  IIntroCreatePayload,
  IIntroAdminSideSummary,
  IIntroAdminSideDetailed,
} from "./index.interfaces";

export class IntroService {
  private readonly repositoryService = new RepositoryService<
    IIntroCreatePayload,
    {},
    IIntroDocument,
    IIntroStaticMethods,
    IntroDocumentsNotFoundError,
    IIntroQuery
  >({
    model: IntroModel,
    fabricateResourceNotFoundError: () => new IntroDocumentsNotFoundError(),
  });

  async getAll(): Promise<
    IRepositoryServiceOverviewRes<IIntroAdminSideSummary>
  > {
    const documents = await this.repositoryService.getAll();

    const total = documents.total;
    const data = documents.data.map((doc) => buildAdminSideSummaryIntro(doc));

    const response: IRepositoryServiceOverviewRes<IIntroAdminSideSummary> = {
      total: total,
      data: data,
    };

    return response;
  }

  async getOne(id: string): Promise<IIntroAdminSideDetailed> {
    const document = await this.repositoryService.getOne(id);

    return buildAdminSideDetailedIntro(document);
  }

  async create(payload: IIntroCreatePayload): Promise<IIntroAdminSideDetailed> {
    const document = await this.repositoryService.create(payload);

    return buildAdminSideDetailedIntro(document);
  }

  async delete(id: string): Promise<void> {
    return await this.repositoryService.delete(id);
  }
}
