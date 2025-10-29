import { z } from "zod";

export const itemSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, { message: "Title is required" })
      .max(26, { message: "Title must be at most 26 characters" }),

    subtitle: z
      .string()
      .trim()
      .min(1, { message: "Subtitle is required" })
      .max(260, { message: "Subtitle must be at most 260 characters" }),

    dueDate: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),

    priority: z.enum(["low", "medium", "high"]).optional(),
  })

  .refine((data) => data.title && data.subtitle, {
    message: "Both title and subtitle are required.",
    path: ["subtitle"],
  });

export type ItemFormData = z.infer<typeof itemSchema>;
