import { Request, Response } from "express";
import { RadarPayload, Protocols, RadarResponse } from "@types";

export function RadarController(
  req: Request<unknown, unknown, RadarPayload>,
  res: Response<RadarResponse>,
) {
  const coordinates = req.body.scan[0].coordinates;

  res.send(coordinates);
}
