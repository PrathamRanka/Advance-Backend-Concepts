export interface MetricsSnapshot {
  hlc_drift_ms: number;
  causal_gap_count: number;
  out_of_order_delivery_rate: number;
  clock_sync_failures: number;
  total_events: number;
  delivered_events: number;
}

export class MetricsCollector {
  private hlcDriftMs = 0;
  private causalGapCount = 0;
  private outOfOrder = 0;
  private clockSyncFailures = 0;

  private totalEvents = 0;
  private deliveredEvents = 0;

  recordEvent() {
    this.totalEvents++;
  }

  recordDelivery() {
    this.deliveredEvents++;
  }

  recordCausalGap(count = 1) {
    this.causalGapCount += count;
  }

  recordOutOfOrder(count = 1) {
    this.outOfOrder += count;
  }

  recordClockSyncFailure(count = 1) {
    this.clockSyncFailures += count;
  }

  updateHlcDrift(driftMs: number) {
    this.hlcDriftMs = Math.max(this.hlcDriftMs, driftMs);
  }

  getSnapshot(): MetricsSnapshot {
    return {
      hlc_drift_ms: this.hlcDriftMs,
      causal_gap_count: this.causalGapCount,
      out_of_order_delivery_rate:
        this.totalEvents === 0
          ? 0
          : this.outOfOrder / this.totalEvents,
      clock_sync_failures: this.clockSyncFailures,
      total_events: this.totalEvents,
      delivered_events: this.deliveredEvents,
    };
  }

  print() {
    console.table(this.getSnapshot());
  }
}