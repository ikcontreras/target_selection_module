import { Protocol, ScanPosition, TargetPrioritizationStrategy } from "@types";
import { sortEnemies } from "@utils";
import { limitCoordinatesToRange } from "@utils";

export function FurthestEnemies(positions: Array<ScanPosition>) {
  let enemiesSorted = sortEnemies(positions);

  return limitCoordinatesToRange(100, enemiesSorted.reverse());
}

export const getFurthestEnemiesStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.FURTHEST_ENEMIES,
    execute: FurthestEnemies,
  };
};
