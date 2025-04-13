import { createRadarController } from "@routes/controllers/RadarController";
import { HTTP_METHODS, Route } from "@types";
import { createRadarService } from "@routes/services/RadarService";
import { createAuditRepository } from "@routes/repository/AuditRepository";
import { AuditModel } from "@routes/models/AuditModel";
import { createAuditService } from "@routes/services/AuditService";
import { createAuditController } from "@routes/controllers/AuditController";

export const routes: Route[] = [
  {
    path: "/radar",
    method: HTTP_METHODS.POST,
    controller: createRadarController({
      radarService: createRadarService({
        auditRepository: createAuditRepository(AuditModel),
      }),
    }).targetSelection,
  },
  {
    path: "/audit",
    method: HTTP_METHODS.GET,
    controller: createAuditController({
      auditService: createAuditService({
        auditRepository: createAuditRepository(AuditModel),
      }),
    }).list,
  },
  {
    path: "/audit/:id",
    method: HTTP_METHODS.GET,
    controller: createAuditController({
      auditService: createAuditService({
        auditRepository: createAuditRepository(AuditModel),
      }),
    }).read,
  },
];
