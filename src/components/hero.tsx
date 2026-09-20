"use client";

import Link from "next/link";
import { Camera, Compass, Dumbbell, FileText, Mail, Plane } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, type Variants } from "motion/react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

const subscribeNoop = () => () => {};
const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};

const interests = [
  { label: "Travel", icon: Plane },
  { label: "Exploring new places", icon: Compass },
  { label: "Hybrid training", icon: Dumbbell },
  { label: "Photography", icon: Camera, href: "/photography" },
];

const MotionLink = motion.create(Link);

const quickLinks = [
  { label: "GitHub", href: profile.github, icon: <GithubIcon /> },
  { label: "LinkedIn", href: profile.linkedin, icon: <LinkedinIcon /> },
  { label: "Resume", href: profile.resume, icon: <FileText className="size-4" /> },
  { label: "Email", href: `mailto:${profile.email}`, icon: <Mail className="size-4" /> },
];

export function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovering, setHovering] = useState(false);
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, var(--spotlight), transparent 70%)`;

  return (
    <section
      className="relative -mx-6 px-6 py-10"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)]"
      />
      {/* Portaled to <body> as a viewport-sized layer so the glow is never clipped by the hero's box. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {hovering && (
              <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="pointer-events-none fixed inset-0 -z-10"
                style={{ background: spotlight }}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}

      <motion.div variants={container} initial="hidden" animate="show" className="relative space-y-6">
        <motion.span variants={rise} className="inline-flex items-center gap-2 rounded border bg-background/60 px-2.5 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          Status: {profile.status}
        </motion.span>

        <div className="space-y-2">
          <motion.h1 variants={rise} className="font-display text-5xl font-bold leading-[1.15] tracking-tight text-foreground md:text-7xl">
            {profile.name}
          </motion.h1>
          <motion.p variants={rise} className="font-mono text-sm text-muted-foreground">
            {profile.title} @{" "}
            <a
              href={profile.company.url}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
            >
              {profile.company.name}
            </a>
          </motion.p>
        </div>

        <motion.p variants={rise} className="max-w-xl leading-relaxed text-foreground/80">
          {profile.bio}
        </motion.p>

        <motion.div variants={rise} className="max-w-xl space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground">{profile.personal}</p>
          <ul className="flex flex-wrap gap-2">
            {interests.map(({ label, icon: Icon, href }) => {
              const chip = (
                <>
                  <Icon className="size-3.5" />
                  {label}
                </>
              );
              const cls = "inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-2.5 py-1 font-mono text-xs text-muted-foreground backdrop-blur";
              return (
                <li key={label}>
                  {href ? (
                    <Link href={href} className={`${cls} transition-colors hover:border-foreground/30 hover:text-foreground`}>
                      {chip}
                    </Link>
                  ) : (
                    <span className={cls}>{chip}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.ul variants={rise} className="flex flex-wrap gap-3">
          {quickLinks.map((l) => {
            const cls =
              "inline-flex items-center gap-2 rounded border bg-background/60 px-3 py-1.5 font-mono text-sm text-muted-foreground backdrop-blur transition-colors hover:border-foreground/30 hover:text-foreground";
            const motionProps = { whileHover: { y: -2 }, whileTap: { scale: 0.96 }, className: cls };
            const content = (
              <>
                {l.icon}
                {l.label}
              </>
            );
            return (
              <li key={l.label}>
                {l.href.startsWith("/") ? (
                  <MotionLink href={l.href} {...motionProps}>
                    {content}
                  </MotionLink>
                ) : (
                  <motion.a
                    href={l.href}
                    {...motionProps}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {content}
                  </motion.a>
                )}
              </li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
}
