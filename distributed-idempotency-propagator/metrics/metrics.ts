import client from "prom-client";

export const duplicatePrevented =
  new client.Counter({
    name: "duplicate_prevented_count",
    help: "duplicates blocked",
  });

export const propagationFailures =
  new client.Counter({
    name: "ico_propagation_failures",
    help: "ico failures",
  });