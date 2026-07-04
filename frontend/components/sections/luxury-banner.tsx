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
  quote = "“Simplicity is the ultimate sophistication.”",
  author = "Leonardo da Vinci",
  image = "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=90",
  className,
}: LuxuryBannerProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parallax Scroll Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Translate background slightly slower than scroll to create depth
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative aspect-[3.5/1] w-full flex items-center justify-center overflow-hidden bg-black",
        className
      )}
    >
      {/* 1. PARALLAX BACKGROUND IMAGE */}
      <motion.div
        className={cn(
          "absolute inset-0 w-full bg-cover bg-center select-none",
          isMobile ? "h-full" : "h-[120%]"
        )}
        style={{
          y: isMobile ? 0 : backgroundY,
          backgroundImage: `url(${image})`,
        }}
      />
    </section>
  );
}
export type { LuxuryBannerProps };
