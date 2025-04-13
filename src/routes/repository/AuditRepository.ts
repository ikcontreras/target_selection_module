import {
  Coordinates,
  RadarPayload,
  RepositoryFactory,
  ScanPosition,
} from "@types";
import { Model } from "mongoose";
import { log } from "@utils";
import { Audit, Strategy } from "@routes/models/AuditModel";

export type AuditRepository = {
  save: (
    payload: RadarPayload,
    target: Coordinates | null,
    strategies: Array<Strategy>,
    outOfRangeEnemies: Array<ScanPosition>,
  ) => void;
  getAudits: () => Promise<Audit[]>;
  getAuditById: (id: string) => Promise<Audit | null>;
};

export const createAuditRepository: RepositoryFactory<
  Model<Audit>,
  AuditRepository
> = (auditModel) => {
  return {
    save(
      payload: RadarPayload,
      target: Coordinates | null,
      strategies: Array<Strategy>,
      outOfRangeEnemies: Array<ScanPosition>,
    ) {
      new auditModel({
        date: new Date(),
        protocols: payload.protocols,
        scanner: payload.scan,
        outOfRangeEnemies,
        strategies,
        target: target
          ? {
              x: target.x,
              y: target.y,
            }
          : null,
      })
        .save()
        .catch((err: any) => {
          log.error(`Error saving audit record: ${err}`);
        });
    },

    getAudits() {
      return auditModel.find().exec();
    },
    getAuditById(id: string) {
      return auditModel.findById({ _id: id }).exec();
    },
  };
};
