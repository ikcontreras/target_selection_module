import { Protocol, ScanPosition, TargetPrioritizationStrategy } from "@types";
import { limitCoordinatesToRange } from "@utils";

export function AvoidCrossfire(positions: Array<ScanPosition>) {
  const getEnemiesWithOutAllies = positions.filter((sp) => {
    return !sp.allies || sp.allies === 0;
  });

  if (getEnemiesWithOutAllies && getEnemiesWithOutAllies.length > 0)
    positions = getEnemiesWithOutAllies;

  return limitCoordinatesToRange(100, positions);
}

export const getAvoidCrossfireStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.AVOID_CROSSFIRE,
    execute: AvoidCrossfire,
  };
};
