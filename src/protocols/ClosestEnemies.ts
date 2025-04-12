import { Protocol, ScanPosition, TargetPrioritizationStrategy } from "@types";
import { limitCoordinatesToRange, sortEnemies } from "@utils";

export function ClosestEnemies(positions: Array<ScanPosition>) {
  return limitCoordinatesToRange(100, sortEnemies(positions));
}

export const getClosestEnemiesStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.CLOSEST_ENEMIES,
    execute: ClosestEnemies,
  };
};
