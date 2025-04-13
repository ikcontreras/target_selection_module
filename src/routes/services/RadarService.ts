import { RadarPayload, ScanPosition, ServiceFactory } from "@types";
import { limitCoordinatesToRange, log } from "@utils";
import { AuditRepository } from "@routes/repository/AuditRepository";
import { protocolStrategies } from "@protocols";

export type RadarService = {
  getCoordinates: (radar: RadarPayload) => ScanPosition;
};

type Repositories = {
  auditRepository: AuditRepository;
};

export const createRadarService: ServiceFactory<Repositories, RadarService> = ({
  auditRepository,
}) => {
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

      auditRepository.save(radar, positions[0].coordinates);
      return positions[0];
    },
  };
};
