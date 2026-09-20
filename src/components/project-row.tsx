"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Box } from "lucide-react";
import { ProjectStatusBadge } from "@/components/project-card";
import { Tag } from "@/components/tag";
import type { Project } from "@/data/projects";

export function ProjectRow({ project }: { project: Project }) {
  const external = project.href?.startsWith("http");
  const linkProps = external ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative grid grid-cols-[70px_1fr] items-center gap-x-5 gap-y-1 border-b py-4 md:grid-cols-[6.5rem_1fr_auto] md:gap-x-6"
    >
      <span aria-hidden className="absolute inset-y-0 -inset-x-3 -z-10 rounded-md bg-accent/0 transition-colors duration-300 group-hover:bg-accent/70" />
      <span className="flex size-[70px] items-center justify-center overflow-hidden rounded-xl border bg-background/60">
        {project.icon ? (
          <Image src={project.icon} alt="" aria-hidden width={70} height={70} unoptimized className="size-full object-cover" />
        ) : (
          <Box aria-hidden className="size-6 text-muted-foreground" />
        )}
      </span>
      <div className="space-y-1.5">
        <h3 className="flex items-center gap-2.5 text-sm font-medium text-foreground transition-transform duration-300 group-hover:translate-x-1">
          <Link href={project.href ?? "/projects"} className="after:absolute after:inset-0" {...linkProps}>
            {project.name}
          </Link>
          <ProjectStatusBadge status={project.status} />
          <ArrowUpRight className="size-3.5 -translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
        </h3>
        <p className="text-sm text-muted-foreground">{project.tagline}</p>
        <div className="flex flex-wrap gap-x-2">
          {project.tags.slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <span className="col-start-2 font-mono text-xs text-muted-foreground md:col-start-auto md:text-right">{project.role ?? ""}</span>
    </motion.li>
  );
}
