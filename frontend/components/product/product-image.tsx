import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import ProductBadge from "./product-badge";

interface ProductImageProps {
  src: string;
  alt: string;
  aspectRatio?: "portrait" | "square" | "landscape";
  isNew?: boolean;
  isFeatured?: boolean;
  isLoading?: boolean;
  isWishlisted?: boolean;
  onWishlistToggle?: (e: React.MouseEvent) => void;
  className?: string;
  isHovered?: boolean;
  hoverSrc?: string;
}

export default function ProductImage({
  src,
  alt,
  aspectRatio = "portrait",
  isNew,
  isFeatured,
  isLoading = false,
  isWishlisted = false,
  onWishlistToggle,
  className,
  isHovered = false,
  hoverSrc,
}: ProductImageProps) {
  
  // Custom aspect ratio mapping for premium layout structures
  const aspectClass = {
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    landscape: "aspect-[4/3]",
  }[aspectRatio];

  if (isLoading) {
    return (
      <div className={cn("relative w-full overflow-hidden bg-[#F5F2EA] animate-pulse", aspectClass, className)}>
        {/* Subtle Shimmer Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
    );
  }

  const showHoverImage = isHovered && hoverSrc;

  return (
    <div className={cn("relative w-full overflow-hidden bg-[#F5F2EA] group/img", aspectClass, className)}>
      {/* 1. PRODUCT IMAGE WITH HOVER ZOOM & CROSS-FADE */}
      <div className="absolute inset-0 w-full h-full">
        {/* Base Image */}
        <motion.img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover object-center"
          animate={{
            scale: isHovered ? 1.05 : 1,
            opacity: showHoverImage ? 0 : 1,
          }}
          transition={{
            duration: 1.2,
            ease: [0.25, 1, 0.5, 1], // Custom slow bezier curve for elegant transition
          }}
          loading="lazy"
        />

        {/* Hover/Secondary Image */}
        {hoverSrc && (
          <motion.img
            src={hoverSrc}
            alt={`${alt} Alternate View`}
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{
              scale: isHovered ? 1.05 : 1,
              opacity: showHoverImage ? 1 : 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.25, 1, 0.5, 1],
            }}
            loading="lazy"
          />
        )}
      </div>

      {/* Subtle overlay shading (restrained) */}
      <div className="absolute inset-0 bg-black/[0.02] pointer-events-none transition-opacity duration-500 group-hover/img:opacity-0" />

      {/* 2. ABSOLUTE BADGES (TOP-LEFT) */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-1 sm:gap-2 z-10">
        {isNew && <ProductBadge type="new" />}
        {isFeatured && <ProductBadge type="featured" />}
      </div>
    </div>
  );
}
