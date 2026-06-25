export class LedgerService {
  async writeEntry(transactionId: string ) {
    return {status: "RECORDED", transactionId};
  }
}