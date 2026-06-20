export class NotificationService {
  async send(
    transactionId: string
  ) {
    return {
      delivered: true,
      transactionId
    };
  }
}