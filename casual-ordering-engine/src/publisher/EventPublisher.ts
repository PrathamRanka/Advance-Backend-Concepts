import { HybridLogicalClock } from "../clock/HybridLogicalClock";
import { Event } from "../models/Event";
import { MetricsCollector } from "../metrics/MetricsCollector";
import { Logger } from "../utils/logger";

export class EventPublisher {
  constructor(
    private hlc: HybridLogicalClock,
    private metrics: MetricsCollector,
    private logger: Logger
  ) {}

  publish(payload: string): Event {
    this.metrics.recordEvent();

    const event: Event = {
      id: crypto.randomUUID(),
      payload,
      hlc: this.hlc.now(),
    };

    this.logger.info("event_published", event);

    return event;
  }
}