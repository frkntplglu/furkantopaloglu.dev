import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ArticleBody } from "@/components/markdown";
import { Tag } from "@/components/tag";
import { getAllArticles, getArticle } from "@/lib/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = getArticle(slug);
  if (!found) return {};
  return { title: found.article.title, description: found.article.description };
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const found = getArticle(slug);
  if (!found) notFound();
  const { article, content } = found;

  const all = getAllArticles();
  const i = all.findIndex((a) => a.slug === slug);
  const newer = all[i - 1];
  const older = all[i + 1];

  return (
    <article className="mx-auto max-w-2xl">
      <Link href="/articles" className="group mb-10 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" /> Articles
      </Link>

      <header className="mb-10 space-y-4">
        <p className="font-mono text-xs text-muted-foreground">
          <time dateTime={article.date}>{article.date}</time> · {article.readTime}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{article.title}</h1>
        {article.description && <p className="text-lg text-muted-foreground">{article.description}</p>}
        <div className="flex flex-wrap gap-x-2">
          {article.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </header>

      {article.cover && (
        <Image
          src={article.cover}
          alt=""
          width={1200}
          height={630}
          priority
          unoptimized={article.cover.endsWith(".svg")}
          className="mb-10 h-auto w-full rounded-md border"
        />
      )}

      <ArticleBody source={content} />

      <nav className="mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2" aria-label="More articles">
        {older ? (
          <Link href={`/articles/${older.slug}`} className="group rounded-md border p-4 transition-colors hover:bg-accent">
            <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <ArrowLeft className="size-3" /> Older
            </span>
            <span className="mt-1 block text-sm font-medium">{older.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link href={`/articles/${newer.slug}`} className="group rounded-md border p-4 text-right transition-colors hover:bg-accent">
            <span className="flex items-center justify-end gap-1 font-mono text-xs text-muted-foreground">
              Newer <ArrowRight className="size-3" />
            </span>
            <span className="mt-1 block text-sm font-medium">{newer.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
