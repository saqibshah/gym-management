"use client";

import { addMonths, isBefore, format } from "date-fns";
import PaymentBadge from "@/app/components/PaymentBadge";
import { Text } from "@radix-ui/themes";

export type Payment = { paidAt: string | Date };

interface Props {
  joinedAt: string | Date;
  payments: Payment[];
}

export default function PaymentStatus({ joinedAt, payments }: Props) {
  const today = new Date();
  const joinDate = new Date(joinedAt);

  // 1) If no payments, immediately Pending
  if (payments.length === 0) {
    return <PaymentBadge color="yellow" label="No Payments" />;
  }

  const lastPayment = new Date(payments[payments.length - 1].paidAt);

  // 2) Otherwise, coverage = joinDate + numberOfPayments months
  const coveredUntil = addMonths(joinDate, payments.length);

  // 3) Still Paid only if today < coveredUntil
  const isPaid = isBefore(today, coveredUntil);

  return (
    <div>
      <PaymentBadge
        color={isPaid ? "green" : "red"}
        label={isPaid ? "Paid" : "Pending"}
      />

      <Text as="p" size="2" mt="2">
        Last paid: {format(lastPayment, "do MMM yyyy")}
      </Text>
    </div>
  );
}
