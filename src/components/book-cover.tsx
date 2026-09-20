"use client";

import Image from "next/image";
import { useState } from "react";

function hue(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}

export function BookCover({ title, author, isbn }: { title: string; author: string; isbn?: string }) {
  const [failed, setFailed] = useState(false);

  if (isbn && !failed) {
    return (
      <Image
        src={`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`}
        alt={`Cover of ${title}`}
        width={200}
        height={300}
        unoptimized
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    );
  }

  const h = hue(title);
  return (
    <div
      className="flex h-full w-full flex-col justify-between p-2.5"
      style={{ background: `linear-gradient(155deg, hsl(${h} 35% 22%), hsl(${(h + 40) % 360} 40% 10%))` }}
    >
      <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">Paper</span>
      <div>
        <p className="text-[11px] font-semibold leading-tight text-white/90">{title}</p>
        <p className="mt-1 font-mono text-[9px] text-white/50">{author}</p>
      </div>
    </div>
  );
}
