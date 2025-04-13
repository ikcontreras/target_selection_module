import { Request, Response } from "express";
import { ControllerFactory } from "@types";
import { AuditService } from "@routes/services/AuditService";

export type AuditController = {
  list: (req: Request, res: Response) => void;
};

type Services = {
  auditService: AuditService;
};

export const createAuditController: ControllerFactory<
  Services,
  AuditController
> = ({ auditService }) => {
  return {
    list: async (req: Request, res: Response) => {
      const audits = await auditService.getAudits();

      res.send({
        success: true,
        result: audits,
      });
    },
  };
};
