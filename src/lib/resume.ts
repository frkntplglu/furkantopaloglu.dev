import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const resumeSource = fs.readFileSync(path.join(process.cwd(), "content/resume.md"), "utf8");

export type Resume = {
  name: string;
  title: string;
  email: string;
  content: string;
};

export function getResume(): Resume {
  const { data, content } = matter(resumeSource);
  return { name: data.name, title: data.title, email: data.email, content };
}
