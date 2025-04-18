import {
  EnemiesType,
  Protocol,
  ScanPosition,
  TargetPrioritizationStrategy,
} from "@types";

export function executePrioritizeMecha(positions: Array<ScanPosition>) {
  const getMecha = positions.filter(
    (sp) => sp.enemies.type === EnemiesType.MECHA,
  );

  if (getMecha && getMecha.length > 0) positions = getMecha;

  return positions;
}

export function isProtocolPrioritizeMecha(protocol: Protocol) {
  return protocol === Protocol.PRIORITIZE_MECH;
}

export const createStrategyForPrioritizeMecha: TargetPrioritizationStrategy =
  () => {
    return {
      condition: isProtocolPrioritizeMecha,
      execute: executePrioritizeMecha,
    };
  };
