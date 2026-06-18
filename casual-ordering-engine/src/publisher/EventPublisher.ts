import {Event} from "../models/Event";
import { HybridLogicalClock } from "../clock/HybridLogicalClock";

export class EventPublisher{
    constructor(private readonly hlc: HybridLogicalClock) {}

    publish(payload: string): Event{
        return {
            id: crypto.randomUUID(),
            payload,
            hlc: this.hlc.now(),
        };
    }
}