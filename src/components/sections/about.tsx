"use client";

import { motion } from "framer-motion";
import { Code, Layers, Palette, Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { skillsData } from "@/data/skills";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("about.title")}</h2>
          <div className="mt-1 h-1 w-12 bg-primary mx-auto"></div>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="grid gap-8 md:grid-cols-2 items-start">
              <div className="md:sticky md:top-20">
                <div className="aspect-square overflow-hidden rounded-lg bg-muted flex items-center justify-center p-8">
                  <div className="grid grid-cols-2 gap-6 w-full h-full">
                    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4">
                      <Code className="h-12 w-12 text-primary mb-2" />
                      <span className="text-sm font-medium">{t("about.visual.development")}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4">
                      <Terminal className="h-12 w-12 text-primary mb-2" />
                      <span className="text-sm font-medium">{t("about.visual.cli")}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4">
                      <Palette className="h-12 w-12 text-primary mb-2" />
                      <span className="text-sm font-medium">{t("about.visual.design")}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4">
                      <Layers className="h-12 w-12 text-primary mb-2" />
                      <span className="text-sm font-medium">{t("about.visual.architecture")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg leading-relaxed">{t("about.paragraph1")}</p>
                <p className="text-lg leading-relaxed">{t("about.paragraph2")}</p>
                <div className="pt-4 border-t border-border">
                  <h3 className="text-xl font-semibold mb-4">{t("about.skills")}</h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {skillsData.map((group) => (
                      <div key={group.categoryKey} className="space-y-2">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {t(group.categoryKey)}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {group.items.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
