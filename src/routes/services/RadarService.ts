import { RadarPayload } from "@types";
import { limitCoordinatesToRange, log } from "@utils";
import { protocolStrategies } from "@protocols";

export function RadarService() {
  return {
    getCoordinates(radar: RadarPayload) {
      let positions = limitCoordinatesToRange(100, radar.scan);

      radar.protocols.forEach((protocol) => {
        log.info(`Applying protocol ${protocol}...`);
        const protocolStrategy = protocolStrategies.find((pf) =>
          pf().condition(protocol),
        );
        if (protocolStrategy) positions = protocolStrategy().execute(positions);
      });

      return positions[0];
    },
  };
}
