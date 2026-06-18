import { HybridLogicalClock } from "./clock/HybridLogicalClock";
import { EventPublisher } from "./publisher/EventPublisher";
import { CausalDeliveryBuffer } from "./buffer/CausalDeliveryBuffer";

export class DistributedNode {
  public readonly clock: HybridLogicalClock;
  public readonly publisher: EventPublisher;
  public readonly buffer: CausalDeliveryBuffer;

  constructor(public readonly nodeId: string) {
    this.clock = new HybridLogicalClock(nodeId);
    this.publisher = new EventPublisher(this.clock);
    this.buffer = new CausalDeliveryBuffer();
  }
}