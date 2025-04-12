import { RadarController } from "@routes/controllers/RadarController";
import { HTTP_METHODS } from "@types";

export const routes = [
  {
    path: "/radar",
    method: HTTP_METHODS.POST,
    controller: RadarController().targetSelection,
  },
];
