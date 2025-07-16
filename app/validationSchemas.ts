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
