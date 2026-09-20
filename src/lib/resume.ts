/// <reference types="vite/client" />
import matter from "gray-matter";

// Bundled at build time: Workers have no filesystem to read `content/` from at runtime.
const resumeSource = import.meta.glob("../../content/resume.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const source = Object.values(resumeSource)[0];

export type Resume = {
  name: string;
  title: string;
  email: string;
  content: string;
};

export function getResume(): Resume {
  const { data, content } = matter(source);
  return { name: data.name, title: data.title, email: data.email, content };
}
