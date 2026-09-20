"use client";

import { useSyncExternalStore } from "react";
import { ArrowUpRight } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import { Stagger, StaggerItem } from "@/components/motion";
import { SpotlightCard } from "@/components/spotlight-card";
import { profile } from "@/data/profile";

function subscribeClock(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}
const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Istanbul" });
const useClock = () => useSyncExternalStore(subscribeClock, () => fmt.format(new Date()), () => "--:--:--");

const socials = [
  { label: "GitHub", href: profile.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon },
  { label: "X", href: profile.x, icon: XIcon },
];

export function ContactGrid() {
  const time = useClock();

  return (
    <Stagger className="grid gap-3 sm:grid-cols-6">
      <StaggerItem className="sm:col-span-4">
        <SpotlightCard>
          <a href={`mailto:${profile.email}`} className="absolute inset-0" aria-label={`Email ${profile.email}`} />
          <div className="pointer-events-none flex h-full min-h-48 flex-col justify-between gap-10 p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Email</span>
              <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
            </div>
            <div className="space-y-4">
              <p className="break-all font-mono text-lg sm:text-2xl">{profile.email}</p>
              <div className="pointer-events-auto">
                <CopyButton value={profile.email} label="Copy address" />
              </div>
            </div>
          </div>
        </SpotlightCard>
      </StaggerItem>

      <StaggerItem className="sm:col-span-2">
        <SpotlightCard>
          <div className="flex h-full min-h-48 flex-col justify-between gap-6 p-6">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              Open to conversations
            </span>
            <div>
              <p className="font-mono text-3xl tabular-nums tracking-tight">{time}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">Istanbul · UTC+3</p>
              <p className="mt-4 text-sm text-muted-foreground">Usually replies within a day.</p>
            </div>
          </div>
        </SpotlightCard>
      </StaggerItem>

      {socials.map(({ label, href, icon: Icon }) => (
        <StaggerItem key={label} className="sm:col-span-2">
          <SpotlightCard>
            <a href={href} target="_blank" rel="noreferrer" className="flex h-full items-center justify-between gap-4 p-5">
              <span className="flex items-center gap-3">
                <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                <span>
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="block font-mono text-xs text-muted-foreground">@{profile.handle}</span>
                </span>
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
          </SpotlightCard>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
