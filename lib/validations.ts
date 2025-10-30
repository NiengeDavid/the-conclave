import { z } from "zod"

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+234\d{10}$/, "Phone must be in format +234XXXXXXXXXX"),
  title: z.string().min(2, "Title is required"),
  ministry: z.string().min(2, "Ministry/Center name is required"),
  arrivalDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid arrival date",
  }),
  departureDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid departure date",
  }),
  accommodation: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Please select accommodation preference" }),
  }),
  feeding: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Please select feeding preference" }),
  }),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
