"use client";

import { ErrorMessage, Skeleton, Spinner } from "@/app/components";
import SelectGroupClass from "@/app/components/SelectGroupClass";
import { clientSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Client, Trainer } from "@prisma/client";
import { Button, Callout, Flex, Select, TextField } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type ClientFormData = z.infer<typeof clientSchema>;

const ClientForm = ({ client }: { client?: Client }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const category = watch("category");

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    try {
      setSubmitting(true);
      if (client) await axios.patch("/api/clients/" + client.id, data);
      else await axios.post("/api/clients", data);
      router.push("/clients");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
      console.log(error);
    }
  });

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

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={client?.name}
          placeholder="Name"
          {...register("name")}
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>

        <TextField.Root
          defaultValue={client?.contact}
          placeholder="Contact"
          {...register("contact")}
        />
        <ErrorMessage>{errors.contact?.message}</ErrorMessage>

        <Flex>
          <Controller
            name="gender"
            control={control}
            defaultValue={client?.gender}
            render={({ field }) => (
              <Select.Root
                onValueChange={field.onChange}
                value={field.value?.toString() ?? ""}
              >
                <Select.Trigger placeholder="Gender" />
                <Select.Content position="popper">
                  <Select.Item value="male">Male</Select.Item>
                  <Select.Item value="female">Female</Select.Item>
                </Select.Content>
              </Select.Root>
            )}
          />
        </Flex>
        <ErrorMessage>{errors.gender?.message}</ErrorMessage>

        <Flex>
          <Controller
            name="category"
            control={control}
            defaultValue={client?.category}
            render={({ field }) => (
              <Select.Root
                onValueChange={field.onChange}
                value={field.value?.toString() ?? ""}
              >
                <Select.Trigger placeholder="Category" />
                <Select.Content position="popper">
                  <Select.Item value="personal">Personal</Select.Item>
                  <Select.Item value="group">Group</Select.Item>
                  <Select.Item value="self">Self</Select.Item>
                  <Select.Item value="cricketer">Cricketer</Select.Item>
                </Select.Content>
              </Select.Root>
            )}
          />
        </Flex>
        <ErrorMessage>{errors.category?.message}</ErrorMessage>

        {category === "personal" &&
          !trainerError &&
          (isLoading ? (
            <Skeleton width="8rem" />
          ) : (
            <Flex>
              <Controller
                name="assignedTrainerId"
                control={control}
                defaultValue={client?.assignedTrainerId}
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
                        <Select.Item
                          key={trainer.id}
                          value={trainer.id.toString()}
                        >
                          {trainer.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </Flex>
          ))}
        <ErrorMessage>{errors.assignedTrainerId?.message}</ErrorMessage>

        {category === "group" && (
          <SelectGroupClass
            control={control}
            errors={errors}
            value={client?.groupClassId}
          />
        )}

        <TextField.Root
          defaultValue={client?.fee}
          placeholder="Fee"
          {...register("fee", {
            valueAsNumber: true,
            min: { value: 0, message: "Fee must be ≥ 0" },
          })}
        />
        <ErrorMessage>{errors.fee?.message}</ErrorMessage>

        <Flex>
          <Controller
            name="shift"
            control={control}
            defaultValue={client?.shift}
            render={({ field }) => (
              <Select.Root
                onValueChange={field.onChange}
                value={field.value?.toString() ?? ""}
              >
                <Select.Trigger placeholder="Shift" />
                <Select.Content position="popper">
                  <Select.Item value="morning">Morning</Select.Item>
                  <Select.Item value="evening">Evening</Select.Item>
                </Select.Content>
              </Select.Root>
            )}
          />
        </Flex>
        <ErrorMessage>{errors.shift?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {client ? "Update Client" : "Add New Client"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ClientForm;
