import React, { useEffect, useState, useMemo } from "react";
import { useParams, useOutletContext, Link, useSearchParams } from "react-router-dom";
import {
  fetchProducts,
  HospitalityProduct,
  ProductGrid,
  ProductFilter,
  ProductSort,
  Pagination,
} from "../product";
import { Container, SectionTitle, SEO, Heading, Paragraph } from "../ui";
import { cn } from "../../lib/utils";

// 1. CATEGORY CONFIGURATIONS & IMAGES FOR LATEST EDITORIAL SHOWCASE
interface CategoryConfig {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  subcategories: { name: string; slug: string; image: string }[];
  seoTitle: string;
  seoKeywords: string;
}

const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  "restaurant-furniture": {
    title: "Restaurant Furniture",
    eyebrow: "ARCHITECTURAL DINING SHOWCASE",
    description: "Explore our premium contract commercial restaurant furniture collection. SB Artisan is a wholesale exporter of solid wood restaurant dining chairs, teak dining tables, and serving casegoods custom-crafted in our Jodhpur factory.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Restaurant Chairs", slug: "restaurant-chairs", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=150&q=80" },
      { name: "Restaurant Tables", slug: "restaurant-tables", image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=150&q=80" },
      { name: "Restaurant Sofas", slug: "restaurant-sofas", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=150&q=80" },
      { name: "Outdoor Restaurant Furniture", slug: "outdoor-restaurant-furniture", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Commercial Restaurant Furniture Manufacturer & Exporter",
    seoKeywords: "commercial restaurant furniture manufacturer, wholesale teak dining tables, restaurant dining chairs exporter Jodhpur, contract hospitality tables India",
  },
  "cafe-furniture": {
    title: "Cafe Furniture",
    eyebrow: "BOUTIQUE BISTRO CONTRACTS",
    description: "Buy wholesale cafe and bistro furniture direct from our Jodhpur manufacturing plant. Weather-treated dining chairs, lightweight rattan cane café armchairs, and outdoor dining tables built for high-traffic cafes.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Café Chairs", slug: "cafe-chairs", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=150&q=80" },
      { name: "Café Tables", slug: "cafe-tables", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=150&q=80" },
      { name: "Café Benches", slug: "cafe-benches", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=150&q=80" },
      { name: "Outdoor Café Furniture", slug: "outdoor-cafe-furniture", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Bespoke Cafe Bistro Chairs & Tables Exporter | Jodhpur Factory",
    seoKeywords: "bespoke cafe furniture exporter, wholesale outdoor cafe tables, rattan cafe seating supplier Jodhpur, commercial bistro table manufacturer",
  },
  "bar-furniture": {
    title: "Bar Furniture",
    eyebrow: "UPMARKET LOUNGE COCKTAILS",
    description: "Source Jodhpur bone inlay bar cabinets, custom wholesale barstools, and leather-wrapped cocktail bar counters. Hand-crafted contract bar furniture designed for luxury hotel lounges and upscale restaurants.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Bar Chairs", slug: "bar-chairs", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=150&q=80" },
      { name: "Bar Stools", slug: "bar-stools", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80" },
      { name: "Bar Tables", slug: "bar-tables", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=80" },
      { name: "Outdoor Bar Furniture", slug: "outdoor-bar-furniture", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Bone Inlay Bar Cabinets & Contract Stools Supplier",
    seoKeywords: "bone inlay bar cabinet manufacturer Jodhpur, custom contract barstools supplier, hospitality bar furniture, luxury home bar cabinets India",
  },
  "hotel-furniture": {
    title: "Hotel Furniture",
    eyebrow: "PREMIUM LOBBY & SUITE OBJECTS",
    description: "Procure luxury hotel furniture, grand lobby tables, custom carved consoles, and guest suite reading loungers direct from India's contract furniture manufacturer. Generational Jodhpur woodwork tailored to FF&E specifications.",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Hotel Dining Chairs", slug: "hotel-dining-chairs", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=150&q=80" },
      { name: "Hotel Dining Tables", slug: "hotel-dining-tables", image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=150&q=80" },
      { name: "Hotel Room Chairs", slug: "hotel-room-chairs", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=150&q=80" },
      { name: "Coffee Tables", slug: "coffee-tables", image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=150&q=80" },
      { name: "Bedside Tables", slug: "bedside-tables", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Luxury Hotel & Resort Lobby Furniture Manufacturer India",
    seoKeywords: "hotel furniture manufacturer India, luxury resort lobby console supplier, hotel guest suite furniture Jodhpur, FF&E contract furniture contractor",
  },
  "cane-furniture": {
    title: "Cane Furniture",
    eyebrow: "WET-BENT RESORT WEAVINGS",
    description: "Premium handmade rattan cane resort furniture. We export organically steam-bent cane loungers, tropical rattan dining chairs, and cane accent tables direct from Jodhpur workshops to global boutique hotels.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Cane Chairs", slug: "cane-chairs", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Dining Chairs", slug: "cane-dining-chairs", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Bar Stools", slug: "cane-bar-stools", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Sofa Sets", slug: "cane-sofa-sets", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Sideboards", slug: "cane-sideboards", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Coffee Tables", slug: "cane-coffee-tables", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Bedside Tables", slug: "cane-bedside-tables", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=150&q=80" },
      { name: "Cane Cabinets", slug: "cane-cabinets", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Rattan Cane Resort Furniture Exporter | Jodhpur Hand-Woven",
    seoKeywords: "rattan cane resort furniture exporter, tropical cane armchairs, Jodhpur handmade cane loungers, wholesale rattan table supplier",
  },
  "bone-inlay-furniture": {
    title: "Bone Inlay Furniture",
    eyebrow: "ROYAL JODHPUR RESIN CASEGOODS",
    description: "Global Jodhpur bone inlay furniture exporter. Custom resin color inlay cabinets, geometric dresser casegoods, and floral mother of pearl accent tables manufactured for interior designers and wholesale importers.",
    image: "/images/hero1.png",
    subcategories: [
      { name: "Bone Inlay Storage Cabinets", slug: "bone-inlay-storage-cabinets", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=150&q=80" },
      { name: "Bone Inlay Sideboards", slug: "bone-inlay-sideboards", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=150&q=80" },
      { name: "Bone Inlay Bedside Tables", slug: "bone-inlay-bedside-tables", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=150&q=80" },
      { name: "Bone Inlay Coffee Tables", slug: "bone-inlay-coffee-tables", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=80" },
      { name: "Bone Inlay Side Tables", slug: "bone-inlay-side-tables", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Jodhpur Bone Inlay Furniture Exporter & Supplier | Custom Resins",
    seoKeywords: "Jodhpur bone inlay furniture exporter, wholesale mother of pearl cabinets, custom resin inlay dressers, bone inlay accent tables India",
  },
  "rope-furniture": {
    title: "Rope Furniture",
    eyebrow: "ORGANIC COIR & JUTE BINDINGS",
    description: "Wholesale traditional Indian rope daybeds (charpai), wabi-sabi woven jute benches, and coir rope stools. Ideal for eco-resorts, wellness centers, and coastal hospitality projects.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=90",
    subcategories: [
      { name: "Rope Chairs", slug: "rope-chairs", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80" },
      { name: "Rope Stools", slug: "rope-stools", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80" },
      { name: "Rope Sofa Sets", slug: "rope-sofa-sets", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=150&q=80" },
      { name: "Rope Benches", slug: "rope-benches", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=150&q=80" },
      { name: "Rope Outdoor Furniture", slug: "rope-outdoor-furniture", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=150&q=80" },
    ],
    seoTitle: "Indian Rope Daybeds & Benches Manufacturer | Woven Furniture",
    seoKeywords: "Indian rope daybed exporter, wholesale woven jute benches, traditional charpai daybeds Jodhpur, coir rope stools manufacturer",
  },
};


const ITEMS_PER_PAGE = 8;

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const isBoneInlay = slug?.toLowerCase() === "bone-inlay-furniture";
  const { openInquiry } = useOutletContext<{ openInquiry: (product: HospitalityProduct | null) => void }>();
  const [searchParams] = useSearchParams();
  const subQuery = searchParams.get("sub") || "all";

  // Resolve config or fallback
  const config = useMemo(() => {
    const key = slug?.toLowerCase() || "";
    return CATEGORY_CONFIGS[key] || CATEGORY_CONFIGS["restaurant-furniture"];
  }, [slug]);

  // Component states
  const [allProducts, setAllProducts] = useState<HospitalityProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState(subQuery);
  const [activeMaterial, setActiveMaterial] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  // Reset states when changing category slug or subquery
  useEffect(() => {
    setSearchQuery("");
    setActiveSubcategory(subQuery);
    setActiveMaterial("all");
    setSortBy("featured");
    setCurrentPage(1);
    setIsFiltersExpanded(false);
  }, [slug, subQuery]);

  // Load products database
  useEffect(() => {
    setIsLoading(true);
    fetchProducts().then((data) => {
      setAllProducts(data);
      setIsLoading(false);
    });
  }, []);

  // Extract unique materials for the active category
  const categoryMaterials = useMemo(() => {
    const catProducts = allProducts.filter((p) =>
      p.category.toLowerCase().includes(config.title.split(" ")[0].toLowerCase())
    );
    const mats = catProducts.flatMap((p) => p.materials);
    // Standardize to top material categories
    const commonMats = ["Teakwood", "Cane", "Bone", "Resin", "Rosewood", "Rope", "Brass", "Leather"];
    const matched = commonMats.filter((m) =>
      mats.some((pm) => pm.toLowerCase().includes(m.toLowerCase()))
    );
    return matched.length > 0 ? matched : ["Teakwood", "Cane", "Brass"];
  }, [allProducts, config]);

  // Filter, Search, and Sort Pipeline
  const filteredAndSorted = useMemo(() => {
    let result = allProducts.filter((p) => {
      // 1. Match primary category name (e.g. Restaurant Furniture matches "Restaurant")
      const catKeyword = config.title.split(" ")[0].toLowerCase();
      return p.category.toLowerCase().includes(catKeyword);
    });

    // 2. Filter by subcategory tab
    if (activeSubcategory !== "all") {
      result = result.filter((p) => {
        const sub = p.subcategory.toLowerCase();
        const targetSub = activeSubcategory.toLowerCase().replace(/-/g, " ");
        const tags = p.tags.map((t) => t.toLowerCase());
        
        return sub.includes(targetSub) || targetSub.includes(sub) || tags.includes(activeSubcategory.toLowerCase());
      });
    }

    // 3. Filter by Material
    if (activeMaterial !== "all") {
      result = result.filter((p) =>
        p.materials.some((m) => m.toLowerCase().includes(activeMaterial.toLowerCase()))
      );
    }

    // 4. Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.materials.some((m) => m.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 5. Sort Execution
    if (sortBy === "price-asc") {
      result.sort((a, b) => {
        const valA = parseFloat(a.price?.replace(/[^0-9.]/g, "") || "0");
        const valB = parseFloat(b.price?.replace(/[^0-9.]/g, "") || "0");
        return valA - valB;
      });
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => {
        const valA = parseFloat(a.price?.replace(/[^0-9.]/g, "") || "0");
        const valB = parseFloat(b.price?.replace(/[^0-9.]/g, "") || "0");
        return valB - valA;
      });
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      // Default: featured first, then new
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [allProducts, config, activeSubcategory, activeMaterial, searchQuery, sortBy]);

  // Pagination bounds
  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSorted, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of product grid
    const target = document.getElementById("catalog-grid-anchor");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleClearAll = () => {
    setActiveMaterial("all");
    setSearchQuery("");
    setCurrentPage(1);
  };



  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${config.title} - Sourcing & Custom Manufacturing Catalogue`,
    "description": config.description,
    "url": `https://www.sbartisan.com/category/${slug}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "SB Artisan Jodhpur",
      "image": "https://www.sbartisan.com/images/commercial_workshop_custom.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Phase II, Basni Industrial Area",
        "addressLocality": "Jodhpur",
        "addressRegion": "Rajasthan",
        "postalCode": "342005",
        "addressCountry": "IN"
      }
    }
  };



  return (
    <div className="pt-28 pb-20 bg-[#FDFCF7]">
      <SEO 
        title={config.seoTitle}
        description={config.description}
        keywords={config.seoKeywords}
        canonical={`/category/${slug}`}
        schema={schemaMarkup}
      />

      {/* Category Hero Photo Banner */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-[#1E1D1C] border-b border-[#F2EDE2]",
          !isBoneInlay && "aspect-[3.2/1]"
        )}
        style={isBoneInlay ? { aspectRatio: "5000 / 838" } : undefined}
      >
        <div className="absolute inset-0 w-full h-full">
          <img
            src={config.image}
            alt={`${config.title} Showroom`}
            className={cn(
              "w-full h-full transition-transform duration-10000 hover:scale-105",
              isBoneInlay ? "opacity-100 object-fill" : "opacity-85 object-cover object-center"
            )}
          />
          {/* Subtle gradient shading overlay for luxury magazine aesthetic */}
          {!isBoneInlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
          )}
        </div>
        
        {/* Banner Content Overlay */}
        {!isBoneInlay && (
          <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-3.5 sm:py-6 md:py-8 text-white max-w-[1600px] mx-auto w-full">
            <div className="space-y-2 md:space-y-2.5 md:max-w-3xl">
              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-mono text-[#CBB593] font-semibold block">
                {config.eyebrow}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-light tracking-wide text-white leading-tight">
                {config.title}
              </h1>
              <div className="w-12 h-[1px] bg-[#CBB593] my-1" />
              <p className="font-sans text-[10px] sm:text-xs text-gray-300 font-light leading-relaxed max-w-2xl hidden sm:block">
                {config.description}
              </p>
            </div>
          </div>
        )}
      </div>

      <Container variant="wide" className="space-y-12 md:space-y-16 pt-8 md:pt-12">
        


        <div id="catalog-grid-anchor" className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start pt-4">
          
          {/* Mobile Filters Toggle Button */}
          <div className="w-full lg:hidden">
            <button
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              className="w-full py-3.5 px-4 border border-[#EAE5D9] bg-[#FAF8F2] flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300 rounded-sm"
            >
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {isFiltersExpanded ? "Hide Filters & Refine" : "Show Filters & Refine"}
              </span>
              {(activeMaterial !== "all" || searchQuery) && (
                <span className="bg-[#8C6D4F] text-white text-[8px] px-2 py-0.5 rounded-full font-light tracking-wide uppercase font-sans">
                  Active
                </span>
              )}
            </button>
          </div>

          {/* 4. LEFT COLUMN: Filter & Search Panel */}
          <div className={cn(
            "lg:col-span-3 space-y-8 lg:sticky lg:top-28 w-full",
            isFiltersExpanded ? "block" : "hidden lg:block"
          )}>
            
            {/* Search Input */}
            <div className="space-y-3.5">
              <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C8273] font-semibold">
                Registry Search
              </h4>
              <div className="relative border-b border-[#2C2B29] pb-1.5 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#8C8273]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by wood, craft..."
                  className="bg-transparent text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none w-full font-sans font-light"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[#8C8273] hover:text-[#1A1A1A] text-[9px] font-sans uppercase tracking-wider font-light"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Material Filters */}
            <ProductFilter
              materials={categoryMaterials}
              activeMaterial={activeMaterial}
              onMaterialChange={(mat) => {
                setActiveMaterial(mat);
                setCurrentPage(1);
              }}
              onClear={handleClearAll}
            />

            {/* Sorting dropdown */}
            <ProductSort
              sortBy={sortBy}
              onSortChange={(sort) => {
                setSortBy(sort);
                setCurrentPage(1);
              }}
            />

            {/* General Consultation Promo Card */}
            <div className="border border-[#EAE5D9] bg-[#FAF8F2] p-5 rounded-sm space-y-4 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hidden lg:block">
              <span className="text-[8px] uppercase tracking-[0.25em] font-semibold text-[#8C8273] block">
                Trade Concierge Desk
              </span>
              <h5 className="font-serif text-sm font-light text-[#1A1A1A] leading-tight">
                Architect & Designer Account
              </h5>
              <p className="font-sans text-[10px] text-[#6E6B64] font-light leading-relaxed">
                Unlock wholesale export rates, customs brokerage support, and bespoke custom dimensions for hospitality commissions.
              </p>
              <button
                onClick={() => openInquiry(null)}
                className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white text-[9px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-sm"
              >
                Discuss Project
              </button>
            </div>

          </div>

          {/* 5. RIGHT COLUMN: Dynamic Showcase Grid */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Active filters status summary */}
            <div className="flex items-baseline justify-between select-none text-[10px] tracking-wider uppercase text-[#8C8273] font-sans border-b border-[#F2EDE2]/60 pb-3">
              <span>
                Displaying {filteredAndSorted.length} {filteredAndSorted.length === 1 ? "Object" : "Objects"}
              </span>
              <span>
                Page {currentPage} of {Math.max(1, totalPages)}
              </span>
            </div>

            {/* Product Grid component */}
            <ProductGrid
              products={paginatedProducts}
              variant="editorial"
              columns={4}
              forceColumns={true}
              hideDesigner={true}
              hideDescription={true}
              isLoading={isLoading}
              wishlistedIds={[]}
              onInquire={(id) => {
                const prod = allProducts.find((p) => p.id === id);
                if (prod) openInquiry(prod);
              }}
            />

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

          </div>

        </div>





      </Container>
    </div>
  );
}
