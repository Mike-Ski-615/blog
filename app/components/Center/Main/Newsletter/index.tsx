import { useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  const intl = useIntl();
  const emailId = useId();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formSchema = z.object({
    email: z
      .string()
      .min(1, intl.formatMessage({ id: "newsletter.error.required" }))
      .email(intl.formatMessage({ id: "newsletter.error.invalid" })),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit() {
    setIsSubmitted(true);
    form.reset();
  }

  return (
    <>
      <div className="px-4 py-2 text-lg font-medium">
        {intl.formatMessage({ id: "newsletter.title" })}
      </div>
      <div className="double-divider" />

      <div className="bg-striped p-4 sm:p-8">
        <form
          noValidate
          aria-label={intl.formatMessage({ id: "newsletter.formLabel" })}
          className="grid w-full gap-3 sm:grid-cols-[minmax(0,1fr)_7.5rem] sm:items-start"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="min-w-0 gap-1"
              >
                <FieldLabel htmlFor={emailId} className="sr-only">
                  {intl.formatMessage({ id: "newsletter.emailLabel" })}
                </FieldLabel>

                <div className="w-full rounded-lg border border-border bg-background p-0.5">
                  <Input
                    {...field}
                    id={emailId}
                    type="email"
                    autoComplete="email"
                    placeholder={intl.formatMessage({
                      id: "newsletter.placeholder",
                    })}
                    aria-invalid={fieldState.invalid}
                    onChange={(event) => {
                      field.onChange(event);
                      setIsSubmitted(false);
                    }}
                    className="h-9.5 rounded-md border-border bg-background px-3 py-2 transition-all duration-300 placeholder:select-none autofill:shadow-[inset_0_0_0_1000px_var(--background)] autofill:[-webkit-text-fill-color:var(--foreground)]"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" className="h-10.5 w-full rounded-lg">
            {intl.formatMessage({ id: "newsletter.submit" })}
          </Button>
        </form>

        {isSubmitted && (
          <p className="mt-4 text-sm text-muted-foreground">
            {intl.formatMessage({ id: "newsletter.success" })}
          </p>
        )}
      </div>
    </>
  );
}
