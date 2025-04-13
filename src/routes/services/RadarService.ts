import {
  Coordinates,
  RadarPayload,
  ScanPosition,
  ServiceFactory,
} from "@types";
import { limitCoordinatesToRange, log } from "@utils";
import { AuditRepository } from "@routes/repository/AuditRepository";
import { protocolStrategies } from "@protocols";
import { Strategy } from "@routes/models/AuditModel";

export type RadarService = {
  getCoordinates: (radar: RadarPayload) => Coordinates | null;
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
      const limitView = 100;

      let target = null;

      let positions = limitCoordinatesToRange(limitView, radar.scan);

      const outOfRangeEnemies: ScanPosition[] = radar.scan.filter(
        (sp) => !positions.includes(sp),
      );

      const strategies: Array<Strategy> = [];

      radar.protocols.forEach((protocol) => {
        log.info(`Finding protocol ${protocol}...`);
        const protocolStrategy = protocolStrategies.find((pf) =>
          pf().condition(protocol),
        );

        if (protocolStrategy) {
          log.info(`Applying protocol ${protocol}...`);

          positions = protocolStrategy().execute(positions);

          if (positions[0] !== undefined) {
            target = {
              x: positions[0].coordinates.x,
              y: positions[0].coordinates.y,
            };
          }

          strategies.push({ protocol, result: positions });
        } else {
          log.warn(`Protocol ${protocol} not found.`);
          strategies.push({ protocol, result: "Protocol not found" });
        }
      });

      if (target) {
        log.info(
          `Target selected at (${positions[0].coordinates.x}, ${positions[0].coordinates.y}).`,
        );
      } else {
        log.error("Target not found.");
      }

      auditRepository.save(radar, target, strategies, outOfRangeEnemies);
      return target;
    },
  };
};
