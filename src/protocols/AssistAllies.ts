import { Protocol, ScanPosition, TargetPrioritizationStrategy } from "@types";

export function executeAssistAllies(positions: Array<ScanPosition>) {
  const getAllies = positions.filter((sp) => {
    if (sp.allies) return sp.allies;
  });

  if (getAllies && getAllies.length > 0) positions = getAllies;

  return positions;
}

export function isProtocolAssistAllies(protocol: Protocol) {
  return protocol === Protocol.ASSIST_ALLIES;
}

export const createStrategyForAssistAllies: TargetPrioritizationStrategy =
  () => {
    return {
      condition: isProtocolAssistAllies,
      execute: executeAssistAllies,
    };
  };
