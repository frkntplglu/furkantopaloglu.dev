import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion";
import { products } from "@/data/projects";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "About" };

const linkCls =
  "underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

export default function AboutPage() {
  const product = products[0];

  return (
    <div className="space-y-10">
      <Reveal>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted sm:aspect-video">
          <Image
            src="/about.png"
            alt={profile.name}
            fill
            priority
            sizes="(min-width: 896px) 848px, 100vw"
            className="object-cover object-[50%_18%]"
          />
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mx-auto max-w-2xl space-y-5 leading-relaxed text-foreground/80">
        <p>
          I&apos;m {profile.name}, a {profile.title} at{" "}
          <a href={profile.company.url} target="_blank" rel="noreferrer" className={linkCls}>
            {profile.company.name}
          </a>
          , where I build scalable backend infrastructure.
        </p>
        <p>{profile.bio}</p>
        <p>
          I work on the parts of a product users never see but always feel: the services, data flows and infrastructure that decide whether it is fast,
          reliable and cheap to change. Outside of work I&apos;m the {product.role?.toLowerCase()} of{" "}
          <a href={product.href} target="_blank" rel="noreferrer" className={linkCls}>
            {product.name}
          </a>
          , {product.tagline.toLowerCase()}.
        </p>
        <p>{profile.personal}</p>
      </Reveal>
    </div>
  );
}
