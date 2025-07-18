"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { trainerSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trainer } from "@prisma/client";
import { Button, Grid, RadioGroup, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type TrainerFormData = z.infer<typeof trainerSchema>;

const TrainerForm = ({ trainer }: { trainer?: Trainer }) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainerFormData>({
    resolver: zodResolver(trainerSchema),
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);

    try {
      setSubmitting(true);
      if (trainer) await axios.patch("/api/trainers/" + trainer.id, data);
      else await axios.post("/api/trainers", data);
      router.push("/trainers");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  });

  return (
    <div className="max-w-xl">
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={trainer?.name}
          placeholder="Name"
          {...register("name")}
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>

        <Grid gap="5" columns="2">
          <Text size="2">Can Take Group Classes?</Text>
          <Controller
            name="canTakeGroup"
            control={control}
            defaultValue={trainer?.canTakeGroup}
            render={({ field }) => (
              <RadioGroup.Root
                value={field.value ? "1" : "2"}
                onValueChange={(val) => field.onChange(val === "1")}
              >
                <RadioGroup.Item value="1">True</RadioGroup.Item>
                <RadioGroup.Item value="2">False</RadioGroup.Item>
              </RadioGroup.Root>
            )}
          />
        </Grid>
        <ErrorMessage>{errors.canTakeGroup?.message}</ErrorMessage>

        <Grid gap="5" columns="2">
          <Text size="2">Can Take Personal Classes?</Text>
          <Controller
            name="canTakePersonal"
            control={control}
            defaultValue={trainer?.canTakePersonal}
            render={({ field }) => (
              <RadioGroup.Root
                value={field.value ? "1" : "2"}
                onValueChange={(val) => field.onChange(val === "1")}
              >
                <RadioGroup.Item value="1">True</RadioGroup.Item>
                <RadioGroup.Item value="2">False</RadioGroup.Item>
              </RadioGroup.Root>
            )}
          />
        </Grid>
        <ErrorMessage>{errors.canTakePersonal?.message}</ErrorMessage>

        <Grid gap="5" columns="2">
          <Text size="2">Shift?</Text>
          <Controller
            name="shift"
            control={control}
            defaultValue={trainer?.shift}
            render={({ field }) => (
              <RadioGroup.Root
                value={field.value}
                onValueChange={field.onChange}
              >
                <RadioGroup.Item value="morning">Morning</RadioGroup.Item>
                <RadioGroup.Item value="evening">Evening</RadioGroup.Item>
                <RadioGroup.Item value="both">Both</RadioGroup.Item>
              </RadioGroup.Root>
            )}
          />
        </Grid>
        <ErrorMessage>{errors.shift?.message}</ErrorMessage>

        <TextField.Root
          defaultValue={trainer?.specialization ?? ""}
          placeholder="Specialization"
          {...register("specialization")}
        />
        <ErrorMessage>{errors.specialization?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {trainer ? "Update Trainer" : "Add New Trainer"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TrainerForm;
