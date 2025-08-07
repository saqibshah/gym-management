import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
];

const ClientPaymentFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by payment..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default ClientPaymentFilter;
