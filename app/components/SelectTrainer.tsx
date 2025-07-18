"use client";

import { ErrorMessage, Skeleton } from "@/app/components";
import type { Trainer } from "@prisma/client";
import { Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { groupClassSchema } from "../validationSchemas";
import z from "zod";

type GroupFormData = z.infer<typeof groupClassSchema>;

const SelectTrainer = ({
  fieldName,
  control,
  errors,
}: {
  fieldName: keyof GroupFormData;
  control: Control<GroupFormData>;
  errors: FieldErrors<GroupFormData>;
}) => {
  const {
    data: trainers,
    error: trainerError,
    isLoading,
  } = useQuery<Trainer[]>({
    queryKey: ["trainers"],
    queryFn: () => axios.get("/api/trainers").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  if (trainerError) return;

  if (isLoading) return <Skeleton width="8rem" />;

  return (
    <>
      <Flex>
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <Select.Root
              {...field}
              onValueChange={(val) =>
                field.onChange(val === "none" ? null : Number(val))
              }
              value={field.value?.toString() || "none"}
            >
              <Select.Trigger placeholder="Select Trainer" />
              <Select.Content position="popper">
                <Select.Item value="none">Select Trainer</Select.Item>
                {trainers?.map((trainer) => (
                  <Select.Item key={trainer.id} value={trainer.id.toString()}>
                    {trainer.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />
      </Flex>
      <ErrorMessage>{errors[fieldName]?.message}</ErrorMessage>
    </>
  );
};

export default SelectTrainer;
