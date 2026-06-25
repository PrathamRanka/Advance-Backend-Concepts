import { PaymentService } from "./services/payment/payment.service";
import { LedgerService } from "./services/ledger/ledger.service";
import { NotificationService } from "./services/notification/notification.service";

async function main() {
  const payment = new PaymentService();
  const ledger = new LedgerService();
  const notification = new NotificationService();

  const result =
    await payment.charge(1000);

  await ledger.writeEntry(
    result.transactionId
  );

  await notification.send(
    result.transactionId
  );

  console.log(result);
}

main();