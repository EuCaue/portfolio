"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/language-context";

const THEMES = [
  { id: "light", icon: Sun },
  { id: "dark", icon: Moon },
  { id: "system", icon: Monitor },
] as const;

// Light, dark, or follow the system (the default). The trigger shows the current choice.
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // The stored theme is only known in the browser; until then show the default.
  const current = mounted ? (theme ?? "system") : "system";
  const Icon = THEMES.find((x) => x.id === current)?.icon ?? Monitor;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`${t("theme.toggle")}: ${t(`theme.${current}`)}`}
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuRadioGroup value={current} onValueChange={setTheme}>
          {THEMES.map(({ id, icon: ItemIcon }) => (
            <DropdownMenuRadioItem key={id} value={id} className="gap-2">
              <ItemIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {t(`theme.${id}`)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
