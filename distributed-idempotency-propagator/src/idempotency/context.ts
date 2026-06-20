import { ICO } from "../shared/types";

export function createContext (
    parentKey: string,
    childKey: string,
    serviceId: string,
    operationType: string,
): ICO {
    return { parentKey, childKey, serviceId, operationType, timestamp: Date.now()};
}