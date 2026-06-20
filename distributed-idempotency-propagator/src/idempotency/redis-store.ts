import { redis } from "../shared/redis";

const TTL = 3600;

export async function reserveKey(key: string): Promise<boolean> {
  const result = await redis.set(
    key,
    "PROCESSING",
    "EX",
    TTL,
    "NX"
  );

  return result === "OK";
}

export async function completeKey(
  key: string,
  response: unknown
) {
  await redis.set(
    key,
    JSON.stringify(response),
    "EX",
    TTL
  );
}

export async function getResponse(
  key: string
) {
  return redis.get(key);
}