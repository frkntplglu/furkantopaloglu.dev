import type { Metadata } from "next";
import { Download, Mail } from "lucide-react";
import { ArticleBody } from "@/components/markdown";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { getResume } from "@/lib/resume";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  const { name, title, email, content } = getResume();

  return (
    <div className="mx-auto max-w-3xl">
      <Reveal>
        <header className="mb-10 flex flex-col gap-6 border-b pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Resume</p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{name}</h1>
            <p className="font-mono text-sm text-muted-foreground">{title}</p>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground">
              <Mail className="size-3.5" />
              {email}
            </a>
          </div>
          <Button asChild>
            <a href="/resume.pdf" download={`${name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w]+/g, "_")}_CV.pdf`}>
              <Download className="size-4" />
              Download PDF
            </a>
          </Button>
        </header>
      </Reveal>
      <ArticleBody
        source={content}
        className="prose-h2:border-b prose-h2:pb-2 prose-h2:font-mono prose-h2:text-sm prose-h2:uppercase prose-h2:tracking-wider prose-h2:text-muted-foreground prose-h3:mb-0 prose-h3:text-base [&_h3+p]:mt-1 [&_h3_a]:font-[inherit] [&_h3_em]:font-normal [&_h3+p>em]:font-mono [&_h3+p>em]:text-xs [&_h3+p>em]:not-italic [&_h3+p>em]:text-muted-foreground"
      />
    </div>
  );
}
