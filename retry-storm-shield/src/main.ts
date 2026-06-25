import { RetryBudget, CircuitBreaker, AdaptiveLimiter, retryDelay } from "./resilience";
import { callDownstream } from "./service";
import { Stats } from "./types";

const budget = new RetryBudget();
const breaker = new CircuitBreaker();
const limiter = new AdaptiveLimiter();

const stats: Stats = {
  success: 0,
  fail: 0,
  rejected: 0,
};

let activeRequests = 0;
const MAX_WORKERS = 80;

// ---------------- CORE EXECUTION ----------------

async function executeRequest(isRetry = false) {
  if (isRetry && !budget.allow()) {
    stats.rejected++;
    return;
  }

  if (!breaker.allow()) {
    stats.rejected++;
    return;
  }

  if (activeRequests > limiter.getLimit()) {
    stats.rejected++;
    return;
  }

  activeRequests++;

  try {
    const start = Date.now();
    const latency = await callDownstream();

    breaker.success();
    limiter.record(latency);

    stats.success++;
  } catch (err) {
    breaker.fail();
    stats.fail++;

    // retry storm (bounded + jitter)
    if (!isRetry) {
      for (let i = 0; i < 3; i++) {
        await sleep(retryDelay(i));
        await executeRequest(true);
      }
    }
  } finally {
    activeRequests--;
  }
}

// ---------------- TRAFFIC GENERATOR ----------------

function startWorkers() {
  for (let i = 0; i < MAX_WORKERS; i++) {
    worker();
  }
}

function worker() {
  setInterval(() => {
    if (Math.random() < 0.3) {
      executeRequest();
    }
  }, 10);
}

// ---------------- OBSERVABILITY ----------------

function monitor() {
  setInterval(() => {
    console.log(
      `SUCCESS=${stats.success} | FAIL=${stats.fail} | REJECTED=${stats.rejected} | LIMIT=${limiter.getLimit()} | CB=${breaker.getState()}`
    );
  }, 1000);
}

// ---------------- UTIL ----------------

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

// ---------------- START ----------------

startWorkers();
monitor();