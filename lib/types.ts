import { z } from "zod";

export const formFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(["text", "email", "number", "textarea", "select", "checkbox", "radio"]),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional(),
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional()
  }).optional(),
  width: z.enum(["full", "half", "third"]).default("full")
});

export const formConfigSchema = z.object({
  fields: z.array(formFieldSchema),
  layout: z.enum(["vertical", "horizontal", "inline"]).default("vertical")
});

export type FormField = z.infer<typeof formFieldSchema>;
export type FormConfig = z.infer<typeof formConfigSchema>;
export const formSchema = formConfigSchema;