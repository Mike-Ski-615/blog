import { useId, useState, type FormEvent } from "react";
import SectionHeader from "@/components/Center/SectionHeader";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  const {
    home: { newsletter },
  } = useSiteContent();
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (value: string) => {
    const nextEmail = value.trim();

    if (!nextEmail) {
      return newsletter.errors.required;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      return newsletter.errors.invalid;
    }

    return "";
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextError = validateEmail(email);
    setError(nextError);

    if (nextError) {
      setIsSubmitted(false);
      return;
    }

    setEmail("");
    setIsSubmitted(true);
  };

  return (
    <>
      <SectionHeader>{newsletter.title}</SectionHeader>

      <div className="bg-striped p-4  sm:p-8">
        <form
          noValidate
          aria-label={newsletter.formLabel}
          className="grid w-full gap-4 sm:grid-cols-[minmax(0,1fr)_8.5rem] sm:items-start"
          onSubmit={onSubmit}
        >
          <Field
            data-invalid={error ? true : undefined}
            className="min-w-0 gap-1"
          >
            <FieldLabel htmlFor={emailId} className="sr-only">
              {newsletter.emailLabel}
            </FieldLabel>

            <div className="rounded-xl border border-border/70 bg-background/85 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <Input
                id={emailId}
                type="email"
                autoComplete="email"
                value={email}
                placeholder={newsletter.placeholder}
                aria-invalid={Boolean(error)}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                  setIsSubmitted(false);
                }}
                className="h-10.5 rounded-lg border-border bg-background transition-all duration-300 placeholder:select-none autofill:shadow-[inset_0_0_0_1000px_var(--background)] autofill:[-webkit-text-fill-color:var(--foreground)]"
              />
            </div>

            {error ? <FieldError>{error}</FieldError> : null}
          </Field>

          <Button type="submit" className=" h-10.5 w-full rounded-xl">
            {newsletter.submitLabel}
          </Button>
        </form>

        {isSubmitted && (
          <p className=" mt-4 text-[0.8rem] text-muted-foreground">
            {newsletter.successMessage}
          </p>
        )}
      </div>
    </>
  );
}
