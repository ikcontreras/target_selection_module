import { EnemiesType, Protocol, ScanPosition } from "@types";
import {
  createExecutorClosestEnemies,
  isProtocolClosestEnemies,
} from "@protocol/ClosestEnemies";
import { describe, it } from "node:test";
import assert from "assert";

describe("Closest enemies protocol", () => {
  describe("test condition", () => {
    it("should condition be true for CLOSEST_ENEMIES", () => {
      assert.strictEqual(
        isProtocolClosestEnemies(Protocol.CLOSEST_ENEMIES),
        true,
      );
    });

    it("should condition be false for any other protocol", () => {
      assert.strictEqual(
        isProtocolClosestEnemies(Protocol.ASSIST_ALLIES),
        false,
      );
    });
  });

  describe("test execution", () => {
    it("should call sortEnemies with the correct positions", () => {
      const position: ScanPosition[] = [
        {
          coordinates: { x: 1, y: 1 },
          enemies: { type: EnemiesType.SOLDIER, number: 3 },
          allies: undefined,
        },
      ];

      const mockSortEnemies = (positions: ScanPosition[]) => {
        assert.deepEqual(positions, position); // Asegura que se recibe correctamente
        return position;
      };

      const executor = createExecutorClosestEnemies({
        sortEnemies: mockSortEnemies,
      });

      const result = executor(position);

      assert.deepEqual(result, position);
    });
  });
});
