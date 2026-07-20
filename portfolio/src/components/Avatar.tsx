"use client";

import { useState } from "react";

export default function Avatar({
  src,
  initials,
  alt,
}: {
  src: string;
  initials: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-full">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/25 via-violet-500/20 to-fuchsia-500/25">
          <span className="bg-gradient-to-br from-cyan-200 to-violet-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
