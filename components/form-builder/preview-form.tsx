"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { type FormField as IFormField, type FormConfig } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PreviewFormProps {
  config: FormConfig;
}

const widthClasses = {
  full: "col-span-12",
  half: "col-span-12 sm:col-span-6",
  third: "col-span-12 sm:col-span-4"
} as const;

export function PreviewForm({ config }: PreviewFormProps) {
  const { fields, layout } = config;

  const formSchema = z.object(
    fields.reduce<z.ZodRawShape>((acc, field) => {
      let validation = z.string();
      if (field.required) validation = validation.min(1, "Required");
      if (field.validation?.min) validation = validation.min(field.validation.min);
      if (field.validation?.max) validation = validation.max(field.validation.max);
      if (field.validation?.pattern) validation = validation.regex(new RegExp(field.validation.pattern));
      return { ...acc, [field.name]: validation };
    }, {})
  );

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  const renderField = (field: IFormField) => {
    const isInline = layout === "inline";

    return (
      <div key={field.name} className={cn(
        isInline && widthClasses[field.width],
        "px-2"
      )}>
        <FormField
          control={form.control}
          name={field.name}
          render={({ field: formField }) => (
            <FormItem className={cn(
              "space-y-2",
              layout === "horizontal" && "grid grid-cols-1 sm:grid-cols-3 sm:items-center sm:space-y-0 sm:gap-4"
            )}>
              <FormLabel className={cn(
                "text-sm sm:text-base font-medium",
                layout === "horizontal" && "sm:text-right"
              )}>
                {field.label}
              </FormLabel>
              <FormControl className={layout === "horizontal" ? "sm:col-span-2" : undefined}>
                {(() => {
                  switch (field.type) {
                    case "textarea":
                      return (
                        <Textarea
                          placeholder={field.placeholder}
                          {...formField}
                          className="min-h-[100px] text-sm sm:text-base resize-y"
                        />
                      );
                    case "select":
                      return (
                        <Select onValueChange={formField.onChange} value={formField.value}>
                          <SelectTrigger className="text-sm sm:text-base">
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value} className="text-sm sm:text-base">
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      );
                    case "checkbox":
                      return (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formField.value}
                            onCheckedChange={formField.onChange}
                          />
                          <span className="text-sm sm:text-base">{field.label}</span>
                        </div>
                      );
                    case "radio":
                      return (
                        <RadioGroup
                          onValueChange={formField.onChange}
                          value={formField.value}
                          className="space-y-2"
                        >
                          {field.options?.map((opt) => (
                            <div key={opt.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={opt.value} />
                              <span className="text-sm sm:text-base">{opt.label}</span>
                            </div>
                          ))}
                        </RadioGroup>
                      );
                    default:
                      return (
                        <Input
                          type={field.type}
                          placeholder={field.placeholder}
                          {...formField}
                          className="text-sm sm:text-base"
                        />
                      );
                  }
                })()}
              </FormControl>
              <FormMessage className={cn(
                "text-xs sm:text-sm",
                layout === "horizontal" && "sm:col-start-2 sm:col-span-2"
              )} />
            </FormItem>
          )}
        />
      </div>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className={cn(
          "grid grid-cols-12 gap-4 -mx-2",
          layout !== "inline" && "grid-cols-1"
        )}>
          {fields.map(renderField)}
        </div>
        <div className={cn(
          "flex justify-start px-2",
          layout === "horizontal" && "sm:ml-[33.333333%] sm:pl-4"
        )}>
          <Button type="submit" className="w-full sm:w-auto">Submit</Button>
        </div>
      </form>
    </Form>
  );
}