"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import SelectTrainer from "@/app/components/SelectTrainer";
import { groupClassSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupClass } from "@prisma/client";
import {
  Button,
  Callout,
  CheckboxGroup,
  Grid,
  RadioGroup,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type GroupFormData = z.infer<typeof groupClassSchema>;

type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

const GroupClassForm = ({ groupClass }: { groupClass?: GroupClass }) => {
  const router = useRouter();

  const defaultDays = (groupClass?.days as WeekDay[]) ?? [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupClassSchema),
    defaultValues: {
      days: defaultDays,
      name: groupClass?.name,
      time: groupClass?.time,
      trainerId: groupClass?.trainerId,
      shift: groupClass?.shift || "morning",
      gender: groupClass?.gender || "male",
    },
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      setSubmitting(true);
      if (groupClass)
        await axios.patch("/api/group-classes/" + groupClass.id, data);
      else await axios.post("/api/group-classes", data);
      router.push("/group-classes");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
      console.log(error);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField.Root placeholder="Name" {...register("name")} />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>

        <TextField.Root placeholder="Time" {...register("time")} />
        <ErrorMessage>{errors.time?.message}</ErrorMessage>

        {/* <TextField.Root
          placeholder="Trainer ID"
          {...register("trainerId", {
            valueAsNumber: true,
            min: { value: 1, message: "Fee must be ≥ 1" },
          })}
        />
        <ErrorMessage>{errors.trainerId?.message}</ErrorMessage> */}

        <SelectTrainer
          fieldName="trainerId"
          control={control}
          errors={errors}
        />

        <Grid gap="5" columns="2">
          <Text size="2">Shift</Text>
          <Controller
            name="shift"
            control={control}
            render={({ field }) => (
              <RadioGroup.Root
                {...field}
                value={field.value}
                onValueChange={field.onChange}
              >
                <RadioGroup.Item value="morning">Morning</RadioGroup.Item>
                <RadioGroup.Item value="evening">Evening</RadioGroup.Item>
              </RadioGroup.Root>
            )}
          />
        </Grid>
        <ErrorMessage>{errors.shift?.message}</ErrorMessage>

        <Grid gap="5" columns="2">
          <Text size="2">Gender</Text>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <RadioGroup.Root
                {...field}
                value={field.value}
                onValueChange={field.onChange}
              >
                <RadioGroup.Item value="male">Male</RadioGroup.Item>
                <RadioGroup.Item value="female">Female</RadioGroup.Item>
              </RadioGroup.Root>
            )}
          />
        </Grid>
        <ErrorMessage>{errors.gender?.message}</ErrorMessage>

        <Grid gap="5" columns="2">
          <Text size="2">Days</Text>
          <Controller
            name="days"
            control={control}
            render={({ field }) => (
              <CheckboxGroup.Root
                value={field.value}
                onValueChange={field.onChange}
              >
                <CheckboxGroup.Item value="Mon">Monday</CheckboxGroup.Item>
                <CheckboxGroup.Item value="Tue">Tuesday</CheckboxGroup.Item>
                <CheckboxGroup.Item value="Wed">Wednesday</CheckboxGroup.Item>
                <CheckboxGroup.Item value="Thu">Thursady</CheckboxGroup.Item>
                <CheckboxGroup.Item value="Fri">Friday</CheckboxGroup.Item>
                <CheckboxGroup.Item value="Sat">Saturday</CheckboxGroup.Item>
                <CheckboxGroup.Item value="Sun">Sunday</CheckboxGroup.Item>
              </CheckboxGroup.Root>
            )}
          />
        </Grid>
        <ErrorMessage>{errors.days?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {groupClass ? "Update Class" : "Add New Class"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default GroupClassForm;
