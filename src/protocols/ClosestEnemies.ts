import { Protocol, ScanPosition, TargetPrioritizationStrategy } from "@types";
import { sortEnemies } from "@utils";

export function ClosestEnemies(positions: Array<ScanPosition>) {
  return sortEnemies(positions);
}

export const getClosestEnemiesStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.CLOSEST_ENEMIES,
    execute: ClosestEnemies,
  };
};
