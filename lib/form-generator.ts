import { type FormConfig } from "./types";

export const generateFormCode = (config: FormConfig): string => {
  const { fields, layout } = config;
  
  const imports = `"use client";
  
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";`;

  const schema = `const formSchema = z.object({
  ${fields.map(field => {
    let validation = 'z.string()';
    if (field.required) validation += '.min(1, "Required")';
    if (field.validation?.min) validation += `.min(${field.validation.min})`;
    if (field.validation?.max) validation += `.max(${field.validation.max})`;
    if (field.validation?.pattern) validation += `.regex(new RegExp("${field.validation.pattern}"))`;
    return `${field.name}: ${validation}`;
  }).join(',\n  ')}
});`;

  const component = `export function GeneratedForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        ${fields.map(field => generateFieldJSX(field, layout)).join('\n        ')}
        <div className={cn(
          "flex",
          "${layout === "horizontal" ? 'sm:ml-[33.333333%] sm:pl-4' : ''}"
        )}>
          <Button type="submit" className="w-full sm:w-auto">Submit</Button>
        </div>
      </form>
    </Form>
  );
}`;

  return [imports, schema, component].join('\n\n');
};

const generateFieldJSX = (field: FormConfig["fields"][0], layout: FormConfig["layout"]): string => {
  const baseField = `<FormField
  control={form.control}
  name="${field.name}"
  render={({ field }) => (
    <FormItem className={cn(
      "space-y-2 sm:space-y-3",
      "${layout === "horizontal" ? 'grid grid-cols-1 sm:grid-cols-3 sm:items-center sm:space-y-0 sm:gap-4' : ''}"
    )}>
      <FormLabel className={cn(
        "text-sm sm:text-base",
        "${layout === "horizontal" ? 'sm:text-right' : ''}"
      )}>${field.label}</FormLabel>
      <FormControl className="${layout === "horizontal" ? 'sm:col-span-2' : ''}">
        ${generateInputJSX(field)}
      </FormControl>
      <FormMessage className={cn(
        "text-xs sm:text-sm",
        "${layout === "horizontal" ? 'sm:col-start-2 sm:col-span-2' : ''}"
      )} />
    </FormItem>
  )}
/>`;

  return baseField;
};

const generateInputJSX = (field: FormConfig["fields"][0]): string => {
  switch (field.type) {
    case "textarea":
      return `<Textarea placeholder="${field.placeholder || ''}" {...field} className="min-h-[100px] text-sm sm:text-base" />`;
    case "select":
      return `<Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className="text-sm sm:text-base">
            <SelectValue placeholder="${field.placeholder || ''}" />
          </SelectTrigger>
          <SelectContent>
            ${field.options?.map(opt => 
              `<SelectItem value="${opt.value}" className="text-sm sm:text-base">${opt.label}</SelectItem>`
            ).join('\n            ')}
          </SelectContent>
        </Select>`;
    case "checkbox":
      return `<Checkbox checked={field.value} onCheckedChange={field.onChange} />`;
    case "radio":
      return `<RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-2">
          ${field.options?.map(opt => 
            `<div className="flex items-center space-x-2">
              <RadioGroupItem value="${opt.value}" />
              <span className="text-sm sm:text-base">${opt.label}</span>
            </div>`
          ).join('\n            ')}
        </RadioGroup>`;
    default:
      return `<Input type="${field.type}" placeholder="${field.placeholder || ''}" {...field} className="text-sm sm:text-base" />`;
  }
};