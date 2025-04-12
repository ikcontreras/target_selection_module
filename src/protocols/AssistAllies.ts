import { Protocol, ScanPosition, TargetPrioritizationStrategy } from "@types";
import { limitCoordinatesToRange } from "@utils";

export function AssistAllies(positions: Array<ScanPosition>) {
  const getAllies = positions.filter((sp) => {
    if (sp.allies) return sp.allies;
  });

  if (getAllies && getAllies.length > 0) positions = getAllies;

  return limitCoordinatesToRange(100, positions);
}

export const getAssistAlliesStrategy: TargetPrioritizationStrategy = () => {
  return {
    condition: (protocol) => protocol === Protocol.ASSIST_ALLIES,
    execute: AssistAllies,
  };
};
