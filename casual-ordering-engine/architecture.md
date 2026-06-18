flowchart TB

subgraph Region-1
A[Node A]
end

subgraph Region-2
B[Node B]
end

subgraph Region-3
C[Node C]
end

A --> PUB[Event Publisher]
B --> PUB
C --> PUB

PUB --> HLC[Hybrid Logical Clock Layer]

HLC --> BUFFER[Causal Delivery Buffer]

BUFFER --> ORDER[Validated Ordered Delivery]

A <--> GOSSIP[Anti Entropy Gossip]
B <--> GOSSIP
C <--> GOSSIP

GOSSIP --> HLC

ORDER --> METRICS[Metrics Collector]

METRICS --> D1[hlc_drift_ms]
METRICS --> D2[causal_gap_count]
METRICS --> D3[out_of_order_delivery_rate]
METRICS --> D4[clock_sync_failures]