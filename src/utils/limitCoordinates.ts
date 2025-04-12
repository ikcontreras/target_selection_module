import { ScanPosition } from "@types";

export function limitCoordinatesToRange(
  limit: number,
  coordinates: Array<ScanPosition>,
): Array<ScanPosition> {
  return coordinates.filter((position) => {
    const distance = Math.sqrt(
      position.coordinates.x ** 2 + position.coordinates.y ** 2,
    );
    return distance <= limit;
  });
}
