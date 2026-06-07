"use client";

import { FileDown, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/common/language-switcher";
import ThemeToggle from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import { useMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const isMobile = useMobile();

  const navItems = [
    { name: t("nav.home"), href: "#" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="#" className="text-xl font-bold">
            Cauê Souza
          </Link>

          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button variant="outline" size="sm" asChild className="gap-2">
                <a href={t("nav.resumeUrl")} target="_blank" rel="noopener noreferrer">
                  <FileDown className="h-4 w-4" />
                  {t("nav.resume")}
                </a>
              </Button>
            </div>
          </nav>

          {isMobile && (
            <div className="flex items-center md:hidden">
              <LanguageSwitcher />
              <ThemeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                  <div className="flex flex-col space-y-4 py-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium transition-colors hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full gap-2 justify-center mt-4"
                    >
                      <a
                        href={t("nav.resumeUrl")}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                      >
                        <FileDown className="h-4 w-4" />
                        {t("nav.resume")}
                      </a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
