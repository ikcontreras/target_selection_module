import { Request, Response } from "express";
import { RadarPayload, RadarResponse } from "@types";
import { log } from "@utils";
import { RadarService } from "@routes/services/RadarService";

export function TargetSelectionController(
  req: Request<unknown, unknown, RadarPayload>,
  res: Response<RadarResponse>,
) {
  log.info("Initializing communication protocol...");

  const positions = RadarService().getCoordinates(req.body);

  log.info(
    `Target selected at (${positions.coordinates.x}, ${positions.coordinates.y}).`,
  );

  res.send({
    x: positions.coordinates.x,
    y: positions.coordinates.y,
  });
}

export function RadarController() {
  return {
    targetSelection: TargetSelectionController,
  };
}
