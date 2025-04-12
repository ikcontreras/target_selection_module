import {
  EnemiesType,
  Protocol,
  ScanPosition,
  TargetPrioritizationStrategy,
} from "@types";
import { limitCoordinatesToRange } from "@utils";

export function AvoidMecha(positions: Array<ScanPosition>) {
  const avoidMecha = positions.filter((sp) => {
    return sp.enemies.type !== EnemiesType.MECHA;
  });

  if (avoidMecha && avoidMecha.length > 0) positions = avoidMecha;

  return limitCoordinatesToRange(100, positions);
}

export const getAvoidMechaStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.AVOID_MECH,
    execute: AvoidMecha,
  };
};
