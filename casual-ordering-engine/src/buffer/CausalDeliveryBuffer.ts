import { Event } from "../models/Event";

export class CausalDeliveryBuffer {
  private buffer: Event[] = [];

  add(event: Event) {
    this.buffer.push(event);

    this.buffer.sort((a, b) => {
      if (a.hlc.physicalTime !== b.hlc.physicalTime) {
        return a.hlc.physicalTime - b.hlc.physicalTime;
      }

      return (
        a.hlc.logicalCounter -
        b.hlc.logicalCounter
      );
    });
  }

  flush(): Event[] {
    const events = [...this.buffer];
    this.buffer = [];
    return events;
  }
}