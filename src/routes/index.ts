import { RadarController } from "@routes/controllers/RadarController";
import { HTTP_METHODS } from "@types";
import { createRadarService } from "@routes/services/RadarService";

export const routes = [
  {
    path: "/radar",
    method: HTTP_METHODS.POST,
    controller: RadarController({ RadarService: createRadarService })
      .targetSelection,
  },
];
