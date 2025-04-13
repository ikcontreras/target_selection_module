import { Request, Response } from "express";
import { RadarPayload, RadarResponse } from "@types";
import { log } from "@utils";
import { RadarService } from "@types";

export function RadarController({
  RadarService,
}: {
  RadarService: RadarService;
}) {
  return {
    targetSelection: (
      req: Request<unknown, unknown, RadarPayload>,
      res: Response<RadarResponse>,
    ) => {
      log.info("Initializing communication protocol...");

      const positions = RadarService().getCoordinates(req.body);

      log.info(
        `Target selected at (${positions.coordinates.x}, ${positions.coordinates.y}).`,
      );

      res.send({
        x: positions.coordinates.x,
        y: positions.coordinates.y,
      });
    },
  };
}
