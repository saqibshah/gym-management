import { z } from "zod";

const schema = z.object({
  clientId: z.number().int().positive(),
  amount: z.number().int().nonnegative(),
  month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  method: z.enum(["cash", "bank", "online"]),
});

export default schema;
