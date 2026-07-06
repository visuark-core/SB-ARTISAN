import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { fetchProducts, HospitalityProduct } from "../product";
import ProductGrid from "../product/product-grid";
import { Container, SEO } from "../ui";
import { cn } from "../../lib/utils";

const FILTER_TABS = [
  { label: "All Objects", slug: "all" },
  { label: "Restaurant", slug: "restaurant" },
  { label: "Cafe & Bistro", slug: "cafe" },
  { label: "Bar Seating", slug: "bar" },
  { label: "Hotel & Lobby", slug: "hotel" },
  { label: "Cane & Rattan", slug: "cane" },
  { label: "Rope Weaving", slug: "rope" },
  { label: "Bone Inlay", slug: "bone" },
];

export default function CollectionsPage() {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueryParam = searchParams.get("search") || "";
  
  const [activeSlug, setActiveSlug] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(searchQueryParam);
  const [allProducts, setAllProducts] = useState<HospitalityProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<HospitalityProduct[]>([]);
  const [wishlistedIds, setWishlistedIds] = useState<string[]>(["ind-haveli-chair", "ind-shekhawati-bar"]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { openInquiry } = useOutletContext<{ openInquiry: (product: HospitalityProduct | null) => void }>();

  // Load all products initially to calculate tab counts
  useEffect(() => {
    fetchProducts({}).then((data) => {
      setAllProducts(data);
    }).catch(err => console.error(err));
  }, []);

  // Compute category counts dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProducts.length };
    allProducts.forEach((p) => {
      const cat = p.category ? p.category.toLowerCase() : "";
      if (cat.includes("restaurant")) counts["restaurant"] = (counts["restaurant"] || 0) + 1;
      if (cat.includes("cafe") || cat.includes("bistro")) counts["cafe"] = (counts["cafe"] || 0) + 1;
      if (cat.includes("bar")) counts["bar"] = (counts["bar"] || 0) + 1;
      if (cat.includes("hotel") || cat.includes("lobby")) counts["hotel"] = (counts["hotel"] || 0) + 1;
      if (cat.includes("cane") || cat.includes("rattan")) counts["cane"] = (counts["cane"] || 0) + 1;
      if (cat.includes("rope")) counts["rope"] = (counts["rope"] || 0) + 1;
      if (cat.includes("bone") || cat.includes("inlay")) counts["bone"] = (counts["bone"] || 0) + 1;
    });
    return counts;
  }, [allProducts]);

  // Synchronize searchQuery with search query param
  useEffect(() => {
    setSearchQuery(searchQueryParam);
  }, [searchQueryParam]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("search", val);
        return next;
      });
    } else {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("search");
        return next;
      });
    }
  };

  // Synchronize URL path with local filter tab state
  useEffect(() => {
    if (category) {
      setActiveSlug(category.toLowerCase());
    } else {
      setActiveSlug("all");
    }
  }, [category]);

  // Execute filtering & searching logic via API
  useEffect(() => {
    setIsLoading(true);
    const delayDebounce = setTimeout(() => {
      fetchProducts({
        category: activeSlug === "all" ? undefined : activeSlug,
        query: searchQuery || undefined
      }).then((data) => {
        setFilteredProducts(data);
        setIsLoading(false);
      }).catch(err => {
        console.error(err);
        setIsLoading(false);
      });
    }, 150); // slight debounce for search input

    return () => clearTimeout(delayDebounce);
  }, [activeSlug, searchQuery]);

  const handleTabClick = (slug: string) => {
    if (slug === "all") {
      navigate("/collections");
    } else {
      navigate(`/collections/${slug}`);
    }
  };

  const handleWishlistToggle = (id: string) => {
    setWishlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInquire = (id: string) => {
    const prod = filteredProducts.find((p) => p.id === id);
    if (prod) {
      openInquiry(prod);
    }
  };

  const handleTearSheet = (id: string) => {
    const prod = filteredProducts.find((p) => p.id === id);
    alert(`Atelier Tear Sheet Compiled:\n\nA dynamic PDF catalog dossier containing dimensions, wood options, and material specifications for "${prod?.title}" has been sent.`);
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "SB Artisan Curated B2B Collections",
    "description": "Browse our curated Jodhpur solid wood, cane, and bone inlay furniture collections crafted for international commercial contract projects.",
    "url": "https://www.sbartisan.com/collections"
  };

  return (
    <div className="pt-28 pb-20 bg-[#FDFCF7] text-[#1A1A1A]">
      <SEO 
        title="Curated Furniture Export Showrooms & Collections"
        description="Browse our contract furniture collections. SB Artisan manufactures restaurant, café, hotel lobby, and bar furniture from premium Indian timber."
        keywords="furniture collections showroom, Jodhpur export furniture, contract furniture catalog, commercial teak furniture wholesale"
        canonical="/collections"
        schema={schemaMarkup}
      />

      {/* 1. EDITORIAL HERO */}
      <section className="py-16 border-b border-[#EAE5D9] bg-[#FAF8F2]/50">
        <Container variant="default">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#8C6D4F]" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-[#8C6D4F] font-semibold">
                Atelier Directory
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight tracking-tight">
              The Curated Showrooms
            </h1>
            <p className="max-w-2xl font-serif text-base text-[#5A5751] font-light leading-relaxed">
              Browse hand-carved bone inlay, reclaimed teakwood, and organic cane and rope weaving collections crafted for premium hospitality. Select a showroom registry category or use the index lookup below.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. DYNAMIC CATEGORY FILTERING TABS & SEARCH */}
      <Container variant="default" className="py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#EAE5D9] pb-6">
          <div className="flex items-center overflow-x-auto scrollbar-none gap-2 max-w-full">
            {FILTER_TABS.map((tab) => {
              const isActive = activeSlug === tab.slug;
              const count = categoryCounts[tab.slug] || 0;
              return (
                <button
                  key={tab.slug}
                  onClick={() => handleTabClick(tab.slug)}
                  className={cn(
                    "text-[10px] tracking-widest uppercase font-mono py-2 px-3 border cursor-pointer outline-none transition-all duration-300 rounded-xs",
                    isActive
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                      : "bg-transparent text-[#6E6B64] border-[#EAE5D9] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                  )}
                >
                  {tab.label} <span className="text-[8px] opacity-70 ml-1">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Upgraded Search Input */}
          <div className="relative w-full lg:w-80 border border-[#EAE5D9] bg-white px-3 py-2.5 rounded-xs flex items-center gap-2 shadow-xs">
            <svg className="w-3.5 h-3.5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by wood, craft, name..."
              className="bg-transparent text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none w-full font-sans font-light border-none p-0"
            />
            {searchQuery && (
              <button 
                onClick={() => handleSearchChange("")} 
                className="text-[#8C8273] hover:text-[#1A1A1A] text-[9px] font-mono uppercase tracking-wider font-semibold border-none bg-transparent cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </Container>

      {/* 3. DYNAMIC CATALOG GRID */}
      <Container variant="default" className="pb-16">

        <div>
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-12">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="space-y-4 animate-pulse">
                  <div className="aspect-[3/4] bg-[#F5F2EA] w-full rounded-xs" />
                  <div className="h-4 bg-[#F5F2EA] w-1/3 rounded-xs" />
                  <div className="h-5 bg-[#F5F2EA] w-2/3 rounded-xs" />
                  <div className="h-4 bg-[#F5F2EA] w-full rounded-xs" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 border border-dashed border-[#EAE5D9] rounded-sm bg-[#FAF8F2]/50 max-w-lg mx-auto">
              <svg className="w-10 h-10 text-[#8C8273] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              <p className="font-serif text-base text-[#8C8273] font-light">No items found matching the filter criteria.</p>
              <p className="font-sans text-xs text-[#9E9B95] font-light">Try searching for other terms or selecting a different category tab.</p>
            </div>
          ) : (
            <ProductGrid
              products={filteredProducts}
              variant="editorial"
              columns={4}
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
