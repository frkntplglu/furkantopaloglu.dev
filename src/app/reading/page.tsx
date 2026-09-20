import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { ReadingList } from "@/components/reading-list";
import { reading } from "@/data/reading";

export const metadata: Metadata = { title: "Reading List" };

export default function ReadingPage() {
  return (
    <>
      <PageHeading title="Reading List" description="Books, whitepapers and articles, with the one thing I took away." />
      <ReadingList items={reading} />
    </>
  );
}
