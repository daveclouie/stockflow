import { z } from "zod";

export const supplierSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters"),

  contactName: z
    .string()
    .optional(),

  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .optional(),

  address: z
    .string()
    .optional(),
});

export type SupplierFormValues =
  z.infer<typeof supplierSchema>;
