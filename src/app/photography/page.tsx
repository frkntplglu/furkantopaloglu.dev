import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { PhotoGrid } from "@/components/photo-grid";
import { photos } from "@/data/photos";

export const metadata: Metadata = { title: "Photography" };

export default function PhotographyPage() {
  return (
    <>
      <PageHeading title="Photography" description="Away from the terminal. Click a photo to enlarge." />
      <PhotoGrid photos={photos} />
    </>
  );
}
