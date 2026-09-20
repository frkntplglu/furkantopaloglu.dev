import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleRow } from "@/components/article-row";
import { Hero } from "@/components/hero";
import { ProjectRow } from "@/components/project-row";
import { Reveal } from "@/components/motion";
import { products, hobbies } from "@/data/projects";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const recent = getAllArticles().slice(0, 3);
  const featured = [...products, ...hobbies].slice(0, 3);

  return (
    <div className="space-y-16">
      <Hero />
      <Reveal>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">Projects</h2>
          <Link href="/projects" className="group inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground">
            All projects <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="border-t">
          {featured.map((p) => (
            <ProjectRow key={p.name} project={p} />
          ))}
        </ul>
      </Reveal>
      <Reveal>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">Recent Articles</h2>
          <Link href="/articles" className="group inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground">
            All articles <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="border-t">
          {recent.map((a) => (
            <ArticleRow key={a.slug} article={a} />
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
