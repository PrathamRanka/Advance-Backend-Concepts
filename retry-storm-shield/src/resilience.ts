import { CircuitState } from "./types";

export class RetryBudget {
  private capacity: number;
  private refillRate: number;
  private tokens: number;
  private last: number;

  constructor(capacity = 200, refillRate = 50) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.last = Date.now();
  }

  private refill() {
    const now = Date.now();
    const elapsed = (now - this.last) / 1000;

    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate
    );

    this.last = now;
  }

  allow(): boolean {
    this.refill();

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }

    return false;
  }
}

// ---------------- CIRCUIT BREAKER ----------------

export class CircuitBreaker {
  private failures = 0;
  private state: CircuitState = "CLOSED";
  private lastFailureTime = 0;

  constructor(
    private threshold = 5,
    private resetTimeout = 5000
  ) {}

  allow(): boolean {
    if (this.state === "OPEN") {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = "HALF_OPEN";
        return true;
      }
      return false;
    }

    return true;
  }

  success() {
    this.failures = 0;
    this.state = "CLOSED";
  }

  fail() {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.threshold) {
      this.state = "OPEN";
    }
  }

  getState() {
    return this.state;
  }
}

// ---------------- ADAPTIVE LIMITER ----------------

export class AdaptiveLimiter {
  private limit: number;
  private latencies: number[] = [];

  constructor(base = 20) {
    this.limit = base;
  }

  record(latency: number) {
    this.latencies.push(latency);

    if (this.latencies.length > 30) {
      this.latencies.shift();
    }

    if (this.latencies.length < 5) return;

    const avg =
      this.latencies.reduce((a, b) => a + b, 0) /
      this.latencies.length;

    if (avg < 150) this.limit = Math.min(200, this.limit + 2);
    else if (avg > 300) this.limit = Math.max(1, this.limit - 3);
  }

  getLimit() {
    return this.limit;
  }
}

// ---------------- JITTER BACKOFF ----------------

export function retryDelay(attempt: number): number {
  const base = 50 * Math.pow(2, attempt);
  const jitter = Math.random() * base;
  return Math.min(1000, base + jitter);
}