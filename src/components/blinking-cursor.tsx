"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function BlinkingCursor({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={cn("ml-1 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] bg-muted-foreground", className)}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
    />
  );
}
