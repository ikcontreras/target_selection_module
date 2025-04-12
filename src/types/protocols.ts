import { RadarPayload } from "./payload";
import { Coordinates } from "./coordinates";

export enum Protocols {
  "CLOSEST_ENEMIES" = "closest-enemies",
  "FURTHEST_ENEMIES" = "furthest-enemies",
  "ASSIST_ALLIES" = "assist-allies",
  "AVOID_CROSSFIRE" = "avoid-crossfire",
  "PRIORITIZE_MECH" = "prioritize-mech",
  "AVOID_MECH" = "avoid-mech",
}

export type TargetPrioritizationStrategy = () => {
  condition: (radar: RadarPayload) => boolean;
  execute: (radar: RadarPayload) => Coordinates;
};
