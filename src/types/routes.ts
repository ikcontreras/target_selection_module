import { RequestHandler } from "express";

export enum HTTP_METHODS {
  POST = "post",
  GET = "get",
  PUT = "put",
  DELETE = "delete",
}

export type Route = {
  path: string;
  method: HTTP_METHODS;
  controller: RequestHandler;
};

export type ControllerFactory<Services, Controller> = (
  services: Services,
) => Controller;

export type ServiceFactory<Repositories, Service> = (
  repositories: Repositories,
) => Service;

export type RepositoryFactory<Model, Repository> = (model: Model) => Repository;
