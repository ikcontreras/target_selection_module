import { RequestHandler } from "express";
import { RadarPayload, ScanPosition } from "./payload";

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

export type RadarService = () => {
  getCoordinates: (radar: RadarPayload) => ScanPosition;
};
