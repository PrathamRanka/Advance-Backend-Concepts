import { Metadata } from "@grpc/grpc-js";

export function attachICO(
  metadata: Metadata,
  key: string
) {
  metadata.set(
    "x-idempotency-key",
    key
  );

  return metadata;
}