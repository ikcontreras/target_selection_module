import { Model, model, Schema } from "mongoose";
import { Protocol, ScanPosition } from "@types";

export type Strategy = {
  protocol: Protocol;
  result: ScanPosition[] | string;
};

export interface Audit extends Document {
  date: Date;
  protocols: Protocol[];
  scanner: ScanPosition[];
  outOfRangeEnemies: ScanPosition[];
  strategies: Array<Strategy>;
  target: {
    x: number;
    y: number;
  } | null;
}

const AuditSchema = new Schema<Audit>({
  date: Date,
  protocols: Array<Protocol>,
  scanner: Array<ScanPosition>,
  outOfRangeEnemies: Array<ScanPosition>,
  strategies: Array<Strategy>,
  target: {
    x: Number,
    y: Number,
  },
});

export const AuditModel: Model<Audit> = model<Audit>("Audit", AuditSchema);
