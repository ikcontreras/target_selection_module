import {
  EnemiesType,
  Protocol,
  ScanPosition,
  TargetPrioritizationStrategy,
} from "@types";
import { limitCoordinatesToRange } from "@utils";

export function PrioritizeMecha(positions: Array<ScanPosition>) {
  const getMecha = positions.filter(
    (sp) => sp.enemies.type === EnemiesType.MECHA,
  );

  if (getMecha && getMecha.length > 0) positions = getMecha;

  return limitCoordinatesToRange(100, positions);
}

export const getPrioritizeMechaStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.PRIORITIZE_MECH,
    execute: PrioritizeMecha,
  };
};
