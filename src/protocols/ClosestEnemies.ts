import {
  EnemySorter,
  Protocol,
  ScanPosition,
  TargetPrioritizationStrategy,
} from "@types";
import { sortEnemies } from "@utils";

export const createExecutorClosestEnemies = ({
  sortEnemies,
}: {
  sortEnemies: EnemySorter;
}) => {
  return (positions: Array<ScanPosition>) => {
    return sortEnemies(positions);
  };
};

export function isProtocolClosestEnemies(protocol: Protocol) {
  return protocol === Protocol.CLOSEST_ENEMIES;
}

export const createStrategyForClosestEnemies: TargetPrioritizationStrategy =
  () => {
    return {
      condition: isProtocolClosestEnemies,
      execute: createExecutorClosestEnemies({ sortEnemies }),
    };
  };
