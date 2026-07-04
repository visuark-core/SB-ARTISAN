import React from "react";
import { Paragraph } from "../../ui";

interface ProductOverviewProps {
  title: string;
  category: string;
  subcategory: string;
  designer: string;
  price?: string;
  description: string;
  onGetPriceClick?: () => void;
}

export default function ProductOverview({
  title,
  category,
  subcategory,
  designer,
  price,
  description,
  onGetPriceClick,
}: ProductOverviewProps) {
  return (
    <div className="space-y-4">
      {/* Category Labels */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-medium">
          {category}
        </span>
        <span className="text-[#8C8273]/30 text-xs">/</span>
        <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-light">
          {subcategory}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="font-serif text-3xl md:text-4xl font-light text-[#1A1A1A] leading-tight tracking-wide">
        {title}
      </h1>

      {/* Designer Credit */}
      <p className="font-sans italic text-sm text-[#8C8273] font-light -mt-2">
        Designed by {designer}
      </p>

      {/* Get Price Button */}
      <div className="pt-2">
        <button
          onClick={onGetPriceClick}
          className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-sm"
        >
          Get Price
        </button>
      </div>

      {/* Editorial Summary */}
      <div className="pt-4 border-t border-[#F2EDE2]">
        <Paragraph variant="md" className="text-[#1A1A1A] font-normal leading-relaxed text-justify">
          {description}
        </Paragraph>
      </div>
    </div>
  );
}
