import React from "react";
import { cn } from "../../lib/utils";
import { Container } from "../ui";

interface LuxuryBannerProps {
  quote?: string;
  author?: string;
  image?: string;
  className?: string;
  aspectRatio?: string;
}

export default function LuxuryBanner({
  image = "/images/home-hero.png",
  className,
}: LuxuryBannerProps) {
  return (
    <section className={cn("w-full py-6 sm:py-8 md:py-12 bg-[#FDFCF7]", className)}>
      <Container variant="wide">
        <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl shadow-xs bg-[#F5F2EA]">
          <img
            src={image}
            alt="Philosophy Showcase"
            className="w-full h-auto block select-none"
          />
        </div>
      </Container>
    </section>
  );
}
export type { LuxuryBannerProps };
