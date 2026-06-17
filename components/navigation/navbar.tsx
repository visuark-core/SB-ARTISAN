import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { NAVIGATION_DATA, NavItem } from "./nav-data";
import Container from "../ui/Container";
import Heading from "../ui/Heading";
import IconButton from "../ui/IconButton";
import NavLink from "./nav-link";
import MegaMenu from "./mega-menu";
import MobileMenu from "./mobile-menu";
import SearchButton from "./search-button";

const ROUTE_MAPPING: Record<string, string[]> = {
  "Hospitality Range": [
    "/collections",
    "/collections/restaurant",
    "/collections/cafe",
    "/collections/bar",
    "/collections/hotel",
    "/category/restaurant-furniture",
    "/category/cafe-furniture",
    "/category/bar-furniture",
    "/category/hotel-furniture"
  ],
  "Material & Craft": [
    "/collections/cane",
    "/collections/rope",
    "/collections/bone",
    "/category/cane-furniture",
    "/category/bone-inlay-furniture",
    "/category/rope-furniture"
  ],
  "Bespoke Trade": [
    "/bespoke-services",
    "/bespoke"
  ],
  "Projects": [
    "/projects"
  ],
  "Our Story": [
    "/our-story",
    "/about"
  ],
  "Journal": [
    "/journal"
  ],
  "Contact Desk": [
    "/contact"
  ],
  "Admin Panel": [
    "/admin",
    "/admin/dashboard",
    "/admin/products",
    "/admin/categories",
    "/admin/collections",
    "/admin/inquiries",
    "/admin/blogs",
    "/admin/settings"
  ]
};

interface NavbarProps {
  onOpenInquiry?: () => void;
}

/**
 * Premium master Header & Navbar layout system.
 * Incorporates dynamic scroll transparency, Framer Motion mega menus with delay timeouts,
 * search button triggers, and full-screen mobile drawers.
 */
