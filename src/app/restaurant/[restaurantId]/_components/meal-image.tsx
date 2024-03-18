"use client";

import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface IMealProps {
  img: string | null;
  alt: string;
}

export function MealImage({ img, alt }: IMealProps) {
  const [loading, setLoading] = useState(true);

  function handleImageLoad() {
    setLoading(false);
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg">
      {loading && <Skeleton className="absolute inset-0" />}
      <Image
        src={img || ""}
        alt={alt}
        quality={100}
        fill
        className="object-cover transition hover:scale-105"
        style={{ display: loading ? "none" : "block" }}
        onLoad={handleImageLoad}
        priority
      />
    </div>
  );
}
