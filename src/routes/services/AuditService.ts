import { ServiceFactory } from "@types";
import { AuditRepository } from "@routes/repository/AuditRepository";
import { Audit } from "@routes/models/AuditModel";

export type AuditService = {
  getAudits: () => Promise<Audit[]>;
  getAuditById: (id: string) => Promise<Audit | null>;
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
    getAuditById(id: string) {
      return auditRepository.getAuditById(id);
    },
  };
};
