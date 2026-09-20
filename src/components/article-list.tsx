"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { ArticleRow } from "@/components/article-row";
import { cn } from "@/lib/utils";
import type { Article } from "@/lib/articles";

export function ArticleList({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const allTags = useMemo(() => [...new Set(articles.flatMap((a) => a.tags))].sort(), [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^#/, "");
    return articles.filter((a) => {
      if (active && !a.tags.includes(active)) return false;
      if (!q) return true;
      return a.title.toLowerCase().includes(q) || a.tags.some((t) => t.includes(q));
    });
  }, [articles, query, active]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by title or #tag"
            aria-label="Filter articles"
            className="pl-9 font-mono text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <motion.button
              key={t}
              type="button"
              aria-pressed={active === t}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActive(active === t ? null : t)}
              className={cn(
                "relative rounded border px-2 py-1 font-mono text-xs transition-colors",
                active === t ? "border-foreground text-background" : "text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {active === t && <motion.span layoutId="tag-pill" className="absolute inset-0 rounded bg-foreground" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
              <span className="relative">#{t}</span>
            </motion.button>
          ))}
        </div>
      </div>
      <ul className="border-t">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((a) => (
            <ArticleRow key={a.slug} article={a} />
          ))}
        </AnimatePresence>
      </ul>
      {!filtered.length && <p className="font-mono text-sm text-muted-foreground">No articles match.</p>}
    </div>
  );
}
