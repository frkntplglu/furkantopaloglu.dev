import type { Metadata } from "next";
import { HobbyRow, ProductCard } from "@/components/project-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { PageHeading } from "@/components/page-heading";
import { hobbies, products } from "@/data/projects";

export const metadata: Metadata = { title: "Projects" };

function SectionLabel({ title, note }: { title: string; note: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline gap-x-3">
      <h2 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">{title}</h2>
      <span className="text-xs text-muted-foreground/70">{note}</span>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeading title="Projects" description="What I build outside of my day job: real products first, experiments after." />
      <div className="space-y-14">
        <section>
          <SectionLabel title="Products" note="Shipped and running in production" />
          <Stagger className="space-y-4">
            {products.map((p) => (
              <StaggerItem key={p.name}>
                <ProductCard project={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <Reveal>
          <SectionLabel title="Side projects" note="Experiments and things built for fun" />
          <Stagger className="space-y-3">
            {hobbies.map((p) => (
              <StaggerItem key={p.name}>
                <HobbyRow project={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </>
  );
}
