"use client";

import PaymentBadge from "@/app/components/PaymentBadge";
import { cycleMonths } from "@/app/libs/cycleMonths";

export type Payment = { paidAt: string | Date };

interface Props {
  joinedAt: Date;
  payments: number;
}

export default function PaymentStatus({ joinedAt, payments }: Props) {
  const { spanMonths } = cycleMonths(joinedAt);
  const pendingInvoices = spanMonths - payments;

  return (
    <PaymentBadge
      color={pendingInvoices > 0 ? "red" : "green"}
      label={
        pendingInvoices > 0
          ? `${pendingInvoices} Pending Invoice${
              pendingInvoices > 1 ? "s" : ""
            }`
          : "Paid"
      }
    />
  );
}
