import { Request, Response } from "express";
import { ControllerFactory, RadarPayload, RadarResponse } from "@types";
import { RadarService } from "@routes/services/RadarService";

type RadarController = {
  targetSelection: (req: Request, res: Response) => void;
};

type Services = { radarService: RadarService };

export const RadarController: ControllerFactory<Services, RadarController> = ({
  radarService,
}: {
  radarService: RadarService;
}) => {
  return {
    targetSelection: (
      req: Request<unknown, unknown, RadarPayload>,
      res: Response<RadarResponse>,
    ) => {
      const positions = radarService.getCoordinates(req.body);

      res.send({
        x: positions.coordinates.x,
        y: positions.coordinates.y,
      });
    },
  };
};
