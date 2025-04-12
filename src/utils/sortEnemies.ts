import { RadarPayload } from "@types";

export function sortEnemies(radar: RadarPayload) {
  return radar.scan.sort((a, b) => {
    return (
      a.coordinates.x ** 2 +
      a.coordinates.y ** 2 -
      (b.coordinates.x ** 2 + b.coordinates.y ** 2)
    );
  });
}
