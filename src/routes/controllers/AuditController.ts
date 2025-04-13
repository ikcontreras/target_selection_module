import { Request, Response } from "express";
import { ControllerFactory } from "@types";
import { AuditService } from "@routes/services/AuditService";

export type AuditController = {
  list: (req: Request, res: Response) => void;
  read: (req: Request, res: Response) => void;
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
    read: async (req: Request, res: Response) => {
      const audit = await auditService.getAuditById(req.params.id);

      if (!audit) {
        res.send({
          success: false,
          message: "Audit not found",
        });
      } else {
        res.send({
          success: true,
          result: audit,
        });
      }
    },
  };
};
