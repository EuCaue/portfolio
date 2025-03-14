"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { Code, Palette, Terminal, Layers, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";

export default function About() {
  const { t } = useLanguage();
  const [visualOption, setVisualOption] = useState(0);
  const [mounted, setMounted] = useState(false);

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "UI/UX Design",
    "Accessibility",
  ];

  useEffect(() => {
    const randomOption = Math.floor(Math.random() * 4) + 1;
    setVisualOption(randomOption);
    setMounted(true);
  }, []);

  // Don't render any visual until after mount to prevent hydration mismatch
  if (!mounted) {
    return (
      <section id="about" className="py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("about.title")}
          </h2>
          <div className="mt-1 h-1 w-12 bg-primary mx-auto"></div>
        </div>
        <div className="mt-8">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="aspect-square overflow-hidden rounded-lg bg-muted"></div>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed">
                    {t("about.paragraph1")}
                  </p>
                  <p className="text-lg leading-relaxed">
                    {t("about.paragraph2")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("about.title")}
          </h2>
          <div className="mt-1 h-1 w-12 bg-primary mx-auto"></div>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              {/* Option 1: Tech Icon Grid */}
              {visualOption === 1 && (
                <div className="aspect-square overflow-hidden rounded-lg bg-muted flex items-center justify-center p-8">
                  <div className="grid grid-cols-2 gap-6 w-full h-full">
                    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4">
                      <Code className="h-12 w-12 text-primary mb-2" />
                      <span className="text-sm font-medium">Development</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4">
                      <Terminal className="h-12 w-12 text-primary mb-2" />
                      <span className="text-sm font-medium">CLI Tools</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4">
                      <Palette className="h-12 w-12 text-primary mb-2" />
                      <span className="text-sm font-medium">Design</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4">
                      <Layers className="h-12 w-12 text-primary mb-2" />
                      <span className="text-sm font-medium">Architecture</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Option 2: Code Snippet */}
              {visualOption === 2 && (
                <div className="aspect-square overflow-hidden rounded-lg bg-muted flex items-center justify-center p-4">
                  <pre className="text-xs sm:text-sm md:text-base overflow-hidden font-mono">
                    <code className="language-typescript">
                      {`function Developer() {
  const [skills, setSkills] = useState([
    'TypeScript',
    'React',
    'Node.js'
  ]);
  
  useEffect(() => {
    learnNewSkills();
  }, [curiosity]);
  
  return (
    <Person
      passionate={true}
      problemSolver={true}
      continuousLearner={true}
    />
  );
}`}
                    </code>
                  </pre>
                </div>
              )}

              {/* Option 3: Abstract Visualization */}
              {visualOption === 3 && (
                <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary/30 animate-pulse"></div>
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-secondary/40 animate-bounce"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-accent/30 animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <Lightbulb className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                </div>
              )}

              {/* Option 4: Tech Word Cloud */}
              {visualOption === 4 && (
                <div className="aspect-square overflow-hidden rounded-lg bg-muted flex items-center justify-center p-4">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <span className="absolute top-1/4 left-1/4 text-2xl font-bold text-primary/80">
                      React
                    </span>
                    <span className="absolute top-1/3 right-1/4 text-xl font-bold text-primary/70">
                      TypeScript
                    </span>
                    <span className="absolute bottom-1/4 left-1/3 text-lg font-bold text-primary/60">
                      Node.js
                    </span>
                    <span className="absolute top-1/2 right-1/3 text-xl font-bold text-primary/70">
                      Next.js
                    </span>
                    <span className="absolute bottom-1/3 right-1/5 text-lg font-bold text-primary/60">
                      Git
                    </span>
                    <span className="absolute top-2/3 left-1/5 text-base font-bold text-primary/50">
                      Linux
                    </span>
                    <span className="absolute bottom-1/5 right-1/2 text-lg font-bold text-primary/60">
                      Python
                    </span>
                    <span className="absolute top-1/5 right-1/3 text-base font-bold text-primary/50">
                      CSS
                    </span>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-primary">
                      Developer
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  {t("about.paragraph1")}
                </p>
                <p className="text-lg leading-relaxed">
                  {t("about.paragraph2")}
                </p>
                <div className="pt-4">
                  <h3 className="text-xl font-semibold mb-3">
                    {t("about.skills")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-secondary px-3 py-1 text-sm"
                      >
                        {skill}
                      </span>
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
