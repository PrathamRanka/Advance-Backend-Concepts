import { HLC } from "./HLC";

export interface Event {
  id: string;
  payload: string;
  hlc: HLC;
}