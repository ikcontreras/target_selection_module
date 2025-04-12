import { Request, Response } from "express";
import { Payload, RadarResponse } from "@types";

export function RadarController(
  req: Request<unknown, unknown, Payload>,
  res: Response<RadarResponse>,
) {
  const coordinates = req.body.scan[0].coordinates;

  res.send(coordinates);
}
