import { Protocol } from "./protocol";
import { Enemies } from "./enemies";
import { Coordinates } from "./coordinates";

export type ScanPosition = {
  coordinates: Coordinates;
  enemies: Enemies;
  allies?: number;
};

export type RadarPayload = {
  protocols: Array<Protocol>;
  scan: Array<ScanPosition>;
};
