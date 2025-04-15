import {
  EnemySorter,
  Protocol,
  ScanPosition,
  TargetPrioritizationStrategy,
} from "@types";
import { sortEnemies } from "@utils";

export const createExecutorFurthestEnemies = ({
  sortEnemies,
}: {
  sortEnemies: EnemySorter;
}) => {
  return (positions: Array<ScanPosition>) => {
    let enemiesSorted = sortEnemies(positions);

    return enemiesSorted.reverse();
  };
};

export function isProtocolFurthestEnemies(protocol: Protocol) {
  return protocol === Protocol.FURTHEST_ENEMIES;
}

export const createStrategyForFurthestEnemies: TargetPrioritizationStrategy =
  () => {
    return {
      condition: isProtocolFurthestEnemies,
      execute: createExecutorFurthestEnemies({ sortEnemies }),
    };
  };
