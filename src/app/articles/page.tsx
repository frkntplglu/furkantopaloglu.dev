import type { Metadata } from "next";
import { ArticleList } from "@/components/article-list";
import { PageHeading } from "@/components/page-heading";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = { title: "Articles" };

export default function ArticlesPage() {
  return (
    <>
      <PageHeading title="Articles" description="Notes on distributed systems, databases and architecture." />
      <ArticleList articles={getAllArticles()} />
    </>
  );
}
