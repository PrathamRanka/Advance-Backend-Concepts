import { DistributedNode } from "../node/DistributedNode";

export class NetworkPartitionSimulator {
  run() {
    const A = new DistributedNode("A");
    const B = new DistributedNode("B");

    const e1 = A.publisher.publish("user_created");

    console.log("\n--- PARTITION ---\n");

    const e2 = A.publisher.publish("email_sent");
    const e3 = B.publisher.publish("email_received");

    A.buffer.add(e2);
    A.buffer.add(e3);

    console.log("\n--- MERGE ---\n");

    const merged = A.buffer.flush();

    console.log(merged);

    A.metrics.print();
  }
}