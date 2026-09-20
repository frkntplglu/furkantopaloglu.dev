"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { Photo } from "@/data/photos";

const src = (p: Photo) => `https://picsum.photos/seed/${p.seed}/${p.width}/${p.height}`;

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<Photo | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      <div className="columns-1 gap-x-8 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <motion.figure
            key={p.seed}
            initial={{ opacity: 0, y: 48, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`group mb-10 break-inside-avoid ${i % 3 === 1 ? "sm:mt-10" : ""}`}
          >
            <button type="button" onClick={() => setSelected(p)} className="block w-full cursor-zoom-in text-left" aria-label={`Open ${p.alt}`}>
              <motion.div layoutId={`photo-${p.seed}`} className="overflow-hidden rounded-sm bg-muted">
                <Image
                  src={src(p)}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 1024px) 272px, (min-width: 640px) 50vw, 100vw"
                  quality={90}
                  className="h-auto w-full opacity-90 grayscale-[35%] transition duration-700 group-hover:scale-[1.05] group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none"
                />
              </motion.div>
            </button>
            <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
              {p.exif}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={selected.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-black/90 p-6 backdrop-blur-sm"
          >
            <button type="button" aria-label="Close" className="absolute right-5 top-5 text-zinc-400 hover:text-white">
              <X className="size-6" />
            </button>
            <motion.div layoutId={`photo-${selected.seed}`} className="max-h-[80vh] overflow-hidden rounded-sm">
              <Image src={src(selected)} alt={selected.alt} width={selected.width} height={selected.height} quality={95} priority className="max-h-[80vh] w-auto object-contain" />
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }} exit={{ opacity: 0 }} className="font-mono text-xs text-zinc-400">
              {selected.exif}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
