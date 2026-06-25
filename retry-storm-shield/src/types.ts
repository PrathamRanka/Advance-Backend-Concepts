// //enum state
export type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

export interface Stats {
  success: number;
  fail: number;
  rejected: number;
}

