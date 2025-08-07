"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { paymentSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, RadioGroup, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface Props {
  clientId: number;
  fee: number;
}

type PaymentFormData = z.infer<typeof paymentSchema>;

const ClientPaymentForm = ({ clientId, fee }: Props) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      clientId,
      amount: fee,
    },
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/payments", data);
      router.push("/clients");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  });

  return (
    <div className="max-w-xl">
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          readOnly
          placeholder="Amount"
          {...register("amount", {
            valueAsNumber: true,
            min: { value: 0, message: "Fee must be ≥ 0" },
          })}
        />
        <ErrorMessage>{errors.amount?.message}</ErrorMessage>

        <TextField.Root placeholder="Month" {...register("month")} />
        <ErrorMessage>{errors.month?.message}</ErrorMessage>

        <TextField.Root type="date" {...register("paidAt")} />
        <ErrorMessage>{errors.paidAt?.message}</ErrorMessage>

        <Grid gap="5" columns="2">
          <Text size="2">Payment Method</Text>
          <Controller
            name="method"
            control={control}
            render={({ field }) => (
              <RadioGroup.Root
                value={field.value}
                onValueChange={field.onChange}
              >
                <RadioGroup.Item value="cash">Cash</RadioGroup.Item>
                <RadioGroup.Item value="bank">Bank</RadioGroup.Item>
                <RadioGroup.Item value="online">Online</RadioGroup.Item>
              </RadioGroup.Root>
            )}
          />
        </Grid>
        <ErrorMessage>{errors.method?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ClientPaymentForm;
