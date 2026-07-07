import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

interface LuxuryBannerProps {
  quote?: string;
  author?: string;
  image?: string;
  className?: string;
}

export default function LuxuryBanner({
  image = "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=90",
  className,
}: LuxuryBannerProps) {
  return (
    <section
      className={cn(
        "relative w-full aspect-[1590/400] overflow-hidden bg-[#0F0E0D]",
        className
      )}
    >
      <img
        src={image}
        alt="Philosophy Showcase"
        className="w-full h-full object-cover select-none"
      />
    </section>
  );
}
export type { LuxuryBannerProps };
