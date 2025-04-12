import { Protocol, ScanPosition, TargetPrioritizationStrategy } from "@types";

export function AvoidCrossfire(positions: Array<ScanPosition>) {
  const getEnemiesWithOutAllies = positions.filter((sp) => {
    return !sp.allies || sp.allies === 0;
  });

  if (getEnemiesWithOutAllies && getEnemiesWithOutAllies.length > 0)
    positions = getEnemiesWithOutAllies;

  return positions;
}

export const getAvoidCrossfireStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.AVOID_CROSSFIRE,
    execute: AvoidCrossfire,
  };
};
