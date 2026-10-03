"use client";

import { Code2, Hand, LayoutTemplate, type LucideIcon, Server, Wrench } from "lucide-react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/portfolio/reveal";
import Stack, { type StackHandle } from "@/components/react-bits/stack";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { type SkillGroup, skillsData } from "@/data/skills";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { fill } from "@/lib/format";

const ICONS: Record<string, LucideIcon> = {
  "skills.languages": Code2,
  "skills.frontend": LayoutTemplate,
  "skills.desktopBackend": Server,
  "skills.tools": Wrench,
};

function SkillCard({ group }: { group: SkillGroup }) {
  const { t } = useLanguage();
  const Icon = ICONS[group.categoryKey] ?? Code2;
  return (
    <div className="flex h-full select-none flex-col rounded-2xl border bg-card p-6 shadow-[0_12px_32px_-16px_rgb(0_0_0/0.25)]">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h4 className="font-semibold tracking-tight">{t(group.categoryKey)}</h4>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li key={item} className="rounded-full border px-3 py-1 text-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const reduce = usePrefersReducedMotion();
  const stack = useRef<StackHandle>(null);
  const [top, setTop] = useState(skillsData[0].categoryKey);
  const position = skillsData.findIndex((g) => g.categoryKey === top) + 1;
  // The stack shows its last card on top, so feed it in reverse to start with the first group.
  const cards = [...skillsData].reverse().map((group) => ({
    id: group.categoryKey,
    content: <SkillCard group={group} />,
  }));

  return (
    <section id="about" aria-labelledby="about-title" className="border-t py-20 md:py-24">
      <div className="container grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,400px)] md:gap-16">
        <div>
          <h2 id="about-title" className="text-3xl font-semibold tracking-[-0.03em]">
            {t("about.title")}
          </h2>
          <div className="mt-6 max-w-[62ch] space-y-4 leading-relaxed text-muted-foreground">
            <p>{t("about.paragraph1")}</p>
            <p>{t("about.paragraph2")}</p>
          </div>
        </div>

        <Reveal>
          <h3 className="text-sm font-medium text-muted-foreground">{t("about.stack.title")}</h3>
          {reduce ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              {skillsData.map((group) => (
                <SkillCard key={group.categoryKey} group={group} />
              ))}
            </div>
          ) : (
            <>
              <ul className="sr-only">
                {skillsData.map((group) => (
                  <li key={group.categoryKey}>
                    {t(group.categoryKey)}: {group.items.join(", ")}
                  </li>
                ))}
              </ul>
              <div aria-hidden="true" className="mt-6 h-64 w-[calc(100%-2.5rem)] max-w-sm">
                <Stack ref={stack} cards={cards} onChange={setTop} />
              </div>
              <div className="mt-10 flex max-w-sm items-center justify-between gap-4">
                <p className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Hand className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {t("about.stack.hint")}
                </p>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground" aria-hidden="true">
                    {position}/{skillsData.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => stack.current?.next()}
                    aria-label={`${t("about.stack.next")}. ${fill(t("about.stack.position"), { index: position, total: skillsData.length })}`}
                  >
                    {t("about.stack.next")}
                  </Button>
                </div>
              </div>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
