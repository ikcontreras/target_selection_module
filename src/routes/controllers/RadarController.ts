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
      const positions = RadarService().getCoordinates(req.body);

      res.send({
        x: positions.coordinates.x,
        y: positions.coordinates.y,
      });
    },
  };
}
