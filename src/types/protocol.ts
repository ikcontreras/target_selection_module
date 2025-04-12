import { RadarPayload, ScanPosition } from "./payload";

export enum Protocol {
  "CLOSEST_ENEMIES" = "closest-enemies",
  "FURTHEST_ENEMIES" = "furthest-enemies",
  "ASSIST_ALLIES" = "assist-allies",
  "AVOID_CROSSFIRE" = "avoid-crossfire",
  "PRIORITIZE_MECH" = "prioritize-mech",
  "AVOID_MECH" = "avoid-mech",
}

export type TargetPrioritizationStrategy = () => {
  condition: (protocol: Protocol) => boolean;
  execute: (positions: Array<ScanPosition>) => Array<ScanPosition>;
};
