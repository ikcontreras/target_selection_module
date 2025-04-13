import { RadarController } from "@routes/controllers/RadarController";
import { HTTP_METHODS, Route } from "@types";
import { createRadarService } from "@routes/services/RadarService";
import { createAuditRepository } from "@routes/repository/AuditRepository";
import { AuditModel } from "@routes/models/AuditModel";

export const routes: Route[] = [
  {
    path: "/radar",
    method: HTTP_METHODS.POST,
    controller: RadarController({
      radarService: createRadarService({
        auditRepository: createAuditRepository(AuditModel),
      }),
    }).targetSelection,
  },
];
