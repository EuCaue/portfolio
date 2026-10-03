"use client";

import emailjs from "@emailjs/browser";
import { CheckCircle2, Github, Linkedin, Loader2, TriangleAlert } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import { z } from "zod";
import { CopyEmail } from "@/components/portfolio/copy-email";
import { Reveal } from "@/components/portfolio/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

  const field = (name: Field, input: (props: object) => React.ReactNode) => {
    const errorId = `${name}-error`;
    return (
      <div className="grid gap-2">
        <Label htmlFor={name}>{t(`contact.form.${name}`)}</Label>
        {input({
          id: name,
          name,
          placeholder: t(`contact.form.${name}Placeholder`),
          "aria-invalid": errors[name] ? true : undefined,
          "aria-describedby": errors[name] ? errorId : undefined,
          onBlur: (ev: { target: { value: string } }) =>
            errors[name] && validateField(name, ev.target.value),
          className: cn(errors[name] && "border-destructive focus-visible:ring-destructive"),
        })}
        {errors[name] && (
          <p id={errorId} className="text-xs font-medium text-destructive">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

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
            noValidate
            className="grid gap-5 rounded-xl border p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {field("name", (p) => (
                <Input type="text" autoComplete="name" {...p} />
              ))}
              {field("email", (p) => (
                <Input type="email" autoComplete="email" {...p} />
              ))}
            </div>
            {field("message", (p) => (
              <Textarea rows={6} className="resize-y" {...p} />
            ))}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={sending} className="gap-2 px-6">
                {sending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {sending ? t("contact.form.sending") : t("contact.form.submit")}
              </Button>
              <p role="status" aria-live="polite" className="text-sm">
                {status && (
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
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
