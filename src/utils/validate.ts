import z from "zod";

export const REMINDER_TIMES = ["1", "5", "10", "15", "30", "60"];

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  expirationTime: z.coerce
    .number()
    .min(2)
    .max(7200, "Expiration time must be between 2 and 7200 seconds")
    .transform((val) => val.toString()),
  reminderTime: z
    .string()
    .refine((val) => REMINDER_TIMES.includes(val), {
      message: "Reminder time not valid",
    }),
});

export type FormSchema = z.infer<typeof formSchema>;

export function validateInput(formData: unknown) {
  return formSchema.safeParse(formData);
}
