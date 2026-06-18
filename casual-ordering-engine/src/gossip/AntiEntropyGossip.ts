import { HybridLogicalClock } from "../clock/HybridLogicalClock";
import { HLC } from "../models/HLC";

    export class AntiEntropyGossip{
        synchronize(localClock: HybridLogicalClock, remoteState: HLC){
                return localClock.merge(remoteState);
        }
    }