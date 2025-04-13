import { RadarPayload, RadarService } from "@types";
import { limitCoordinatesToRange, log } from "@utils";
import { protocolStrategies } from "@protocols";

export const createRadarService: RadarService = () => {
  return {
    getCoordinates(radar: RadarPayload) {
      log.info("Loading target prioritization algorithm...");

      let positions = limitCoordinatesToRange(100, radar.scan);

      radar.protocols.forEach((protocol) => {
        log.info(`Finding protocol ${protocol}...`);
        const protocolStrategy = protocolStrategies.find((pf) =>
          pf().condition(protocol),
        );

        if (protocolStrategy) {
          log.info(`Applying protocol ${protocol}...`);
          positions = protocolStrategy().execute(positions);
        } else {
          log.warn(`Protocol ${protocol} not found.`);
        }
      });

      log.info(
        `Target selected at (${positions[0].coordinates.x}, ${positions[0].coordinates.y}).`,
      );

      return positions[0];
    },
  };
};
