import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { FeaturedCollection } from "./section-data";
import { Container } from "../ui";

interface FeaturedCollectionsProps {
  collections: FeaturedCollection[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function FeaturedCollections({
  collections,
  title = "Design Directions",
  subtitle = "Featured Collections",
  className,
}: FeaturedCollectionsProps) {
  return (
    <section className={cn("py-8 md:py-12 bg-[#FDFCF7] border-t border-[#F2EDE2]", className)}>
      <Container variant="wide" className="space-y-8 sm:space-y-12 md:space-y-16">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#1A1A1A] tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="font-sans text-xs text-[#6E6B64] font-light tracking-wide uppercase">
              {subtitle}
            </p>
          )}
        </div>

        {/* 4 Images in a Row Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {collections.slice(0, 4).map((collection) => (
            <Link
              key={collection.id}
              to={collection.href}
              className="group block space-y-2 focus:outline-none"
            >
              {/* Image Frame */}
              <div className="relative aspect-square overflow-hidden bg-[#F5F2EA] rounded-lg border border-[#F2EDE2]/60 transition-all duration-300">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover object-center select-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
              </div>

              {/* Title underneath */}
              <div className="space-y-1">
                <h3 className="font-serif text-[9px] min-[360px]:text-[10px] min-[400px]:text-xs sm:text-sm md:text-lg text-[#1A1A1A] group-hover:text-[#8C8273] transition-colors duration-300 font-light leading-tight">
                  {collection.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </Container>
    </section>
  );
}

export type { FeaturedCollectionsProps };
