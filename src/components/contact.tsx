"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Linkedin, Github, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const message = formData.get("message") as string;

      const result = formSchema.safeParse({ name, email, message });

      if (!result.success) {
        const errorMessage = result.error.errors
          .map((err) => err.message)
          .join(", ");
        showToast(errorMessage, "error");
        setIsSubmitting(false);
        return;
      }

      console.log(name, email, message);
      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: name,
          email: email,
          message: message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      // Reset form and show success message
      formRef.current?.reset();
      showToast(
        "Your message has been sent! I'll get back to you soon.",
        "success",
      );
    } catch (error) {
      console.error("Error sending email:", error);
      showToast(
        "Failed to send your message. Please try again later.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <ToastProvider>
        {toast && (
          <Toast
            className={cn(
              "border-2",
              toast.type === "success" &&
                "bg-green-50 border-green-500 dark:bg-green-950 dark:border-green-500 dark:text-green-50",
              toast.type === "error" &&
                "bg-red-50 border-red-500 dark:bg-red-950 dark:border-red-500 dark:text-red-50",
              toast.type === "info" &&
                "bg-blue-50 border-blue-500 dark:bg-blue-950 dark:border-blue-500 dark:text-blue-50",
            )}
          >
            <ToastTitle>
              {toast.type === "success"
                ? "Success"
                : toast.type === "error"
                  ? "Error"
                  : "Info"}
            </ToastTitle>
            <ToastDescription>{toast.message}</ToastDescription>
          </Toast>
        )}
        <ToastViewport />
      </ToastProvider>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("contact.title")}
          </h2>
          <div className="mt-1 h-1 w-12 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("contact.info.title")}</CardTitle>
              <CardDescription>{t("contact.info.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{t("contact.info.email")}</h3>
                  <a
                    href="mailto:souzacaue@proton.me"
                    className="text-muted-foreground hover:text-primary"
                  >
                    souzacaue@proton.me
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Linkedin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">LinkedIn</h3>
                  <a
                    href="https://linkedin.com/in/caue-souza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    linkedin.com/in/caue-souza
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">GitHub</h3>
                  <a
                    href="https://github.com/EuCaue"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    github.com/EuCaue
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("contact.form.title")}</CardTitle>
              <CardDescription>{t("contact.form.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.form.name")}</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t("contact.form.namePlaceholder")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.form.email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("contact.form.emailPlaceholder")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.form.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t("contact.form.messagePlaceholder")}
                    rows={5}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    t("contact.form.submit")
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
