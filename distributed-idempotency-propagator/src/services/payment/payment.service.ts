import crypto from "crypto";
export class PaymentService {
    async Charge( amount : number){
        return { transactionId: crypto.randomUUID(), amount};
    }
}