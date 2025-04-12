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

export const getFurthestEnemiesStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.FURTHEST_ENEMIES,
    execute: createExecutorFurthestEnemies({ sortEnemies }),
  };
};
