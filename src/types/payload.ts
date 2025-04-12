import { Protocols } from "./protocols";

type Coordinates = {
  x: number;
  y: number;
};

type Enemies = {
  type: "soldier" | "mech";
  number: number;
};

export type RadarPayload = {
  protocols: Array<Protocols>;
  scan: Array<{
    coordinates: Coordinates;
    enemies: Enemies;
    allies?: number;
  }>;
};
