"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type BaseSyntheticEvent } from "react";
import { useForm, type Resolver } from "react-hook-form";

import Link from "next/link";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  inquirySchema,
  intentById,
  isStockBrief,
  projectIntents,
  type InquiryValues,
} from "@/lib/inquiry";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const controlClass =
  "h-11 rounded-md border-border bg-background px-3 text-base shadow-none md:text-sm";

const visitorError =
  "Something went wrong while sending your message. Please try again.";

function failureCopy(
  status: number,
  body: { message?: string; code?: string } | null,
) {
  if (body?.code === "not_configured" && body.message) return body.message;
  if (status === 429) {
    return "Please wait a moment before sending another message.";
  }
  return visitorError;
}

export function InquiryForm({
  id,
  variant,
  onSuccess,
}: {
  id: string;
  variant: "page" | "dialog";
  onSuccess?: () => void;
}) {
  const schema = useMemo(() => inquirySchema(variant), [variant]);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [intent, setIntent] = useState<string>(projectIntents[0].id);
  const successRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const form = useForm<InquiryValues>({
    resolver: zodResolver(schema) as Resolver<InquiryValues>,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      intent: projectIntents[0].id,
      message: projectIntents[0].brief,
    },
  });

  const errors = form.formState.errors;
  const submitting = form.formState.isSubmitting;

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  useEffect(() => {
    if (submitError) errorRef.current?.focus();
  }, [submitError]);

  function selectIntent(nextId: string) {
    const next = intentById(nextId);
    const current = form.getValues("message");
    setIntent(nextId);
    form.setValue("intent", nextId, {
      shouldValidate: form.formState.isSubmitted,
    });
    if (current.trim() === "" || isStockBrief(current)) {
      form.setValue("message", next.brief, {
        shouldValidate: form.formState.isSubmitted,
      });
    }
  }

  function sendAnother() {
    setSent(false);
    setSubmitError(null);
    setIntent(projectIntents[0].id);
    form.reset({
      name: "",
      email: "",
      phone: "",
      company: "",
      intent: projectIntents[0].id,
      message: projectIntents[0].brief,
    });
  }

  async function onSubmit(values: InquiryValues, event?: BaseSyntheticEvent) {
    const submittedForm = event?.target;
    if (!(submittedForm instanceof HTMLFormElement)) return;
    if (submittedForm.dataset.pending === "true") return;
    submittedForm.dataset.pending = "true";
    setSubmitError(null);

    const companyWebsite = submittedForm.elements.namedItem("company_website");
    const honeypot =
      companyWebsite instanceof HTMLInputElement ? companyWebsite.value : "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: values.company ?? "",
          intent: values.intent,
          message: values.message,
          company_website: honeypot,
        }),
      });

      const body = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
        code?: string;
      } | null;

      if (!response.ok || !body?.success) {
        setSubmitError(failureCopy(response.status, body));
        return;
      }

      setSent(true);
      onSuccess?.();
    } catch {
      setSubmitError(visitorError);
    } finally {
      submittedForm.dataset.pending = "false";
    }
  }

  if (sent) {
    return (
      <div role="status" className="border border-border bg-muted/40 p-6 sm:p-7">
        <Eyebrow>Request sent</Eyebrow>
        <h2
          ref={successRef}
          tabIndex={-1}
          className="mt-3 text-xl font-semibold tracking-tight outline-none"
        >
          Message sent successfully.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out. We&apos;ll be in touch.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We reply {site.responseTime.toLowerCase()}.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-md px-5"
            onClick={sendAnother}
          >
            Send another request
          </Button>
          {variant === "page" ? (
            <a
              href={site.phoneHref}
              className="inline-flex h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-medium hover:bg-muted"
            >
              Call {site.phone}
            </a>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <form
      id={id}
      className={variant === "dialog" ? "space-y-3" : "space-y-5"}
      noValidate
      aria-busy={submitting || undefined}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${id}-company-website`}>Website</label>
        <input
          id={`${id}-company-website`}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <input type="hidden" {...form.register("intent")} />

      <fieldset
        aria-describedby={errors.intent ? `${id}-intent-error` : undefined}
      >
        <legend className="text-sm font-medium">What you need</legend>
        <div
          className={cn(
            "mt-2.5 grid gap-px border border-border bg-border",
            variant === "dialog" ? "grid-cols-2" : "sm:grid-cols-2",
          )}
        >
          {projectIntents.map((item) => {
            const selected = intent === item.id;
            return (
              <label
                key={item.id}
                className={cn(
                  "cursor-pointer px-3 py-3 transition-colors",
                  selected
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground hover:bg-muted/70",
                )}
              >
                <input
                  type="radio"
                  name={`${id}-intent`}
                  value={item.id}
                  checked={selected}
                  onChange={() => selectIntent(item.id)}
                  className="sr-only"
                />
                <span className="block text-sm font-medium leading-snug">
                  {item.label}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-xs leading-relaxed",
                    selected ? "text-background/70" : "text-muted-foreground",
                  )}
                >
                  {item.hint}
                </span>
              </label>
            );
          })}
        </div>
        {errors.intent ? (
          <p id={`${id}-intent-error`} className="mt-2 text-sm text-destructive">
            {errors.intent.message}
          </p>
        ) : null}
      </fieldset>

      <div
        className={cn(
          "grid gap-4",
          variant === "page" && "sm:grid-cols-2 sm:gap-5",
          variant === "dialog" && "hidden",
        )}
      >
        <label className="block space-y-2" htmlFor={`${id}-name`}>
          <span className="text-sm font-medium">
            Name
            {variant === "page" ? (
              <span className="text-muted-foreground"> *</span>
            ) : null}
          </span>
          <Input
            id={`${id}-name`}
            className={controlClass}
            autoComplete="name"
            placeholder="Your name"
            aria-required={variant === "page" ? true : undefined}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            {...form.register("name")}
          />
          {errors.name ? (
            <span id={`${id}-name-error`} className="block text-sm text-destructive">
              {errors.name.message}
            </span>
          ) : null}
        </label>

        {variant === "page" ? (
          <label className="block space-y-2" htmlFor={`${id}-company`}>
            <span className="text-sm font-medium">
              Company
              <span className="font-normal text-muted-foreground">
                {" "}
                (optional)
              </span>
            </span>
            <Input
              id={`${id}-company`}
              className={controlClass}
              autoComplete="organization"
              placeholder="Company name"
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={errors.company ? `${id}-company-error` : undefined}
              {...form.register("company")}
            />
            {errors.company ? (
              <span
                id={`${id}-company-error`}
                className="block text-sm text-destructive"
              >
                {errors.company.message}
              </span>
            ) : null}
          </label>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <label className="block space-y-2" htmlFor={`${id}-email`}>
          <span className="text-sm font-medium">
            Email <span className="text-muted-foreground">*</span>
          </span>
          <Input
            id={`${id}-email`}
            className={controlClass}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            {...form.register("email")}
          />
          {errors.email ? (
            <span id={`${id}-email-error`} className="block text-sm text-destructive">
              {errors.email.message}
            </span>
          ) : null}
        </label>
        <label className="block space-y-2" htmlFor={`${id}-phone`}>
          <span className="text-sm font-medium">
            Phone <span className="text-muted-foreground">*</span>
          </span>
          <Input
            id={`${id}-phone`}
            className={controlClass}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-required
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
            {...form.register("phone")}
          />
          {errors.phone ? (
            <span id={`${id}-phone-error`} className="block text-sm text-destructive">
              {errors.phone.message}
            </span>
          ) : null}
        </label>
      </div>

      <label className="block space-y-2" htmlFor={`${id}-message`}>
        <span className="text-sm font-medium">
          Request <span className="text-muted-foreground">*</span>
        </span>
        <Textarea
          id={`${id}-message`}
          className={cn(
            "rounded-md border-border bg-background px-3 py-3 text-base shadow-none md:text-sm",
            variant === "dialog" ? "min-h-20" : "min-h-28",
          )}
          aria-required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            [
              variant === "page" ? `${id}-message-hint` : null,
              errors.message ? `${id}-message-error` : null,
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          {...form.register("message")}
        />
        {variant === "page" ? (
          <span
            id={`${id}-message-hint`}
            className="block text-sm leading-relaxed text-muted-foreground"
          >
            The note matches the option you chose. Edit it with anything we
            should know.
          </span>
        ) : null}
        {errors.message ? (
          <span id={`${id}-message-error`} className="block text-sm text-destructive">
            {errors.message.message}
          </span>
        ) : null}
      </label>

      <p className="sr-only" aria-live="polite">
        {submitting ? "Sending your request." : ""}
      </p>

      {submitError ? (
        <p
          ref={errorRef}
          id={`${id}-submit-error`}
          tabIndex={-1}
          role="alert"
          className="text-sm leading-relaxed text-destructive outline-none"
        >
          {submitError}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          className="h-11 rounded-md px-5"
          disabled={submitting}
          aria-busy={submitting || undefined}
          aria-describedby={submitError ? `${id}-submit-error` : undefined}
        >
          {submitting ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden="true" />
              Sending request
            </>
          ) : (
            "Send request"
          )}
        </Button>
        {variant === "dialog" ? (
          <Link
            href="/start"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Open the full brief
          </Link>
        ) : (
          <a
            href={site.phoneHref}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Or call {site.phone}
          </a>
        )}
      </div>
    </form>
  );
}
