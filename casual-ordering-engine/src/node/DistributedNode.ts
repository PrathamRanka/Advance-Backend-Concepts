import { HybridLogicalClock } from "../clock/HybridLogicalClock";
import { EventPublisher } from "../publisher/EventPublisher";
import { CausalDeliveryBuffer } from "../buffer/CausalDeliveryBuffer";
import { MetricsCollector } from "../metrics/MetricsCollector";
import { Logger } from "../utils/logger";

export class DistributedNode {
  public clock: HybridLogicalClock;
  public publisher: EventPublisher;
  public buffer: CausalDeliveryBuffer;
  public metrics: MetricsCollector;
  public logger: Logger;

  constructor(public nodeId: string) {
    this.logger = new Logger(nodeId);
    this.metrics = new MetricsCollector();
    this.clock = new HybridLogicalClock(nodeId);

    this.publisher = new EventPublisher(
      this.clock,
      this.metrics,
      this.logger
    );

    this.buffer = new CausalDeliveryBuffer(
      this.logger,
      this.metrics
    );
  }
}