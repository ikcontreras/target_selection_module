import { ServiceFactory } from "@types";
import { AuditRepository } from "@routes/repository/AuditRepository";
import { Audit } from "@routes/models/AuditModel";

export type AuditService = {
  getAudits: () => Promise<Audit[]>;
};

type Repositories = {
  auditRepository: AuditRepository;
};

export const createAuditService: ServiceFactory<Repositories, AuditService> = ({
  auditRepository,
}) => {
  return {
    getAudits() {
      return auditRepository.getAudits();
    },
  };
};
