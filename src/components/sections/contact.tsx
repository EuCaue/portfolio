"use client";

import emailjs from "@emailjs/browser";
import { CheckCircle2, Github, Linkedin, Loader2, Send, TriangleAlert } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { CopyEmail } from "@/components/portfolio/copy-email";
import { Reveal } from "@/components/portfolio/reveal";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = { type: "success" | "error"; message: string } | null;

const FIELDS: Field[] = ["name", "email", "message"];

export default function Contact() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);
  const [modKey, setModKey] = useState("Ctrl");

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setModKey("⌘");
  }, []);

  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(2, { message: t("contact.form.error.name") }),
    email: z
      .string()
      .trim()
      .email({ message: t("contact.form.error.email") }),
    message: z
      .string()
      .trim()
      .min(10, { message: t("contact.form.error.message") }),
  });

  const validateField = (field: Field, value: string) => {
    const result = schema.shape[field].safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.errors[0].message,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")) return; // honeypot: bots fill hidden fields

    const values = Object.fromEntries(FIELDS.map((f) => [f, String(data.get(f) ?? "")]));
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Errors = {};
      for (const err of result.error.errors) {
        const f = err.path[0] as Field;
        next[f] ??= err.message;
      }
      setErrors(next);
      setStatus(null);
      const first = FIELDS.find((f) => next[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus(null);
    setSending(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        result.data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      );
      formRef.current?.reset();
      setStatus({ type: "success", message: t("contact.form.success") });
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus({ type: "error", message: t("contact.form.error") });
    } finally {
      setSending(false);
    }
  };

  // Field rows of a mail composer: label on the left, borderless input, error under it.
  const inputProps = (name: Field) => ({
    id: name,
    name,
    placeholder: t(`contact.form.${name}Placeholder`),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onBlur: (ev: { target: { value: string } }) =>
      errors[name] && validateField(name, ev.target.value),
  });
  const error = (name: Field) =>
    errors[name] && (
      <p id={`${name}-error`} className="text-xs font-medium text-destructive">
        {errors[name]}
      </p>
    );
  // Focus shows as a tinted row with a 2px underline, since the inputs themselves have no border.
  const row =
    "transition-[background-color,box-shadow] focus-within:bg-muted/40 focus-within:shadow-[inset_0_-2px_0_hsl(var(--foreground))]";
  const bare =
    "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/80 focus-visible:outline-none";

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t py-20 md:py-24">
      <div className="container grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div>
          <h2 id="contact-title" className="text-3xl font-semibold tracking-[-0.03em]">
            {t("contact.title")}
          </h2>
          <p className="mt-4 max-w-[42ch] leading-relaxed text-muted-foreground">
            {t("contact.subtitle")}
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li>
              <CopyEmail />
            </li>
            <li>
              <a
                href="https://github.com/EuCaue"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-1 transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                github.com/EuCaue
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/caue-souza"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-1 transition-colors hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                linkedin.com/in/caue-souza
              </a>
            </li>
          </ul>
        </div>

        <Reveal>
          <form
            ref={formRef}
            onSubmit={onSubmit}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") formRef.current?.requestSubmit();
            }}
            noValidate
            aria-labelledby="composer-title"
            className="relative overflow-hidden rounded-2xl border bg-card shadow-[0_24px_48px_-32px_rgb(0_0_0/0.35)]"
          >
            <div className="flex items-center justify-between gap-4 border-b px-5 py-3">
              <p id="composer-title" className="text-sm font-medium">
                {t("contact.form.newMessage")}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {t("contact.form.to")} <span className="text-foreground">Cauê Souza</span>
              </p>
            </div>

            {(["name", "email"] as const).map((name) => (
              <div key={name} className={cn("border-b px-5", row)}>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor={name}
                    className={cn(
                      "w-16 shrink-0 text-sm text-muted-foreground",
                      errors[name] && "text-destructive",
                    )}
                  >
                    {t(`contact.form.${name}`)}
                  </label>
                  <input
                    type={name === "email" ? "email" : "text"}
                    autoComplete={name}
                    className={cn(bare, "h-12")}
                    {...inputProps(name)}
                  />
                </div>
                {errors[name] && <div className="pb-2 pl-20">{error(name)}</div>}
              </div>
            ))}

            <div className={cn("px-5 pb-2 pt-4", row)}>
              <label
                htmlFor="message"
                className={cn(
                  "text-sm text-muted-foreground",
                  errors.message && "text-destructive",
                )}
              >
                {t("contact.form.message")}
              </label>
              <textarea
                rows={7}
                className={cn(bare, "mt-2 block min-h-40 resize-y leading-relaxed")}
                {...inputProps("message")}
              />
              {error("message")}
            </div>

            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 px-5 py-3">
              <p role="status" aria-live="polite" className="min-h-5 text-sm">
                {status ? (
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 font-medium",
                      status.type === "success" ? "text-success" : "text-destructive",
                    )}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <TriangleAlert className="h-4 w-4" aria-hidden="true" />
                    )}
                    {status.message}
                  </span>
                ) : (
                  <span className="hidden text-xs text-muted-foreground sm:inline">
                    <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono text-[11px]">
                      {modKey}
                    </kbd>{" "}
                    +{" "}
                    <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono text-[11px]">
                      Enter
                    </kbd>{" "}
                    {t("contact.form.shortcut")}
                  </span>
                )}
              </p>
              <Button type="submit" disabled={sending} className="gap-2 px-5">
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
                {sending ? t("contact.form.sending") : t("contact.form.submit")}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
