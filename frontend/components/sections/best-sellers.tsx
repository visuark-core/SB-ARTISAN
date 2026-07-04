import React from "react";
import { cn } from "../../lib/utils";
import { Product } from "../product/product-data";
import ProductGrid from "../product/product-grid";
import { Container } from "../ui";

interface BestSellersProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  wishlistedIds?: string[];
  onInquire?: (id: string) => void;
  onTearSheet?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
  className?: string;
}

export default function BestSellers({
  products,
  title = "Acclaimed Objects",
  subtitle = "Our Best Sellers",
  isLoading = false,
  wishlistedIds = [],
  onInquire,
  onTearSheet,
  onWishlistToggle,
  className,
}: BestSellersProps) {
  
  // Take the first 4 products to showcase on the home layout by default if products is list
  const showcaseProducts = products.slice(0, 4);

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

        {/* Product Grid implementation */}
        <ProductGrid
          products={showcaseProducts}
          variant="editorial"
          columns={4}
          isLoading={isLoading}
          wishlistedIds={wishlistedIds}
          onInquire={onInquire}
          onWishlistToggle={onWishlistToggle}
          hideDesigner={true}
          hideDescription={true}
          forceColumns={true}
        />

      </Container>
    </section>
  );
}
export type { BestSellersProps };
