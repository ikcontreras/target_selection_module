import { EnemiesType, Protocol, ScanPosition } from "@types";
import {
  executeAssistAllies,
  isProtocolAssistAllies,
} from "@protocol/AssistAllies";

import assert from "assert";
import { describe, it } from "node:test";

describe("Assist allies protocol", () => {
  const positionsMock: ScanPosition[] = [
    {
      coordinates: { x: 0, y: 0 },
      enemies: { type: EnemiesType.SOLDIER, number: 10 },
      allies: undefined,
    },
    {
      coordinates: { x: 1, y: 1 },
      enemies: { type: EnemiesType.SOLDIER, number: 10 },
      allies: 2,
    },
    {
      coordinates: { x: 2, y: 2 },
      enemies: { type: EnemiesType.SOLDIER, number: 10 },
      allies: 3,
    },
    {
      coordinates: { x: 3, y: 3 },
      enemies: { type: EnemiesType.SOLDIER, number: 10 },
      allies: undefined,
    },
  ];

  const expectedFiltered: ScanPosition[] = [
    {
      coordinates: { x: 1, y: 1 },
      enemies: { type: EnemiesType.SOLDIER, number: 10 },
      allies: 2,
    },
    {
      coordinates: { x: 2, y: 2 },
      enemies: { type: EnemiesType.SOLDIER, number: 10 },
      allies: 3,
    },
  ];

  describe("test condition", () => {
    it("should condition be true for ASSIST_ALLIES", () => {
      assert.strictEqual(isProtocolAssistAllies(Protocol.ASSIST_ALLIES), true);
    });

    it("should condition be false for any other protocol", () => {
      assert.strictEqual(
        isProtocolAssistAllies(Protocol.CLOSEST_ENEMIES),
        false,
      );
    });
  });

  describe("test execution", () => {
    it("should return the positions with allies", () => {
      const result = executeAssistAllies(positionsMock);
      assert.deepStrictEqual(result, expectedFiltered);
    });

    it("should return an empty array if no positions are provided", () => {
      const result = executeAssistAllies([]);
      assert.deepStrictEqual(result, []);
    });

    it("should return the same positions if not allies are provided", () => {
      const mockPositions: ScanPosition[] = [
        {
          coordinates: { x: 0, y: 0 },
          enemies: { type: EnemiesType.SOLDIER, number: 10 },
          allies: undefined,
        },
        {
          coordinates: { x: 1, y: 1 },
          enemies: { type: EnemiesType.SOLDIER, number: 10 },
          allies: undefined,
        },
      ];
      const result = executeAssistAllies(mockPositions);

      assert.deepStrictEqual(result, mockPositions);
    });
  });
});
