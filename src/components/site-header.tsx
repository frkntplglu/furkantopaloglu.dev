"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { BlinkingCursor } from "@/components/blinking-cursor";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/articles", label: "Articles" },
  { href: "/reading", label: "Reading List" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight" aria-label="Home">
          /{profile.handle}
          <BlinkingCursor className="h-[0.95em]" />
        </Link>
        <div className="flex items-center gap-1">
        <nav className="mr-4 hidden items-center gap-6 md:flex" aria-label="Main">
          {links.map((l) => {
            const isActive = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={cn("relative py-1 text-sm transition-colors hover:text-foreground", isActive ? "text-foreground" : "text-muted-foreground")}
              >
                {l.label}
                {isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-[17px] h-px bg-foreground" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
              </Link>
            );
          })}
        </nav>
        <ThemeToggle />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle className="font-mono">/{profile.handle}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded px-2 py-2 text-sm hover:bg-accent",
                    pathname.startsWith(l.href) ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  );
}
