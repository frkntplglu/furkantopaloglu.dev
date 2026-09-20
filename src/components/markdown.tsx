import Image from "next/image";
import Link from "next/link";
import Markdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import { cn } from "@/lib/utils";

const components: Components = {
  img({ src, alt }) {
    if (typeof src !== "string") return null;
    return (
      <span className="my-8 block">
        <Image
          src={src}
          alt={alt ?? ""}
          width={1200}
          height={675}
          sizes="(min-width: 896px) 848px, 100vw"
          unoptimized={src.endsWith(".svg")}
          className="h-auto w-full rounded-md border"
        />
        {alt && <span className="mt-2 block text-center font-mono text-xs text-muted-foreground">{alt}</span>}
      </span>
    );
  },
  a({ href, children }) {
    if (!href) return <>{children}</>;
    return href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  },
};

export function ArticleBody({ source, className }: { source: string; className?: string }) {
  return (
    <div className={cn("prose dark:prose-invert prose-zinc max-w-none prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-xl prose-a:text-foreground prose-a:underline-offset-4 prose-pre:overflow-hidden prose-pre:rounded-md prose-pre:border prose-pre:bg-[#0d1117] prose-pre:p-0 prose-pre:text-[13px] [&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.85em] [&_:not(pre)>code]:before:content-none [&_:not(pre)>code]:after:content-none [&_table]:text-sm", className)}>
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeHighlight]} components={components}>
        {source}
      </Markdown>
    </div>
  );
}
