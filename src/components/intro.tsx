"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function Intro() {
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block text-primary">{t("intro.hello")}</span>
          <span className="mt-2 block">Cauê Souza</span>
        </h1>
        <p className="mx-auto max-w-lg text-xl text-muted-foreground">{t("intro.description")}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <a href="#projects">{t("intro.viewWork")}</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#contact">{t("intro.getInTouch")}</a>
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10"
      >
        <a href="#about" className="flex flex-col items-center text-muted-foreground hover:text-primary">
          <span className="mb-2 text-sm">{t("intro.scrollDown")}</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}

