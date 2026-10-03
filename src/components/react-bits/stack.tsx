"use client";

// Adapted from React Bits "Stack" (reactbits.dev): framer-motion instead of motion/react,
// a stable rotation per card, and an imperative `next()` so a keyboard button can flip cards.
import { motion, type PanInfo, useMotionValue, useTransform } from "framer-motion";
import { forwardRef, type ReactNode, useImperativeHandle, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type CardRotateProps = {
  children: ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disabled: boolean;
};

function CardRotate({ children, onSendToBack, sensitivity, disabled }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [40, -40]);
  const rotateY = useTransform(x, [-100, 100], [-40, 40]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    }
    x.set(0);
    y.set(0);
  }

  if (disabled) return <div className="absolute inset-0">{children}</div>;

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export type StackHandle = { next: () => void };

type StackProps = {
  cards: { id: string; content: ReactNode }[];
  sensitivity?: number;
  onChange?: (topId: string) => void;
};

const TILT = [-7, 5, -4, 8, -5, 3];

const Stack = forwardRef<StackHandle, StackProps>(function Stack(
  { cards, sensitivity = 120, onChange },
  ref,
) {
  const reduce = usePrefersReducedMotion();
  const [order, setOrder] = useState(() => cards.map((c) => c.id));

  const sendToBack = (id: string) => {
    setOrder((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)];
      onChange?.(next[next.length - 1]);
      return next;
    });
  };

  useImperativeHandle(ref, () => ({ next: () => sendToBack(order[order.length - 1]) }));

  return (
    <div className="relative h-full w-full" style={{ perspective: 800 }}>
      {order.map((id, index) => {
        const card = cards.find((c) => c.id === id);
        if (!card) return null;
        const depth = order.length - index - 1;
        const isTop = depth === 0;
        return (
          <CardRotate
            key={id}
            onSendToBack={() => sendToBack(id)}
            sensitivity={sensitivity}
            disabled={reduce || !isTop}
          >
            <motion.div
              className="h-full w-full"
              aria-hidden={!isTop}
              animate={{
                rotateZ: isTop ? 0 : TILT[cards.indexOf(card) % TILT.length],
                scale: 1 - depth * 0.04,
                x: depth * 10,
                y: depth * 6,
              }}
              initial={false}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
});

export default Stack;
