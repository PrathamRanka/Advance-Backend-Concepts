import { HLC } from "../models/HLC";

export class HybridLogicalClock {
  private lastPhysical = Date.now();
  private logical = 0;

  constructor(private nodeId: string) {}

  now(): HLC {
    const now = Date.now();

    if (now > this.lastPhysical) {
      this.lastPhysical = now;
      this.logical = 0;
    } else {
      this.logical++;
    }

    return {
      physical: this.lastPhysical,
      logical: this.logical,
      nodeId: this.nodeId,
    };
  }

  merge(remote: HLC): HLC {
    const now = Date.now();

    const max = Math.max(now, this.lastPhysical, remote.physical);

    if (max === this.lastPhysical && max === remote.physical) {
      this.logical = Math.max(this.logical, remote.logical) + 1;
    } else if (max === this.lastPhysical) {
      this.logical++;
    } else if (max === remote.physical) {
      this.logical = remote.logical + 1;
    } else {
      this.logical = 0;
    }

    this.lastPhysical = max;

    return {
      physical: this.lastPhysical,
      logical: this.logical,
      nodeId: this.nodeId,
    };
  }
}