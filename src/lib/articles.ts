/// <reference types="vite/client" />
import matter from "gray-matter";

export type Article = {
  slug: string;
  date: string;
  title: string;
  description: string;
  readTime: string;
  tags: string[];
  cover?: string;
};

// Bundled at build time: Workers have no filesystem to read `articles/` from at runtime.
const files = import.meta.glob("../../articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const sources = new Map(
  Object.entries(files).map(([p, src]) => [p.split("/").pop()!, src]),
);

function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function parse(file: string, source: string) {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(source);
  const article: Article = {
    slug,
    // gray-matter parses bare YYYY-MM-DD as a Date; normalise back to a string.
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    title: String(data.title),
    description: String(data.description ?? ""),
    readTime: readTime(content),
    tags: (data.tags ?? []).map(String),
    cover: data.cover,
  };
  return { article, content };
}

export function getAllArticles(): Article[] {
  return [...sources]
    .map(([f, src]) => parse(f, src).article)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string) {
  const file = `${slug}.md`;
  const source = sources.get(file);
  return source === undefined ? null : parse(file, source);
}
