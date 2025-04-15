import { TargetPrioritizationStrategy } from "@types";

import { createStrategyForPrioritizeMecha } from "./PrioritizeMech";
import { createStrategyForClosestEnemies } from "./ClosestEnemies";
import { createStrategyForFurthestEnemies } from "./FurthestEnemies";
import { createStrategyForAssistAllies } from "./AssistAllies";
import { createStrategyForAvoidCrossfire } from "./AvoidCrossfire";
import { createStrategyForAvoidMecha } from "./AvoidMecha";

export const protocolStrategies: Array<TargetPrioritizationStrategy> = [
  createStrategyForPrioritizeMecha,
  createStrategyForClosestEnemies,
  createStrategyForFurthestEnemies,
  createStrategyForAssistAllies,
  createStrategyForAvoidCrossfire,
  createStrategyForAvoidMecha,
];
