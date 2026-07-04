import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Container } from "../ui";

interface ChroniclesBannerProps {
  image?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  btnText?: string;
  btnLink?: string;
  className?: string;
}

export default function ChroniclesBanner({
  image = "/images/commercial_workshop_custom.png",
  title = "Direct from Jodhpur Workshops to Your Projects",
  subtitle = "COMMERCIAL SPECIFICATIONS",
  description = "Access our complete digital portfolio, technical tear sheets, and trade catalog detailing our contract-grade solid teak, cane, and bone inlay capabilities.",
  btnText = "Download Catalog",
  btnLink = "/contact",
  className,
}: ChroniclesBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[2.8/1] sm:aspect-[3.5/1] flex items-center overflow-hidden bg-black",
        className
      )}
    >
      {/* 1. PARALLAX BACKGROUND IMAGE */}
      <motion.div
        className={cn(
          "absolute inset-0 w-full bg-cover bg-center select-none",
          isMobile ? "h-full" : "h-[124%]"
        )}
        style={{
          y: isMobile ? 0 : backgroundY,
          backgroundImage: `url(${image})`,
        }}
      />

      {/* 2. GRADIENT OVERLAY FOR READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 md:from-black/90 md:via-black/60 md:to-transparent z-10" />

      {/* 3. CONTENT OVERLAY */}
      <Container variant="wide" className="relative z-20 w-full flex items-center h-full">
        <div className="max-w-2xl space-y-2 sm:space-y-4 md:space-y-6">
          {/* Subtitle / Eyebrow */}
          {subtitle && (
            <div className="items-center gap-3 hidden sm:flex">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#CBB593] select-none">
                {subtitle}
              </span>
              <span className="h-[1px] w-8 bg-[#CBB593]/40" />
            </div>
          )}

          {/* Title */}
          {title && (
            <h2 className="font-serif text-[11px] min-[360px]:text-sm sm:text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-wide leading-tight">
              {title}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p className="font-sans text-[10px] sm:text-xs text-gray-300 font-light leading-relaxed max-w-xl hidden sm:block">
              {description}
            </p>
          )}

          {/* Button CTA */}
          <div className="pt-0.5 sm:pt-1.5">
            <Link
              to={btnLink}
              className="inline-block px-3 py-1.5 sm:px-6 sm:py-2.5 border border-white hover:bg-white hover:text-black text-white text-[8px] sm:text-xs uppercase tracking-[0.25em] font-sans font-medium transition-all duration-300 rounded-sm"
            >
              {btnText}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export type { ChroniclesBannerProps };
