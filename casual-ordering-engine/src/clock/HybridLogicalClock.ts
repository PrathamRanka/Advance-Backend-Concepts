import { HLC } from "../models/HLC";

export class HybridLogicalClock {
  private lastPhysical = Date.now();
  private logical = 0;

  constructor(private readonly nodeId: string) {}

  public now(): HLC {
    const current = Date.now();

    if (current > this.lastPhysical) {
      this.lastPhysical = current;
      this.logical = 0;
    } else {
      this.logical++;
    }

    return {
      physicalTime: this.lastPhysical,
      logicalCounter: this.logical,
      nodeId: this.nodeId,
    };
  }

  public merge(remote: HLC): HLC {
    const current = Date.now();

    const maxPhysical = Math.max(
      current,
      this.lastPhysical,
      remote.physicalTime
    );

    if (maxPhysical === this.lastPhysical &&
        maxPhysical === remote.physicalTime) {
      this.logical =
        Math.max(this.logical, remote.logicalCounter) + 1;
    } else if (maxPhysical === this.lastPhysical) {
      this.logical++;
    } else if (maxPhysical === remote.physicalTime) {
      this.logical = remote.logicalCounter + 1;
    } else {
      this.logical = 0;
    }

    this.lastPhysical = maxPhysical;

    return {
      physicalTime: this.lastPhysical,
      logicalCounter: this.logical,
      nodeId: this.nodeId,
    };
  }
}