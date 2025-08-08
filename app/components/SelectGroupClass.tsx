"use client";

import { GroupClass } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Flex, Select } from "@radix-ui/themes";
import { ErrorMessage, Skeleton } from "@/app/components";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { clientSchema } from "../validationSchemas";
import z from "zod";

type ClientFormData = z.infer<typeof clientSchema>;

const SelectGroupClass = ({
  control,
  errors,
  value,
}: {
  control: Control<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
  value: number | null | undefined;
}) => {
  const {
    data: groupClasses,
    error: groupClassesError,
    isLoading,
  } = useQuery<GroupClass[]>({
    queryKey: ["group-classes"],
    queryFn: () => axios.get("/api/group-classes").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  if (groupClassesError) return;

  if (isLoading) return <Skeleton width="8rem" />;

  return (
    <>
      <Flex>
        <Controller
          name={"groupClassId"}
          control={control}
          defaultValue={value}
          render={({ field }) => (
            <Select.Root
              {...field}
              onValueChange={(val) =>
                field.onChange(val === "none" ? null : Number(val))
              }
              value={field.value?.toString() || "none"}
            >
              <Select.Trigger placeholder="Select Class" />
              <Select.Content position="popper">
                <Select.Item value="none">Select Class</Select.Item>
                {groupClasses?.map((groupClass) => (
                  <Select.Item
                    key={groupClass.id}
                    value={groupClass.id.toString()}
                  >
                    {groupClass.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />
      </Flex>
      <ErrorMessage>{errors.groupClassId?.message}</ErrorMessage>
    </>
  );
};

export default SelectGroupClass;
