import { z } from "zod";

const pakistanPhoneSchema = z.string().refine(
  (val) => {
    // Allow either 11‑digit local or E.164 with +92 prefix
    return (
      /^0[3]\d{9}$/.test(val) || // e.g. 03001234567
      /^\+92[3]\d{9}$/.test(val)
    ); // e.g. +923001234567
  },
  {
    message: "Must be a valid PK phone: 03001234567 or +923001234567",
  }
);

const schema = z.object({
  name: z.string().min(1),
  membershipNumber: z.string().min(3),
  contact: pakistanPhoneSchema,
  gender: z.enum(["male", "female"]),
  category: z.enum(["personal", "group", "self", "cricketer"]),
  fee: z.number().int().nonnegative(),
  shift: z.enum(["morning", "evening"]),
});

export default schema;
