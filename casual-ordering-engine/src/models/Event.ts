import { HLC } from "./HLC";

export interface Event {
    id: string;
    hlc: HLC;
    payload: string;
}