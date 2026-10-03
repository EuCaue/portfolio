"use client";

import { ArrowUpRight, FileDown, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "@/components/common/language-switcher";
import ThemeToggle from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const SECTIONS = ["projects", "about", "contact"] as const;
const EXTERNAL = [
  { key: "nav.blog", href: "https://blog.eucaue.online" },
  { key: "nav.links", href: "https://eucaue.online" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const active = useActiveSection([...SECTIONS]);

  // A hairline appears under the header once the top of the page scrolls away.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const links = SECTIONS.map((id) => (
    <a
      key={id}
      href={`#${id}`}
      aria-current={active === id ? "true" : undefined}
      onClick={() => setOpen(false)}
      className="relative rounded-md px-1 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground aria-[current=true]:text-foreground"
    >
      {t(`nav.${id}`)}
    </a>
  ));

  const external = EXTERNAL.map(({ key, href }) => (
    <a
      key={href}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 rounded-md px-1 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {t(key)}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  ));

  return (
    <>
      <div ref={sentinel} className="absolute left-0 top-0 h-px w-px" aria-hidden="true" />
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-background transition-colors duration-200",
          scrolled ? "border-border" : "border-transparent",
        )}
      >
        <div className="container flex h-16 items-center gap-6">
          <a href="#main" className="text-base font-semibold tracking-tight">
            Cauê Souza
          </a>

          <nav aria-label={t("nav.label.main")} className="hidden items-center gap-5 md:flex">
            {links}
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            {external}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              asChild
              className="ml-1 hidden gap-2 sm:inline-flex"
            >
              <a href={t("nav.resumeUrl")} target="_blank" rel="noopener noreferrer">
                <FileDown className="h-4 w-4" aria-hidden="true" />
                {t("nav.resume")}
              </a>
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("nav.menu")}
                  className="md:hidden"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="text-base">Cauê Souza</SheetTitle>
                <nav aria-label={t("nav.label.mobile")} className="mt-6 flex flex-col gap-1">
                  {links}
                  <span className="my-3 h-px bg-border" aria-hidden="true" />
                  {external}
                </nav>
                <Button variant="outline" asChild className="mt-6 w-full gap-2">
                  <a href={t("nav.resumeUrl")} target="_blank" rel="noopener noreferrer">
                    <FileDown className="h-4 w-4" aria-hidden="true" />
                    {t("nav.resume")}
                  </a>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
