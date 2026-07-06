import React, { useEffect, useState } from "react";
import { fetchProducts, INDIAN_HOSPITALITY_PRODUCTS, HospitalityProduct } from "../product";
import ProductGrid from "../product/product-grid";
import { Container, SectionTitle, SEO } from "../ui";
import { cn } from "../../lib/utils";

const CASEGOODS_TABS = [
  { label: "All Casegoods", slug: "all" },
  { label: "Cabinets & Credenzas", slug: "cabinets" },
  { label: "Bistro Tables", slug: "bistro" },
  { label: "Coffee Tables", slug: "coffee" },
];

export default function AtelierCasegoodsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [products, setProducts] = useState<HospitalityProduct[]>([]);
  const [wishlistedIds, setWishlistedIds] = useState<string[]>(["ind-shekhawati-bar"]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    // Fetch and filter casegoods items (tables, cabinets, storage)
    fetchProducts().then((data) => {
      // Casegoods categories / tags filter
      const casegoodsData = data.filter((p) =>
        p.category.includes("Bone Inlay") ||
        p.category.includes("Hotel") ||
        p.tags.some(t => ["table", "cabinet", "credenza", "sideboard", "storage"].includes(t.toLowerCase()))
      );

      if (activeTab === "all") {
        setProducts(casegoodsData);
      } else {
        const filtered = casegoodsData.filter((p) => {
          const sub = p.subcategory.toLowerCase();
          const tags = p.tags.map(t => t.toLowerCase());
          
          if (activeTab === "cabinets") return sub.includes("cabinet") || sub.includes("storage") || tags.includes("credenza") || tags.includes("cabinet");
          if (activeTab === "bistro") return tags.includes("bistro") || (sub.includes("table") && p.title.toLowerCase().includes("bistro"));
          if (activeTab === "coffee") return tags.includes("coffee table") || tags.includes("coffee");
          return true;
        });
        setProducts(filtered);
      }
      setIsLoading(false);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const handleWishlistToggle = (id: string) => {
    setWishlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInquire = (id: string) => {
    const prod = products.find((p) => p.id === id) || INDIAN_HOSPITALITY_PRODUCTS.find((p) => p.id === id);
    alert(`Acquisition Desk Inquiry Registered:\n\nObject: ${prod?.title}\nAtelier: ${prod?.designer}\n\nOur private concierge desk will contact you shortly regarding custom sizes and estimates.`);
  };

  const handleTearSheet = (id: string) => {
    const prod = products.find((p) => p.id === id) || INDIAN_HOSPITALITY_PRODUCTS.find((p) => p.id === id);
    alert(`Atelier Tear Sheet Compiled:\n\nA dynamic PDF catalog dossier for "${prod?.title}" has been sent.`);
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Atelier B2B Casegoods & Tables",
    "description": "Explore our hand-inlaid bone bar cabinets, custom Mango wood credenzas, and monolithic ancient teak coffee tables direct from Jodhpur.",
    "url": "https://www.sbartisan.com/atelier-casegoods"
  };

  return (
    <div className="pt-28 pb-20 bg-[#FDFCF7]">
      <SEO 
        title="Atelier Casegoods & Tables Manufacturer | Jodhpur"
        description="Source premium Jodhpur bone inlay cabinets, wholesale mango wood credenzas, and contract dining/coffee tables custom-built for hotels & resorts."
        keywords="hotel bar cabinets, wholesale mango wood credenzas, Jodhpur tables exporter, contract casegoods manufacturer"
        canonical="/atelier-casegoods"
        schema={schemaMarkup}
      />

      {/* Category Hero Photo Banner */}
      <div className="relative w-full aspect-[4.5/1] overflow-hidden bg-[#1E1D1C] border-b border-[#F2EDE2]">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/hero1.png"
            alt="Atelier Casegoods & Tables Showroom"
            className="w-full h-full object-cover object-left opacity-85 transition-transform duration-10000 hover:scale-105"
          />
          {/* Subtle gradient shading overlay for luxury magazine aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        </div>
        
        {/* Banner Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-3.5 sm:py-6 md:py-8 text-white max-w-[1600px] mx-auto w-full">
          <div className="space-y-2 md:space-y-3.5 md:max-w-3xl">
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-mono text-[#CBB593] font-semibold block">
              CONTRACT CATALOG
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-white leading-tight">
              Atelier Casegoods & Tables
            </h1>
            <div className="w-12 h-[1px] bg-[#CBB593] my-1" />
            <p className="font-sans text-[10px] sm:text-xs text-gray-300 font-light leading-relaxed max-w-2xl hidden sm:block">
              Explore our hand-inlaid bone bar cabinets, custom Mango wood credenzas, and monolithic ancient teak coffee tables.
            </p>
          </div>
        </div>
      </div>

      <Container variant="default" className="space-y-10 pt-8 md:pt-12">

        {/* Dynamic Category Filtering Tabs */}
        <div className="flex items-center border-b border-[#F2EDE2] pb-4 overflow-x-auto scrollbar-none gap-2 md:gap-4">
          {CASEGOODS_TABS.map((tab) => {
            const isActive = activeTab === tab.slug;
            return (
              <button
                key={tab.slug}
                onClick={() => setActiveTab(tab.slug)}
                className={cn(
                  "text-[10px] tracking-[0.22em] uppercase font-sans py-2.5 px-4 transition-all duration-300 relative font-medium whitespace-nowrap",
                  isActive ? "text-[#1A1A1A]" : "text-[#8C8273] hover:text-[#1A1A1A]"
                )}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-[-17px] left-0 w-full h-[1.5px] bg-[#1A1A1A]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Catalog Grid */}
        <div className="pt-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="space-y-4 animate-pulse">
                  <div className="aspect-[3/4] bg-[#F5F2EA] w-full" />
                  <div className="h-4 bg-[#F5F2EA] w-1/3" />
                  <div className="h-5 bg-[#F5F2EA] w-2/3" />
                  <div className="h-4 bg-[#F5F2EA] w-full" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="font-serif text-lg text-[#8C8273] font-light">No items found matching the filter criteria.</p>
              <p className="font-sans text-xs text-[#9E9B95] font-light">Try selecting a different subcategory tab.</p>
            </div>
          ) : (
            <ProductGrid
              products={products}
              variant="editorial"
              columns={3}
              wishlistedIds={wishlistedIds}
              onInquire={handleInquire}
              onTearSheet={handleTearSheet}
              onWishlistToggle={handleWishlistToggle}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
