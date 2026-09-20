"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/articles";
import { Tag } from "@/components/tag";

export function ArticleRow({ article }: { article: Article }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -12 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative grid gap-1 border-b py-4 md:grid-cols-[6.5rem_1fr_auto] md:items-baseline md:gap-6"
    >
      <span aria-hidden className="absolute inset-y-0 -inset-x-3 -z-10 rounded-md bg-accent/0 transition-colors duration-300 group-hover:bg-accent/70" />
      <time dateTime={article.date} className="font-mono text-xs text-muted-foreground">
        {article.date}
      </time>
      <div className="space-y-1.5">
        <h3 className="flex items-center gap-1.5 text-sm font-medium text-foreground transition-transform duration-300 group-hover:translate-x-1">
          <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
          <ArrowUpRight className="size-3.5 -translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
        </h3>
        <div className="flex flex-wrap gap-x-2">
          {article.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <span className="font-mono text-xs text-muted-foreground md:text-right">{article.readTime}</span>
    </motion.li>
  );
}
