import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Fades a block up as it scrolls into view, with a CSS scroll-driven animation (.reveal in
// globals.css). Content is visible without JavaScript, in browsers without support and with reduced motion.
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
