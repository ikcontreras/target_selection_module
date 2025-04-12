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

export const getAvoidMechaStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.AVOID_MECH,
    execute: executeAvoidMecha,
  };
};
