import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  trainerNumber: z.string().min(3),
  specialization: z.string().min(3).optional(),
  shift: z.enum(["morning", "evening", "both"]),
  canTakeGroup: z.boolean(),
  canTakePersonal: z.boolean(),
});

export default schema;
