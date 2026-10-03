"use client";

// Adapted from React Bits "BlurText" (reactbits.dev): framer-motion instead of motion/react,
// words only, hidden from assistive tech (the parent carries the real text), static under reduced motion.
import { motion, useReducedMotion } from "framer-motion";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  stepDuration?: number;
};

const FROM = { filter: "blur(10px)", opacity: 0, y: -24 };
const TO = {
  filter: ["blur(10px)", "blur(4px)", "blur(0px)"],
  opacity: [0, 0.6, 1],
  y: [-24, 4, 0],
};

export default function BlurText({
  text,
  className,
  delay = 120,
  stepDuration = 0.35,
}: BlurTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <span aria-hidden="true" className={className}>
        {text}
      </span>
    );
  }

  return (
    <span aria-hidden="true" className={className}>
      {words.map((word, index) => (
        <motion.span
          // biome-ignore lint/suspicious/noArrayIndexKey: words can repeat, order never changes
          key={index}
          className="inline-block will-change-[transform,filter,opacity]"
          initial={FROM}
          animate={TO}
          transition={{
            duration: stepDuration * 2,
            times: [0, 0.5, 1],
            delay: (index * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {index < words.length - 1 && " "}
        </motion.span>
      ))}
    </span>
  );
}
