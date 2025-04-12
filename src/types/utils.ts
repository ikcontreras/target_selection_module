import { ScanPosition } from "./payload";

export type EnemySorter = (
  positions: Array<ScanPosition>,
) => Array<ScanPosition>;
