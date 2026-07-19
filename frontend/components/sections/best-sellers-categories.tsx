import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Container } from "../ui";

interface CategoryGridItem {
  id: string;
  title: string;
  countText: string;
  image: string;
  href: string;
  icon: React.ReactNode;
}

const CATEGORY_ITEMS: CategoryGridItem[] = [
  {
    id: "seating",
    title: "Seating",
    countText: "28+ Items",
    image: "/images/rope_furniture.png",
    href: "/category/rope-furniture",
    icon: (
      <svg className="w-3.5 h-3.5 text-[#8C8273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 00-2-2V6a2 2 0 002-2h14a2 2 0 002 2v4a2 2 0 00-2 2M5 12v6a2 2 0 002 2h10a2 2 0 002-2v-6M9 6v6M15 6v6" />
      </svg>
    )
  },
  {
    id: "coffee-tables",
    title: "Coffee Tables",
    countText: "18+ Items",
    image: "/images/shop_coffee_table.png",
    href: "/category/hotel-furniture?sub=coffee-tables",
    icon: (
      <svg className="w-3.5 h-3.5 text-[#8C8273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M5 10v8m14-8v8M8 10v4m8-4v4" />
      </svg>
    )
  },
  {
    id: "chairs",
    title: "Chairs",
    countText: "24+ Items",
    image: "/images/cafe_patio_chairs.png",
    href: "/category/hotel-furniture?sub=hotel-chairs",
    icon: (
      <svg className="w-3.5 h-3.5 text-[#8C8273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 6v6h10V6M5 12h14v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5zM8 19v2M16 19v2" />
      </svg>
    )
  },
  {
    id: "dining-tables",
    title: "Dining Tables",
    countText: "16+ Items",
    image: "/images/restaurant_dining_tables.png",
    href: "/category/restaurant-furniture?sub=restaurant-dining-tables",
    icon: (
      <svg className="w-3.5 h-3.5 text-[#8C8273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M6 8v10M18 8v10M9 8v4m6-4v4" />
      </svg>
    )
  },
  {
    id: "daybeds",
    title: "Daybeds",
    countText: "14+ Items",
    image: "/images/resort_bedroom_daybed.png",
    href: "/collections?search=daybed",
    icon: (
      <svg className="w-3.5 h-3.5 text-[#8C8273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 10V6a2 2 0 012-2h2a2 2 0 012 2v4M21 10v6m-4-6h4M3 18h18" />
      </svg>
    )
  },
  {
    id: "outdoor",
    title: "Outdoor",
    countText: "22+ Items",
    image: "/images/curated_outdoor_room.png",
    href: "/category/hotel-furniture?sub=outdoor-hotel-furniture",
    icon: (
      <svg className="w-3.5 h-3.5 text-[#8C8273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    )
  },
  {
    id: "accent-chairs",
    title: "Accent Chairs",
    countText: "19+ Items",
    image: "/images/shop_chair.png",
    href: "/collections?search=chair",
    icon: (
      <svg className="w-3.5 h-3.5 text-[#8C8273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 12a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2m14 0v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6m14 0H5" />
      </svg>
    )
  },
  {
    id: "bedroom",
    title: "Bedroom",
    countText: "26+ Items",
    image: "/images/shop_bedside.png",
    href: "/category/hotel-furniture?sub=hotel-bedroom-furniture",
    icon: (
      <svg className="w-3.5 h-3.5 text-[#8C8273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )
  }
];

const FEATURE_ITEMS = [
  {
    title: "Premium Craftsmanship",
    description: "Handcrafted by skilled artisans",
    icon: (
      <svg className="w-5 h-5 text-[#8C8273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75a1.125 1.125 0 00-1.125 1.125v3.375m9 0h-9M9 10.5h6m-6 3h6m-7.5-6h9a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-9a1.5 1.5 0 01-1.5-1.5v-3a1.5 1.5 0 011.5-1.5z" />
      </svg>
    )
  },
  {
    title: "Sustainable Materials",
    description: "Responsibly sourced, eco-friendly",
    icon: (
      <svg className="w-5 h-5 text-[#8C8273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17M12 3c-4.418 0-8 3.582-8 8v3c0 2.21 1.79 4 4 4h4m0-15c4.418 0 8 3.582 8 8v3c0 2.21-1.79 4-4 4h-4" />
      </svg>
    )
  },
  {
    title: "Built to Last",
    description: "Timeless designs, lasting quality",
    icon: (
      <svg className="w-5 h-5 text-[#8C8273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    )
  },
  {
    title: "Pan India Delivery",
    description: "Reliable & secure delivery",
    icon: (
      <svg className="w-5 h-5 text-[#8C8273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V12M15 18.75h-6M18.75 18.75v-3.75m0 3.75h-.375a1.125 1.125 0 01-1.125-1.125v-1.5m1.5 2.625h-.375c-.621 0-1.125-.504-1.125-1.125v-3.75m0-1.5V9A1.5 1.5 0 0014 7.5H5.25A1.5 1.5 0 003.75 9v6h15M15 15h.375a1.125 1.125 0 001.125-1.125V12h-3v3z" />
      </svg>
    )
  }
];

export default function BestSellersCategories() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-[#FDFCF7]">
      <Container variant="wide" className="space-y-12 sm:space-y-16">
        
        {/* Main Grid: Left Callout + Right Grid of Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column Callout */}
          <div className="lg:col-span-3 space-y-5 lg:sticky lg:top-32">
            <div className="space-y-1">
              <span 
                className="text-2xl sm:text-3xl text-[#0D5C3A] italic font-light block select-none leading-none"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                exclusive
              </span>
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#0D5C3A] tracking-wide block uppercase leading-none">
                Heritage
              </span>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#1A1A1A] tracking-wide leading-tight">
              BEST<br />SELLERS
            </h2>
            
            {/* Elegant Line Divider with Star */}
            <div className="flex items-center gap-3 max-w-[200px] py-1">
              <div className="h-[1px] flex-1 bg-[#EAE5D9]" />
              <svg className="w-3.5 h-3.5 text-[#CBB593] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
              </svg>
              <div className="h-[1px] flex-1 bg-[#EAE5D9]" />
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#6E6B64] font-light leading-relaxed max-w-xs">
              Timeless designs. Trusted quality. Handcrafted furniture made to last generations.
            </p>

            <div className="pt-2">
              <Link
                to="/collections"
                className="inline-flex items-center justify-center bg-[#0D5C3A] hover:bg-[#093E26] text-white px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 rounded-[4px] shadow-sm hover:shadow-md"
              >
                Explore All Products
                <svg className="w-3.5 h-3.5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: 8 Cards Grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {CATEGORY_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="group flex flex-col bg-[#FAF8F5] border border-[#F2EDE2]/60 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#CBB593]/50"
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#FAF8F2] relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover select-none transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Info Row */}
                  <div className="p-3 sm:p-4 flex items-center gap-3">
                    {/* Circle Icon Container */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#EAE5D9]/70 bg-white flex items-center justify-center shrink-0 shadow-2xs">
                      {item.icon}
                    </div>
                    {/* Texts */}
                    <div className="overflow-hidden">
                      <h3 className="font-sans text-xs sm:text-sm font-bold text-[#1A1A1A] tracking-wide truncate">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[10px] sm:text-xs text-[#8C8273] font-light mt-0.5">
                        {item.countText}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Features Row */}
        <div className="w-full py-5 px-6 sm:px-8 border border-[#EAE5D9]/40 bg-[#FAF8F5]/60 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#EAE5D9]/40">
            {FEATURE_ITEMS.map((feature, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex items-center gap-4 pt-4 sm:pt-0",
                  idx === 0 ? "pt-0" : "",
                  idx > 0 ? "lg:pl-6" : ""
                )}
              >
                {/* Icon Container */}
                <div className="w-9 h-9 rounded-full bg-white border border-[#EAE5D9]/40 flex items-center justify-center shrink-0 text-[#8C8273] shadow-3xs">
                  {feature.icon}
                </div>
                {/* Texts */}
                <div>
                  <h4 className="font-sans text-xs sm:text-sm font-bold text-[#1A1A1A] tracking-wide">
                    {feature.title}
                  </h4>
                  <p className="font-sans text-[10px] sm:text-xs text-[#8C8273] font-light mt-0.5">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
