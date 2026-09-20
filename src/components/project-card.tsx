"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/spotlight-card";
import { Tag } from "@/components/tag";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/data/projects";

const statusStyles: Record<ProjectStatus, string> = {
  LIVE: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  WIP: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  ARCHIVED: "border-zinc-500/30 bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={cn("inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[11px] font-medium tracking-wide", statusStyles[status])}>
      {status}
    </span>
  );
}

// Featured card for real products.
export function ProductCard({ project }: { project: Project }) {
  const isFitzpoint = project.name === "FitzPoint";

  return (
    <SpotlightCard>
      {project.href && <a href={project.href} target="_blank" rel="noreferrer" className="absolute inset-0 z-10" aria-label={`Open ${project.name}`} />}
      <div className="space-y-6 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          {isFitzpoint ? (
            <>
              <Image src="/projects/fitzpoint-logo.svg" alt="FitzPoint" width={180} height={39} unoptimized className="h-8 w-auto dark:hidden" />
              <Image src="/projects/fitzpoint-logo-dark.svg" alt="" aria-hidden width={180} height={39} unoptimized className="hidden h-8 w-auto dark:block" />
            </>
          ) : (
            <h3 className="text-lg font-semibold">{project.name}</h3>
          )}
          <div className="flex items-center gap-3">
            <ProjectStatusBadge status={project.status} />
            <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium tracking-tight">{project.tagline}</p>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full border bg-background/60 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
          {project.role ? <span>Role: {project.role}</span> : <span />}
          {project.href && <span>{project.href.replace(/^https?:\/\//, "")}</span>}
        </div>
      </div>
    </SpotlightCard>
  );
}

// Compact row for side projects.
export function HobbyRow({ project }: { project: Project }) {
  return (
    <SpotlightCard>
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <h3 className="font-mono text-sm font-semibold">{project.name}</h3>
            <ProjectStatusBadge status={project.status} />
          </div>
          <p className="text-sm font-medium">{project.tagline}</p>
          <p className="max-w-xl text-sm text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-x-2 sm:justify-end">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}
