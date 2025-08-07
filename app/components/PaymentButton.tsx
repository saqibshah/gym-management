"use client";

import { AlertDialog, Button, Flex, Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import Spinner from "./Spinner";

interface Props {
  clientID: number;
  amount: number;
  month: string;
}

const PaymentButton = ({ clientID, amount, month }: Props) => {
  const router = useRouter();
  const [method, setMethod] = useState<"cash" | "bank" | "online">("cash");
  const [error, setError] = useState(false);
  const [isPaying, setPaying] = useState(false);

  const [isPending, startTransition] = useTransition();

  const payInvoice = async () => {
    const data = {
      clientId: clientID,
      amount: amount,
      month: month,
      method: method,
      paidAt: new Date().toISOString(),
    };

    try {
      setPaying(true);
      await axios.post("/api/payments", data);
      startTransition(() => {
        router.refresh();
      });
      setPaying(false);
    } catch (error) {
      setPaying(false);
      setError(true);
      console.log(error);
    }
  };

  const loading = isPaying || isPending;

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={loading}>Pay {loading && <Spinner />}</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Confirm Payment</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Invoice Month: {month}
          </AlertDialog.Description>

          <Flex direction="column" gap="4" className="mt-4">
            <Select.Root
              value={method}
              onValueChange={(v) => setMethod(v as "cash" | "bank" | "online")}
            >
              <Select.Trigger placeholder="Method" />
              <Select.Content position="popper">
                <Select.Item value="cash">Cash</Select.Item>
                <Select.Item value="bank">Bank Transfer</Select.Item>
                <Select.Item value="online">Online</Select.Item>
              </Select.Content>
            </Select.Root>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button variant="solid" color="red" onClick={payInvoice}>
                  Yes
                </Button>
              </AlertDialog.Action>
            </Flex>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This payment cannot be added.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <Button color="gray" variant="soft" onClick={() => setError(false)}>
              OK
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default PaymentButton;
