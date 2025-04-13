import { model, Schema } from "mongoose";
import { Protocol, ScanPosition } from "@types";

const AuditSchema = new Schema({
  date: Date,
  protocols: Array<Protocol>,
  scanner: Array<ScanPosition>,
  target: {
    x: Number,
    y: Number,
  },
});

export const AuditModel = model("Audit", AuditSchema);
