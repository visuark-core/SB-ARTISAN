import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import FooterColumn from "./footer-column";

import SocialLinks from "./social-links";
import { Container } from "../ui";

interface FooterProps {
  className?: string;
  brandName?: string;
  tagline?: string;
}

export default function Footer({
  className,
  brandName = "SB Artisan",
  tagline = "Authentic Indian craftsmanship, engineered for premium hospitality.",
}: FooterProps) {
  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer
      className={cn(
        "relative bg-[#0F0E0D] text-[#EAE5D9] pt-24 pb-12 border-t border-[#1D1C1A] overflow-hidden selection:bg-[#EAE5D9] selection:text-[#0F0E0D]",
        className
      )}
    >
      {/* Editorial subtle light beam background effect (restrained) */}
      <div className="absolute inset-0 bg-radial-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <Container variant="default" className="relative z-10 space-y-16">
        


        {/* Main Grid: 5 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 lg:gap-y-8 pb-16 border-b border-[#23211F]">
          
          {/* Section 1: About Company - spans 3 cols */}
          <div className="lg:col-span-3 space-y-4 md:space-y-6">
            <h4 className="font-sans text-xs uppercase tracking-[0.25em] font-medium text-[#EAE5D9]">
              About Company
            </h4>
            <div className="space-y-4 font-sans text-xs text-[#8C8273] font-light leading-relaxed">
              <p className="text-justify">
                Rooted in Indian craftsmanship, SB Artisan supplies and exports handcrafted furniture for hotels, restaurants, cafés, resorts, and luxury interiors. We deliver custom furniture solutions that combine artisan heritage, premium quality, and global standards.
              </p>
              <div className="pt-3 flex flex-wrap gap-x-3 gap-y-2 border-t border-[#23211F]">
                <span className="text-[9px] uppercase tracking-wider text-[#EAE5D9] bg-[#161513] px-2.5 py-1 rounded-sm border border-[#23211F]">
                  FSC® Certified
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#EAE5D9] bg-[#161513] px-2.5 py-1 rounded-sm border border-[#23211F]">
                  Vriksh Legal
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#EAE5D9] bg-[#161513] px-2.5 py-1 rounded-sm border border-[#23211F]">
                  EPCH India
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Product Categories - spans 2 cols */}
          <FooterColumn
            title="Product Categories"
            links={[
              { label: "Restaurant Seating", href: "/category/restaurant-furniture" },
              { label: "Bistro Seating", href: "/category/cafe-furniture" },
              { label: "Hotel & Resort Casegoods", href: "/category/hotel-furniture" },
              { label: "Bone Inlay Cabinets", href: "/category/bone-inlay-furniture" },
              { label: "Rattan Cane Systems", href: "/category/cane-furniture" },
              { label: "Woven Rope Seating", href: "/category/rope-furniture" },
            ]}
            className="lg:col-span-2 md:pl-2"
          />

          {/* Section 3: Export Information - spans 2 cols */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <h4 className="font-sans text-xs uppercase tracking-[0.25em] font-medium text-[#EAE5D9]">
              Export Information
            </h4>
            <div className="space-y-4 font-sans text-xs text-[#8C8273] font-light leading-relaxed">
              <ul className="space-y-3.5">
                <li className="space-y-0.5">
                  <span className="block text-[#EAE5D9] text-[11px] uppercase tracking-wider">Port of Loading</span>
                  <span className="block text-[11px]">Mundra Sea Port (Gujarat)</span>
                </li>
                <li className="space-y-0.5">
                  <span className="block text-[#EAE5D9] text-[11px] uppercase tracking-wider">Logistics Capacity</span>
                  <span className="block text-[11px]">20ft / 40ft HQ Consolidations</span>
                </li>
                <li className="space-y-0.5">
                  <span className="block text-[#EAE5D9] text-[11px] uppercase tracking-wider">Crating Spec</span>
                  <span className="block text-[11px]">ISPM-15 Heat-Treated Wood</span>
                </li>
                <li className="space-y-0.5">
                  <span className="block text-[#EAE5D9] text-[11px] uppercase tracking-wider">MOQ Target</span>
                  <span className="block text-[11px]">LCL / Full Container Load</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 4: Quick Links - spans 2 cols */}
          <FooterColumn
            title="Quick Links"
            links={[
              { label: "Bespoke OEM Services", href: "/bespoke" },
              { label: "Contact on WhatsApp", href: "/contact-on-whatsapp" },
              { label: "Hospitality Portfolios", href: "/projects" },
              { label: "Our Story & Factory", href: "/about" },
              { label: "Trade Journal & Blog", href: "/journal" },
              { label: "Contact Export Desk", href: "/contact" },
            ]}
            className="lg:col-span-2 md:pl-2"
          />

          {/* Section 5: Contact Details - spans 3 cols */}
          <div className="lg:col-span-3 space-y-4 md:space-y-6">
            <h4 className="font-sans text-xs uppercase tracking-[0.25em] font-medium text-[#EAE5D9]">
              Contact Coordinates
            </h4>
            <div className="space-y-4 font-sans text-xs text-[#8C8273] font-light leading-relaxed">
              <div className="space-y-1">
                <p className="text-[#EAE5D9] font-medium uppercase text-[10px] tracking-wider">B2B Trade Concierge</p>
                <p>
                  <a href="mailto:contact@sbartisan.com" className="hover:text-white transition-colors duration-300">
                    contact@sbartisan.com
                  </a>
                </p>
                <p>+91 89490 51324</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#EAE5D9] font-medium uppercase text-[10px] tracking-wider">Office Address</p>
                <p>SB-Artisan, iStart Nest Incubation Center, Vikramaditya Nagar, Surya Colony, Jodhpur, Rajasthan 342011</p>
              </div>
              <div className="space-y-1 pt-1">
                <p className="text-[#EAE5D9] font-medium uppercase text-[10px] tracking-wider">Factory Address</p>
                <p>Khasra No. 387/4, Near Rameshwar Dham, Pal Gaon, Jodhpur, Rajasthan 342014</p>
              </div>
              <div className="pt-1 text-[10px] italic text-[#5C574F]">
                Meetings scheduled by corporate appointment.
              </div>
            </div>
          </div>

        </div>

        {/* Footer Sub-bar: Social, Copyright, Back to Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
          {/* Social Links on left */}
          <div className="order-2 md:order-1 flex items-center gap-4">
            <span className="font-sans text-[10px] text-[#6E6B64] uppercase tracking-[0.2em] hidden sm:inline-block">Follow the Atelier:</span>
            <SocialLinks />
          </div>

          {/* Copyright, Policy links in center */}
          <div className="order-3 md:order-2 flex flex-col items-center md:items-start gap-2.5 text-center md:text-left">
            <p className="font-sans text-[11px] text-[#8C8273] uppercase tracking-[0.2em] select-none">
              © 2025 {brandName}. All rights reserved.
            </p>
            <p className="font-sans text-[10px] sm:text-[11px] text-[#8C8273] uppercase tracking-[0.15em] flex items-center gap-1.5 mt-0.5 select-none">
              <span className="text-[#6E6B64]">Made & Managed by</span>
              <a
                href="https://visuark.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CBB593] hover:text-[#EAE5D9] transition-colors duration-300 inline-flex items-center gap-1.5 font-medium group"
              >
                <svg
                  className="w-3.5 h-3.5 text-[#CBB593] group-hover:text-[#EAE5D9] transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="5" r="3" />
                  <line x1="12" y1="22" x2="12" y2="8" />
                  <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
                </svg>
                Visuark
              </a>
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-[10px] text-[#6E6B64] uppercase tracking-[0.15em] font-sans">
              <Link to="/about" className="hover:text-[#EAE5D9] transition-colors duration-300">
                Privacy Policy
              </Link>
              <span className="text-[#2C2B29]">•</span>
              <Link to="/about" className="hover:text-[#EAE5D9] transition-colors duration-300">
                Terms of Atelier
              </Link>
              <span className="text-[#2C2B29]">•</span>
              <Link to="/admin" className="hover:text-[#CBB593] transition-colors duration-300 font-medium">
                Atelier Registry
              </Link>
            </div>
          </div>

          {/* Elegant Back to Top Button on right */}
          <div className="order-1 md:order-3">
            <motion.button
              onClick={handleScrollToTop}
              className="group flex items-center justify-center w-11 h-11 rounded-full border border-[#23211F] text-[#8C8273] hover:text-[#EAE5D9] hover:border-[#EAE5D9] transition-colors duration-500"
              aria-label="Scroll to top of page"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5"
              >
                <line x1="8" y1="12" x2="8" y2="4" />
                <polyline points="4 8 8 4 12 8" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Huge Wide-Tracked Serif Brand Watermark for ultimate editorial feel */}
        <div className="pt-8 select-none pointer-events-none overflow-hidden block">
          <h2 className="font-serif text-[5vw] font-extralight text-white/[0.02] text-center leading-none tracking-[0.3em] uppercase whitespace-nowrap translate-y-4">
            SB ARTISAN JODHPUR • EXPORT DIVISION
          </h2>
        </div>
      </Container>
    </footer>
  );
}
