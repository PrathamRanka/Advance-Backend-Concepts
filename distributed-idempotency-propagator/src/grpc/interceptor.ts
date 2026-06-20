import { validate } from "../idempotency/validator";

export async function idempotencyInterceptor(
  key: string
) {
  const result = await validate(key);

  if (!result.execute) {
    return result.cached;
  }

  return null;
}