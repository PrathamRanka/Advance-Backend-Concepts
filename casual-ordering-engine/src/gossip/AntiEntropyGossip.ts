import { HybridLogicalClock } from "../clock/HybridLogicalClock";
import { HLC } from "../models/HLC";
import { Logger } from "../utils/logger";

export class AntiEntropyGossip {
  constructor(private logger: Logger) {}

  sync(local: HybridLogicalClock, remote: HLC) {
    this.logger.info("gossip_sync", { remote });

    return local.merge(remote);
  }
}