export default function Navbar({ onOpenInquiry }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenuIdx, setActiveMenuIdx] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Ref for handling hover exit delays
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Monitor viewport scroll Y coordinates
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for escape key press to close active dropdown menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenuIdx(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Hover open triggers with slight debouncing
  const handleMouseEnter = (idx: number, item: NavItem) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    if (item.megaMenu) {
      setActiveMenuIdx(idx);
    } else {
      setActiveMenuIdx(null);
    }
  };

  // Hover exit triggers with timeout delays to prevent screen flashing
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenuIdx(null);
    }, 200); // 200ms grace period
  };

  const handleMenuLinkEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  return (
    <>
      <header
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out border-b ${
          isScrolled
            ? "bg-[#FDFCF7]/95 backdrop-blur-md border-[#EAE5D9] py-3 md:py-4 shadow-[0_2px_15px_rgba(0,0,0,0.015)]"
            : "bg-transparent border-transparent py-5 md:py-7"
        }`}
      >
        <Container padding="compact" className="relative">
          <div className="flex items-center justify-between gap-4 lg:gap-6">
            
            {/* 1. BRAND LOGO MARK */}
            <div className="flex items-center shrink-0">
              <Link to="/" className="outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 rounded">
                <Heading variant="sm" weight="normal" className="text-[11px] sm:text-xs tracking-[0.35em] sm:tracking-[0.45em] uppercase select-none transition-all duration-300 text-[#1A1A1A]">
                  SB ARTISAN
                </Heading>
              </Link>
            </div>

            {/* 2. DESKTOP NAVIGATION - CENTERED */}
            <nav className="hidden lg:flex items-center justify-center flex-1 min-w-0" role="navigation" aria-label="Main Navigation">
              <div className="flex items-center gap-2 lg:gap-3 xl:gap-4 2xl:gap-5">
                {NAVIGATION_DATA.map((item, idx) => {
                  const hasMega = !!item.megaMenu;
                  
                  const normalizedPath = location.pathname.endsWith("/") && location.pathname.length > 1
                    ? location.pathname.slice(0, -1)
                    : location.pathname;

                  const routes = ROUTE_MAPPING[item.label] || [];
                  const isCurrentRoute = routes.includes(normalizedPath);

                  const isActive = activeMenuIdx !== null ? activeMenuIdx === idx : isCurrentRoute;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => handleMouseEnter(idx, item)}
                      onMouseLeave={handleMouseLeave}
                      className="h-full shrink-0"
                    >
                      <NavLink
                        href={item.href || "/"}
                        isActive={isActive}
                        aria-haspopup={hasMega ? "menu" : undefined}
                        aria-expanded={hasMega ? activeMenuIdx === idx : undefined}
                        onClick={() => {
                          setActiveMenuIdx(null);
                        }}
                      >
                        {item.label}
                      </NavLink>
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* 3. UTILITIES & ACTIONS */}
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 shrink-0">
              
              {/* Expandable Search Input */}
              <SearchButton />

              {/* Direct WhatsApp Consultation Icon - Hidden on very small screens to save space */}
              <a
                href="https://wa.me/919999999999?text=Hello%20SB%20Artisan%2C%20I%20would%20like%20to%20discuss%20a%20hospitality%20furniture%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xs:inline-flex items-center justify-center w-9 h-9 text-[#5A5750] hover:text-[#1A1A1A] hover:bg-[#F5F2EA] transition-all duration-300 rounded-full"
                title="WhatsApp Trade Desk"
                aria-label="Contact via WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.897 14.11 1.867 11.47 1.867c-5.436 0-9.86 4.42-9.864 9.864 0 1.685.443 3.329 1.288 4.776L1.879 21.08l4.768-1.256c.001 0 .001 0 0 0zm11.758-5.321c-.266-.134-1.579-.78-1.823-.867-.243-.088-.42-.132-.596.133-.176.265-.681.861-.836 1.039-.153.176-.308.199-.575.066-.267-.134-1.129-.417-2.15-1.328-.793-.708-1.329-1.582-1.485-1.848-.156-.266-.017-.409.117-.541.12-.12.267-.309.4-.464.133-.155.177-.265.267-.442.089-.176.044-.331-.022-.464-.066-.133-.596-1.436-.816-1.966-.215-.518-.453-.448-.623-.456-.16-.008-.344-.01-.528-.01-.184 0-.485.069-.739.344-.254.275-.97.949-.97 2.314 0 1.365.992 2.68 1.114 2.846.122.166 1.953 2.983 4.73 4.181.661.285 1.176.455 1.579.583.664.211 1.269.181 1.747.11.533-.08 1.579-.646 1.8-.1237.221-.592.221-1.101.155-1.192-.066-.091-.243-.135-.508-.269z" />
                </svg>
              </a>

              {/* Discuss Project Desktop Button */}
              {onOpenInquiry && (
                <button
                  onClick={onOpenInquiry}
                  className="hidden sm:inline-block font-sans text-[9px] uppercase tracking-[0.24em] font-medium py-2.5 px-3 lg:px-4 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCF7] transition-all duration-300 rounded-sm whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2"
                >
                  Discuss Project
                </button>
              )}

              {/* Mobile Drawer Toggle Hamburger Button */}
              <IconButton
                size="sm"
                aria-label="Toggle Navigation Drawer"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden border-none hover:bg-transparent text-[#5A5750] hover:text-[#1A1A1A] shrink-0"
              >
                <svg className="w-5 h-4" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </IconButton>
            </div>

          </div>

          {/* 4. MEGA MENU OVERLAY (within header boundary) */}
          <AnimatePresence>
            {activeMenuIdx !== null && NAVIGATION_DATA[activeMenuIdx]?.megaMenu && (
              <MegaMenu
                key={activeMenuIdx}
                config={NAVIGATION_DATA[activeMenuIdx].megaMenu!}
                onMouseEnter={handleMenuLinkEnter}
                onMouseLeave={handleMouseLeave}
              />
            )}
          </AnimatePresence>

        </Container>
      </header>

      {/* 5. MOBILE OVERLAY PANEL DRAWER */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
