export async function callDownstream(): Promise<number> {
  // 5% failure injection
  if (Math.random() < 0.05) {
    await sleep(50);
    throw new Error("DOWNSTREAM_FAILURE");
  }

  const latency = 50 + Math.random() * 200;
  await sleep(latency);

  return latency;
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}