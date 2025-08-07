import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "Name is requried."),
  contact: z.string().refine(
    (val) => {
      return /^0[3]\d{9}$/.test(val) || /^\+92[3]\d{9}$/.test(val);
    },
    { message: "Must be a valid phone number: 03001234567 or +923001234567" }
  ),
  gender: z.enum(["male", "female"], "Gender is required."),
  category: z.enum(
    ["personal", "group", "self", "cricketer"],
    "Category is required."
  ),
  fee: z.number().int().nonnegative(),
  shift: z.enum(["morning", "evening"], "Shift is required."),
  assignedTrainerId: z.number().optional().nullable(),
  groupClassId: z.number().optional().nullable(),
});

export const trainerSchema = z.object({
  name: z.string().min(1),
  specialization: z
    .string()
    .min(3, "This must be at least 3 characters")
    .or(z.literal(""))
    .optional(),
  shift: z.enum(["morning", "evening", "both"], "Select one"),
  canTakeGroup: z.boolean(),
  canTakePersonal: z.boolean(),
});

export const groupClassSchema = z.object({
  name: z.string().min(1, "Enter Name"),
  trainerId: z.number("Choose a trainer").int().positive(),
  time: z.string().min(1, "Enter time."),
  days: z
    .array(z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]))
    .min(1, { message: "Select at least one day" }),
  shift: z.enum(["morning", "evening"], "Select one"),
  gender: z.enum(["male", "female"], "Gender is required."),
});

export const paymentSchema = z.object({
  clientId: z.number().int().positive(),
  amount: z.number().int().nonnegative(),
  month: z.string().min(1, "Enter month"),
  method: z.enum(["cash", "bank", "online"]),
  paidAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Enter a valid date"),
});
