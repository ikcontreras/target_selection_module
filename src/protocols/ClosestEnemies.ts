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

export const getClosestEnemiesStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.CLOSEST_ENEMIES,
    execute: createExecutorClosestEnemies({ sortEnemies }),
  };
};
