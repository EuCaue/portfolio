"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/language-context";
import { projects } from "@/data/projects";
import { PLATFORMS, type Platform, techOptions } from "@/lib/projects";
import type { UrlState } from "@/lib/url-state";
import { cn } from "@/lib/utils";

const TECH = techOptions(projects);
const ANY = "__any";

type Props = {
  state: UrlState;
  onChange: (patch: Partial<UrlState>) => void;
};

export function ProjectFilters({ state, onChange }: Props) {
  const { t } = useLanguage();
  const chip = (value: Platform | null, label: string, count: number) => {
    const pressed = state.platform === value;
    return (
      <button
        key={value ?? "all"}
        type="button"
        aria-pressed={pressed}
        onClick={() => onChange({ platform: value })}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors",
          pressed
            ? "border-primary bg-primary text-primary-foreground"
            : "bg-background text-foreground hover:bg-accent",
        )}
      >
        {label}
        <span className={cn("font-mono text-xs", pressed ? "opacity-70" : "text-muted-foreground")}>
          {count}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <fieldset className="flex flex-wrap gap-2">
        <legend className="sr-only">{t("filter.platform")}</legend>
        {chip(null, t("filter.all"), projects.length)}
        {PLATFORMS.map((p) =>
          chip(p, t(`platform.${p}`), projects.filter((x) => x.platform === p).length),
        )}
      </fieldset>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-9 justify-between gap-2 self-start rounded-full px-3.5 md:self-auto"
          >
            <span className="text-muted-foreground">{t("filter.tech")}:</span>
            <span>{state.tech ?? t("filter.anyTech")}</span>
            <ChevronDown className="h-4 w-4 opacity-60" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="max-h-80 w-60 overflow-y-auto">
          <DropdownMenuLabel>{t("filter.tech")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={state.tech ?? ANY}
            onValueChange={(v) => onChange({ tech: v === ANY ? null : v })}
          >
            <DropdownMenuRadioItem value={ANY}>{t("filter.anyTech")}</DropdownMenuRadioItem>
            {TECH.map(({ tag, count }) => (
              <DropdownMenuRadioItem key={tag} value={tag} className="justify-between">
                {tag}
                <span className="ml-auto font-mono text-xs text-muted-foreground">{count}</span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
