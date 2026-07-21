import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { INDIAN_HOSPITALITY_PRODUCTS, fetchFeaturedProducts, HospitalityProduct } from "./product";
import { SEO } from "./ui";
import {
  HeroSection,
  FeaturedCategories,
  FeaturedCollections,
  ShopByRoom,
  BestSellers,
  LuxuryBanner,
  BlogPreview,
  InquiryCTA,
  ChroniclesBanner,
  CATEGORIES_DATA,
  COLLECTIONS_DATA,
  BLOG_ARTICLES,
  HERO_SLIDES,
} from "./sections";

export default function Homepage() {
  const [wishlistedIds, setWishlistedIds] = useState<string[]>(["ind-haveli-chair", "ind-shekhawati-bar"]);
  const [featuredProducts, setFeaturedProducts] = useState<HospitalityProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { openInquiry } = useOutletContext<{ openInquiry: (product: HospitalityProduct | null) => void }>();

  // Load featured products from simulated API
  useEffect(() => {
    let isMounted = true;
    fetchFeaturedProducts().then((data) => {
      if (isMounted) {
        setFeaturedProducts(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Track registry bookmarks
  const handleWishlistToggle = (id: string) => {
    setWishlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Inquiry triggers
  const handleInquire = (id: string) => {
    const prod = featuredProducts.find((p) => p.id === id) || INDIAN_HOSPITALITY_PRODUCTS.find((p) => p.id === id);
    if (prod) {
      openInquiry(prod);
    }
  };

  // Tear sheet downloads
  const handleTearSheet = (id: string) => {
    const prod = featuredProducts.find((p) => p.id === id) || INDIAN_HOSPITALITY_PRODUCTS.find((p) => p.id === id);
    if (prod) {
      alert(
        `Atelier Tear Sheet Compiled:\n\nA dynamic PDF dossier containing structural dimensions, wood options, and material care instructions for "${prod.title}" has been compiled and emailed.`
      );
    }
  };

  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SB Artisan",
    "url": "https://www.sbartisan.com",
    "logo": "https://www.sbartisan.com/images/commercial_workshop_custom.png",
    "description": "Premium solid wood furniture manufacturer & exporter in Jodhpur, India. We supply custom contract and hospitality furniture collections globally.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "SB-Artisan, iStart Nest Incubation Center, Vikramaditya Nagar, Surya Colony",
      "addressLocality": "Jodhpur",
      "addressRegion": "Rajasthan",
      "postalCode": "342011",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-89490-51324",
      "contactType": "Export Sales Desk",
      "email": "contact@sbartisan.com"
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFCF7] text-[#1A1A1A] antialiased selection:bg-[#EAE5D9] selection:text-[#1A1A1A]">
      <SEO
        title="India's Trusted Furniture Supplier & Exporter | Handcrafted Wooden Furniture | SB Artisan "
        description="SB Artisan is India's trusted furniture supplier & exporter, offering handcrafted wooden furniture, hotel furniture, restaurant furniture, café furniture, rope furniture, cane furniture, bone inlay furniture, and custom hospitality solutions for global buyers."
        keywords="Furniture Manufacturer India, Furniture Exporter India, Hotel Furniture Manufacturer, Restaurant Furniture Supplier, Cafe Furniture Manufacturer, Bar Furniture Supplier, Cane Furniture Manufacturer, Bone Inlay Furniture Exporter, Rope Furniture Manufacturer, Custom Furniture Manufacturer India, solid wood furniture exporter Jodhpur"
        canonical="/"
        schema={homepageSchema}
      />
      {/* 2. CINEMATIC HERO SECTION */}
      <HeroSection slides={HERO_SLIDES} />


      {/* 3. FEATURING CATEGORIES */}
      <FeaturedCategories categories={CATEGORIES_DATA} />

      {/* 4. PHILOSOPHY INTERSTITIAL BANNER */}
      <LuxuryBanner image="/images/home-hero.png" />

      {/* 5. ACCLAIMED OBJECTS SHOWCASE (BEST SELLERS) */}
      <BestSellers
        products={featuredProducts}
        isLoading={isLoading}
        wishlistedIds={wishlistedIds}
        onInquire={handleInquire}
        onTearSheet={handleTearSheet}
        onWishlistToggle={handleWishlistToggle}
      />

      {/* 6. DETAILED COLLECTIONS STORIES */}
      <FeaturedCollections collections={COLLECTIONS_DATA} />

      {/* 7. SHOP BY ROOM CATEGORIES */}
      <ShopByRoom />

      {/* 8. ATELIER JOURNAL PREVIEWS */}
      <BlogPreview articles={BLOG_ARTICLES} />

      {/* 8.5 CHRONICLES BRAND BANNER */}
      <ChroniclesBanner />

      {/* 9. PRIVATE INQUIRY CALL-TO-ACTION */}
      <InquiryCTA />
    </div>
  );
}
export type { Homepage };

