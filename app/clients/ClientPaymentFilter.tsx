"use client";
import { Flex, Select } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Spinner } from "../components";

const statuses: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
];

const ClientPaymentFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentStatus = searchParams.get("status") || "all";
  const [loading, setLoading] = useState(false);

  // 👇 Reset loader once URL changes
  useEffect(() => {
    setLoading(false);
  }, [pathname, currentStatus]);

  return (
    <Flex gap="3" align="center">
      <Select.Root
        defaultValue={searchParams.get("status") || "all"}
        onValueChange={(status) => {
          const query = status ? `?status=${status}` : "";
          setLoading(true);
          router.push(query);
        }}
      >
        <Select.Trigger placeholder="Filter by payment..." />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      {loading && <Spinner />}
    </Flex>
  );
};

export default ClientPaymentFilter;
