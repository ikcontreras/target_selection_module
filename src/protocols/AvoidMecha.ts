import {
  EnemiesType,
  Protocol,
  ScanPosition,
  TargetPrioritizationStrategy,
} from "@types";

export function executeAvoidMecha(positions: Array<ScanPosition>) {
  const avoidMecha = positions.filter((sp) => {
    return sp.enemies.type !== EnemiesType.MECHA;
  });

  if (avoidMecha && avoidMecha.length > 0) positions = avoidMecha;

  return positions;
}

export function isProtocolAvoidMecha(protocol: Protocol) {
  return protocol === Protocol.AVOID_MECH;
}

export const createStrategyForAvoidMecha: TargetPrioritizationStrategy = () => {
  return {
    condition: isProtocolAvoidMecha,
    execute: executeAvoidMecha,
  };
};
