import { Protocol, ScanPosition, TargetPrioritizationStrategy } from "@types";
import { sortEnemies } from "@utils";

export function FurthestEnemies(positions: Array<ScanPosition>) {
  let enemiesSorted = sortEnemies(positions);

  return enemiesSorted.reverse();
}

export const getFurthestEnemiesStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.FURTHEST_ENEMIES,
    execute: FurthestEnemies,
  };
};
