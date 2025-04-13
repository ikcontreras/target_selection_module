import { Coordinates, RadarPayload, RepositoryFactory } from "@types";
import { Model } from "mongoose";
import { log } from "@utils";
import { Audit } from "@routes/models/AuditModel";

export type AuditRepository = {
  save: (payload: RadarPayload, response: Coordinates) => void;
  getAudits: () => Promise<Audit[]>;
};

export const createAuditRepository: RepositoryFactory<
  Model<Audit>,
  AuditRepository
> = (auditModel) => {
  return {
    save(payload: RadarPayload, response: Coordinates) {
      new auditModel({
        date: new Date(),
        protocols: payload.protocols,
        scanner: payload.scan,
        target: {
          x: response.x,
          y: response.y,
        },
      })
        .save()
        .catch((err: any) => {
          log.error(`Error saving audit record: ${err}`);
        });
    },
    getAudits() {
      return auditModel.find().exec();
    },
  };
};
