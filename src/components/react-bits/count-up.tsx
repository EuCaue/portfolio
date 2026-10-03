"use client";

// Adapted from React Bits "CountUp" (reactbits.dev): framer-motion instead of motion/react, a locale
// for number formatting, and the final value rendered on the server, so the number is right before
// JavaScript loads and for visitors who prefer reduced motion.
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type CountUpProps = { to: number; locale: string; duration?: number; className?: string };

export default function CountUp({ to, locale, duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = usePrefersReducedMotion();
  const value = useMotionValue(to);
  const spring = useSpring(value, { damping: 20 + 40 / duration, stiffness: 100 / duration });
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const format = useCallback(
    (n: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(n),
    [locale],
  );

  useEffect(() => {
    if (!inView || reduce) return;
    value.jump(0);
    spring.jump(0);
    value.set(to);
  }, [inView, reduce, to, value, spring]);

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = format(latest);
      }),
    [spring, format],
  );

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}
