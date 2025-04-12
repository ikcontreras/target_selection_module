import { Request, Response } from "express";
import { RadarPayload, RadarResponse } from "@types";
import { protocolStrategies } from "@protocols";

export function RadarController(
  req: Request<unknown, unknown, RadarPayload>,
  res: Response<RadarResponse>,
) {
  let positions = req.body.scan;

  req.body.protocols.forEach((protocol) => {
    const protocolStrategy = protocolStrategies.find((pf) =>
      pf().condition(protocol),
    );
    if (protocolStrategy) positions = protocolStrategy().execute(positions);
  });

  res.send({
    x: positions[0].coordinates.x,
    y: positions[0].coordinates.y,
  });
}
