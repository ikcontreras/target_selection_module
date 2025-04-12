import { Protocols } from "./protocols";
import { Enemies } from "./enemies";
import { Coordinates } from "./coordinates";

export type RadarPayload = {
  protocols: Array<Protocols>;
  scan: Array<{
    coordinates: Coordinates;
    enemies: Enemies;
    allies?: number;
  }>;
};
