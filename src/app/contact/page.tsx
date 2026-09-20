import type { Metadata } from "next";
import { ContactGrid } from "@/components/contact-grid";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <Reveal>
        <p className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Contact</p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Let&apos;s talk about systems that{" "}
          <span className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">don&apos;t fall over.</span>
        </h1>
      </Reveal>
      <ContactGrid />
    </div>
  );
}
