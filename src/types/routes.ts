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
