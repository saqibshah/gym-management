import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  trainerId: z.number().int().positive(),
  time: z.string().min(1), // e.g. "07:00"
  days: z
    .array(z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]))
    .min(1),
  shift: z.enum(["morning", "evening"]),
  gender: z.enum(["male", "female"]).optional(),
});

export default schema;
