import { Model, model, Schema } from "mongoose";
import { Protocol, ScanPosition } from "@types";

export interface Audit extends Document {
  date: Date;
  protocols: Protocol[];
  scanner: ScanPosition[];
  target: {
    x: number;
    y: number;
  };
}

const AuditSchema = new Schema<Audit>({
  date: Date,
  protocols: Array<Protocol>,
  scanner: Array<ScanPosition>,
  target: {
    x: Number,
    y: Number,
  },
});

export const AuditModel: Model<Audit> = model<Audit>("Audit", AuditSchema);
