import { z } from "zod";

export const ContactFormSchemaStickey = z.object({
  first_name: z
    .string()
    .min(1, { message: "First Name is Requird" })
    .max(50, { message: "First name must be less than 50 characters" }),
  last_name: z.string().min(1, { message: "Last Name is Requird" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is Requird" })
    .email({ message: "Please enter a valid email address" }),
  mobile: z
    .string()
    .min(10, { message: "Phone Number is Requird" })
    .regex(/^[0-9+\-\s()]*$/, { message: "Please enter a valid phone number" }),

  message: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.trim().split(/\s+/).length <= 200,
      {
        message: "Message must not exceed 200 words",
      }
    ),
});
