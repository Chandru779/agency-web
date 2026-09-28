"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";

import Link from "next/link";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  inquiryMailto,
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
  const [submitted, setSubmitted] = useState<InquiryValues | null>(null);
  const [intent, setIntent] = useState<string>(projectIntents[0].id);
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

  function onSubmit(values: InquiryValues) {
    const link = document.createElement("a");
    link.href = inquiryMailto(values);
    link.click();
    setSubmitted(values);
    onSuccess?.();
  }

  if (submitted) {
    const chosen = intentById(submitted.intent);
    return (
      <div className="border border-border bg-muted/40 p-6 sm:p-7">
        <Eyebrow>Request ready</Eyebrow>
        <p className="mt-3 text-xl font-semibold tracking-tight">
          Send the email that just opened.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          It is addressed to {site.email}
          {submitted.phone ? ` and includes ${submitted.phone}` : ""}. We reply{" "}
          {site.responseTime.toLowerCase()}.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          {chosen.label}. {submitted.message}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={inquiryMailto(submitted)}
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
          >
            Open the email again
          </a>
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
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <input type="hidden" {...form.register("intent")} />

      <fieldset>
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
          <p className="mt-2 text-sm text-destructive">{errors.intent.message}</p>
        ) : null}
      </fieldset>

      <div
        className={cn(
          "grid gap-4",
          variant === "page" && "sm:grid-cols-2 sm:gap-5",
          variant === "dialog" && "hidden",
        )}
      >
        <label className="block space-y-2">
          <span className="text-sm font-medium">
            Name
            {variant === "page" ? (
              <span className="text-muted-foreground"> *</span>
            ) : null}
          </span>
          <Input
            className={controlClass}
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            {...form.register("name")}
          />
          {errors.name ? (
            <span className="block text-sm text-destructive">
              {errors.name.message}
            </span>
          ) : null}
        </label>

        {variant === "page" ? (
          <label className="block space-y-2">
            <span className="text-sm font-medium">
              Company
              <span className="font-normal text-muted-foreground">
                {" "}
                (optional)
              </span>
            </span>
            <Input
              className={controlClass}
              autoComplete="organization"
              placeholder="Company name"
              {...form.register("company")}
            />
          </label>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium">
            Email <span className="text-muted-foreground">*</span>
          </span>
          <Input
            className={controlClass}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={errors.email ? true : undefined}
            {...form.register("email")}
          />
          {errors.email ? (
            <span className="block text-sm text-destructive">
              {errors.email.message}
            </span>
          ) : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">
            Phone <span className="text-muted-foreground">*</span>
          </span>
          <Input
            className={controlClass}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={errors.phone ? true : undefined}
            {...form.register("phone")}
          />
          {errors.phone ? (
            <span className="block text-sm text-destructive">
              {errors.phone.message}
            </span>
          ) : null}
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium">
          Request <span className="text-muted-foreground">*</span>
        </span>
        <Textarea
          className={cn(
            "rounded-md border-border bg-background px-3 py-3 text-base shadow-none md:text-sm",
            variant === "dialog" ? "min-h-20" : "min-h-28",
          )}
          aria-invalid={errors.message ? true : undefined}
          {...form.register("message")}
        />
        {variant === "page" ? (
          <span className="block text-sm leading-relaxed text-muted-foreground">
            The note matches the option you chose. Edit it with anything we
            should know.
          </span>
        ) : null}
        {errors.message ? (
          <span className="block text-sm text-destructive">
            {errors.message.message}
          </span>
        ) : null}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" className="h-11 rounded-md px-5">
          Send request
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
