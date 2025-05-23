import { ScanPosition } from "@types";
import { EnemySorter } from "@types";

export const sortEnemies: EnemySorter = (positions: Array<ScanPosition>) => {
  return positions.sort((a, b) => {
    return (
      Math.sqrt(a.coordinates.x ** 2 + a.coordinates.y ** 2) -
      Math.sqrt(b.coordinates.x ** 2 + b.coordinates.y ** 2)
    );
  });
};
