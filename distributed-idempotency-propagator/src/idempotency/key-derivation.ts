import crypto  from "crypto";

export function deriveChildKey(
  parentKey: string,
  serviceId: string,
  operationType: string
): string {
  return crypto
    .createHmac("sha256", parentKey)
    .update(`${serviceId}:${operationType}`)
    .digest("hex");
}