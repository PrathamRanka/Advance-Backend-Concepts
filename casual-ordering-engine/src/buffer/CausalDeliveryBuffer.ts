import { Event } from "../models/Event";
import { Logger } from "../utils/logger";
import { MetricsCollector } from "../metrics/MetricsCollector";

export class CausalDeliveryBuffer {
  private buffer: Event[] = [];

  constructor(
    private logger: Logger,
    private metrics: MetricsCollector
  ) {}

  add(event: Event) {
    this.buffer.push(event);

    this.buffer.sort((a, b) => {
      if (a.hlc.physical !== b.hlc.physical) {
        return a.hlc.physical - b.hlc.physical;
      }
      return a.hlc.logical - b.hlc.logical;
    });

    this.logger.debug("event_buffered", event);
  }

  flush(): Event[] {
    const out = [...this.buffer];
    this.buffer = [];

    this.logger.info("buffer_flushed", {
      count: out.length,
    });

    return out;
  }
}