"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookCover } from "@/components/book-cover";
import { StatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/utils";
import type { ReadingItem, ReadingStatus } from "@/data/reading";

const filters: { label: string; match: ReadingStatus | null }[] = [
  { label: "All", match: null },
  { label: "In Progress", match: "IN PROGRESS" },
  { label: "Done", match: "DONE" },
  { label: "Backlog", match: "WANT TO READ" },
];

export function ReadingList({ items }: { items: ReadingItem[] }) {
  const [active, setActive] = useState<ReadingStatus | null>(null);
  const visible = active ? items.filter((i) => i.status === active) : items;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter reading list">
        {filters.map((f) => (
          <motion.button
            key={f.label}
            type="button"
            aria-pressed={active === f.match}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive(f.match)}
            className={cn(
              "relative rounded border px-3 py-1.5 font-mono text-xs transition-colors",
              active === f.match ? "border-foreground text-background" : "text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {active === f.match && (
              <motion.span layoutId="reading-pill" className="absolute inset-0 rounded bg-foreground" transition={{ type: "spring", stiffness: 500, damping: 35 }} />
            )}
            <span className="relative">{f.label}</span>
          </motion.button>
        ))}
      </div>

      <ul className="border-t">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((i, idx) => (
            <motion.li
              key={i.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group flex gap-5 border-b py-6"
            >
              <motion.div
                whileHover={{ rotateY: -14, rotateX: 4, scale: 1.06, y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                style={{ transformPerspective: 700 }}
                className="h-[7.5rem] w-20 shrink-0 overflow-hidden rounded-[3px] border border-black/10 bg-muted shadow-lg shadow-black/20 ring-1 ring-black/10 dark:border-white/10 dark:shadow-black/50 dark:ring-black/40 sm:h-36 sm:w-24"
              >
                <BookCover title={i.title} author={i.author} isbn={i.isbn} />
              </motion.div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium">{i.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{i.author}</p>
                  </div>
                  <StatusBadge status={i.status} />
                </div>
                <p className="max-w-2xl text-sm text-foreground/80">{i.takeaway}</p>
                <span className="font-mono text-xs text-muted-foreground">{i.category}</span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
