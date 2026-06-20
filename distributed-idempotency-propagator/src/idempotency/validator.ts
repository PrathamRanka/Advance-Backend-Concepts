import { reserveKey, getResponse } from "./redis-store";


export async function validate(key: string){
    const reserved = await reserveKey(key);

    if(reserved){
        return {
            execute: true
        }
    }

    const caches = await getResponse(key);
    if(reserved){
        execute: false,
        caches
    };
}