import { TargetPrioritizationStrategy } from "@types";

import { getPrioritizeMechaStrategy } from "./PrioritizeMech";
import { getClosestEnemiesStrategy } from "./ClosestEnemies";
import { getFurthestEnemiesStrategy } from "./FurthestEnemies";
import { getAssistAlliesStrategy } from "./AssistAllies";
import { getAvoidCrossfireStrategy } from "./AvoidCrossfire";
import { getAvoidMechaStrategy } from "./AvoidMecha";

export const protocolStrategies: Array<TargetPrioritizationStrategy> = [
  getPrioritizeMechaStrategy,
  getClosestEnemiesStrategy,
  getFurthestEnemiesStrategy,
  getAssistAlliesStrategy,
  getAvoidCrossfireStrategy,
  getAvoidMechaStrategy,
];
