// components/PaymentStatus.tsx
"use client";

import { addMonths, isBefore } from "date-fns";
import { Text } from "@radix-ui/themes";
import PaymentBadge from "@/app/components/PaymentBadge";

type Payment = {
  paidAt: string | Date;
  method: string;
};

interface Props {
  payments: Payment[];
}

const PaymentStatus = ({ payments }: Props) => {
  const today = new Date();

  // 1) If no payments at all
  if (payments.length === 0)
    return <PaymentBadge color="yellow" label="No Payments" />;

  // 2) Otherwise, base the next due on the last payment date
  const lastPayment = payments[payments.length - 1];
  const lastPaidDate = new Date(lastPayment.paidAt);
  const nextDue = addMonths(lastPaidDate, 1);
  const lastPaymentMethod = lastPayment.method;

  return (
    <PaymentBadge
      color={isBefore(nextDue, today) ? "red" : "green"}
      label={isBefore(nextDue, today) ? "Pending" : "Paid"}
    />
  );
};

export default PaymentStatus;
