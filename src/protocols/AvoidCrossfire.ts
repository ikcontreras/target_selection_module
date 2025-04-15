import { Protocol, ScanPosition, TargetPrioritizationStrategy } from "@types";

export function executeAvoidCrossfire(positions: Array<ScanPosition>) {
  const getEnemiesWithOutAllies = positions.filter((sp) => {
    return !sp.allies || sp.allies === 0;
  });

  if (getEnemiesWithOutAllies && getEnemiesWithOutAllies.length > 0)
    positions = getEnemiesWithOutAllies;

  return positions;
}

export function isProtocolAvoidCrossfire(protocol: Protocol) {
  return protocol === Protocol.AVOID_CROSSFIRE;
}

export const createStrategyForAvoidCrossfire: TargetPrioritizationStrategy =
  () => {
    return {
      condition: isProtocolAvoidCrossfire,
      execute: executeAvoidCrossfire,
    };
  };
