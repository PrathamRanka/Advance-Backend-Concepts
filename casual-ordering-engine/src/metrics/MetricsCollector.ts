export class MetricsCollector {
  private hlcDrift = 0;
  private causalGaps = 0;
  private outOfOrder = 0;
  private clockFailures = 0;

  private total = 0;

  recordEvent() {
    this.total++;
  }

  recordDelivery() {}

  recordCausalGap() {
    this.causalGaps++;
  }

  recordOutOfOrder() {
    this.outOfOrder++;
  }

  recordClockFailure() {
    this.clockFailures++;
  }

  updateHlcDrift(drift: number) {
    this.hlcDrift = Math.max(this.hlcDrift, drift);
  }

  snapshot() {
    return {
      hlc_drift_ms: this.hlcDrift,
      causal_gap_count: this.causalGaps,
      out_of_order_rate:
        this.total === 0 ? 0 : this.outOfOrder / this.total,
      clock_sync_failures: this.clockFailures,
      total_events: this.total,
    };
  }

  print() {
    console.table(this.snapshot());
  }
}