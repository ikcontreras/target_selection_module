import {
  EnemiesType,
  Protocol,
  ScanPosition,
  TargetPrioritizationStrategy,
} from "@types";

export function PrioritizeMecha(positions: Array<ScanPosition>) {
  const getMecha = positions.filter(
    (sp) => sp.enemies.type === EnemiesType.MECHA,
  );

  if (getMecha && getMecha.length > 0) positions = getMecha;

  return positions;
}

export const getPrioritizeMechaStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.PRIORITIZE_MECH,
    execute: PrioritizeMecha,
  };
};
