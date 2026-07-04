import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Container } from "../ui";

const MotionLink = motion.create(Link);

interface FeaturedCategoriesProps {
  categories?: any[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const CURATED_CATEGORIES = [
  {
    id: "space-restaurant",
    title: "Restaurant Furniture",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    href: "/category/restaurant-furniture",
    colSpan: "col-span-6 md:col-span-5",
    heightClass: "h-[110px] sm:h-[160px] md:h-[220px] lg:h-[260px]",
  },
  {
    id: "space-cafe",
    title: "Café Furniture",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1000&q=80",
    href: "/category/cafe-furniture",
    colSpan: "col-span-6 md:col-span-2",
    heightClass: "h-[110px] sm:h-[160px] md:h-[220px] lg:h-[260px]",
  },
  {
    id: "space-bar",
    title: "Bar Furniture",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    href: "/category/bar-furniture",
    colSpan: "col-span-6 md:col-span-2",
    heightClass: "h-[110px] sm:h-[160px] md:h-[220px] lg:h-[260px]",
  },
  {
    id: "space-hotel",
    title: "Hotel Furniture",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    href: "/category/hotel-furniture",
    colSpan: "col-span-6 md:col-span-3",
    heightClass: "h-[110px] sm:h-[160px] md:h-[220px] lg:h-[260px]",
  },
  {
    id: "space-cane",
    title: "Cane Furniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    href: "/category/cane-furniture",
    colSpan: "col-span-4 md:col-span-3",
    heightClass: "h-[110px] sm:h-[160px] md:h-[220px] lg:h-[260px]",
  },
  {
    id: "space-bone-inlay",
    title: "Bone Inlay Furniture",
    image: "/images/hero1.png",
    href: "/category/bone-inlay-furniture",
    colSpan: "col-span-4 md:col-span-5",
    heightClass: "h-[110px] sm:h-[160px] md:h-[220px] lg:h-[260px]",
  },
  {
    id: "space-rope",
    title: "Rope Furniture",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    href: "/category/rope-furniture",
    colSpan: "col-span-4 md:col-span-4",
    heightClass: "h-[110px] sm:h-[160px] md:h-[220px] lg:h-[260px]",
  },
];

export default function FeaturedCategories({
  categories,
  title = "Complete Your Space",
  subtitle = "Perfect pieces to complete your vision",
  className,
}: FeaturedCategoriesProps) {
  return (
    <section className={cn("pt-4 pb-12 md:pt-8 md:pb-16 bg-[#FDFCF7] border-t border-[#F2EDE2]", className)}>
      <Container variant="wide" className="space-y-16">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1A1A1A] tracking-wide leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="font-sans text-sm text-[#6E6B64] font-light tracking-wide">
              {subtitle}
            </p>
          )}
        </div>

        {/* Custom Grid Layout - locked 12-column system across all screens */}
        <div className="grid grid-cols-12 gap-2 sm:gap-4 md:gap-6">
          {CURATED_CATEGORIES.map((space, index) => (
            <MotionLink
              key={space.id}
              to={space.href}
              className={cn(
                "group relative block overflow-hidden bg-[#F5F2EA] rounded-lg border border-[#F2EDE2]/60 focus:outline-none focus:ring-1 focus:ring-[#8C8273] transition-all duration-300",
                space.colSpan
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1], delay: index * 0.05 }}
            >
              {/* Sizing Wrapper */}
              <div className={cn("w-full overflow-hidden relative", space.heightClass)}>
                
                {/* Visual Imagery */}
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover object-center select-none transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />

                {/* Subtle bottom-focused gradient overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500 z-10" />

                {/* Typography Container */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 z-20">
                  <h3 className="font-sans text-[7px] min-[360px]:text-[8px] sm:text-xs md:text-lg lg:text-xl font-bold text-white tracking-wide leading-tight">
                    <span className="hidden sm:inline">{space.title}</span>
                    <span className="inline sm:hidden">{space.title.replace(" Furniture", "")}</span>
                  </h3>
                </div>

              </div>
            </MotionLink>
          ))}
        </div>

      </Container>
    </section>
  );
}

export type { FeaturedCategoriesProps };
