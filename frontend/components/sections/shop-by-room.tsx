import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Container } from "../ui";

interface RoomItem {
  id: string;
  title: string;
  image: string;
  rooms: string[];
  href: string;
}

const ROOM_TABS = [
  { id: "all", label: "All" },
  { id: "living", label: "Living" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining", label: "Dining" },
  { id: "decor", label: "Decor" },
];

const ROOM_ITEMS: RoomItem[] = [
  {
    id: "chair",
    title: "CHAIR",
    image: "/images/shop_chair.png",
    rooms: ["living", "dining"],
    href: "/collections?search=chair",
  },
  {
    id: "sofa",
    title: "SOFA",
    image: "/images/shop_sofa.png",
    rooms: ["living"],
    href: "/collections?search=sofa",
  },
  {
    id: "coffee-table",
    title: "COFFEE TABLE",
    image: "/images/shop_coffee_table.png",
    rooms: ["living"],
    href: "/category/hotel-furniture?sub=coffee-tables",
  },
  {
    id: "cabinet",
    title: "CABINET",
    image: "/images/shop_cabinet.png",
    rooms: ["living", "dining", "bedroom", "decor"],
    href: "/collections?search=cabinet",
  },
  {
    id: "dining-tables",
    title: "DINING TABLES",
    image: "/images/shop_dining.png",
    rooms: ["dining"],
    href: "/category/restaurant-furniture",
  },
  {
    id: "benches",
    title: "BENCHES",
    image: "/images/shop_bench.png",
    rooms: ["living", "dining", "decor"],
    href: "/collections?search=bench",
  },
  {
    id: "stools",
    title: "STOOLS",
    image: "/images/shop_stool.png",
    rooms: ["dining", "decor"],
    href: "/collections?search=stool",
  },
  {
    id: "bed-side",
    title: "BED SIDE",
    image: "/images/shop_bedside.png",
    rooms: ["bedroom"],
    href: "/category/hotel-furniture?sub=bedside-tables",
  },
];

export default function ShopByRoom() {
  const [activeRoom, setActiveRoom] = useState("all");

  const filteredItems = ROOM_ITEMS.filter(
    (item) => activeRoom === "all" || item.rooms.includes(activeRoom)
  );

  return (
    <section className="py-12 md:py-16 bg-[#FDFCF7] border-t border-[#F2EDE2]">
      <Container variant="wide" className="space-y-8 md:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#1A1A1A] tracking-wide">
            Shop by Categories
          </h2>
          <p className="font-sans text-xs text-[#6E6B64] font-light tracking-wide uppercase">
            Curated Spaces & Series
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex justify-center items-center">
          <div className="flex items-center overflow-x-auto scrollbar-none gap-2.5 max-w-full px-4 pb-2">
            {ROOM_TABS.map((tab) => {
              const isActive = activeRoom === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRoom(tab.id)}
                  className={cn(
                    "text-[11px] tracking-wider uppercase font-sans py-2 px-6 border rounded-full transition-all duration-300 select-none whitespace-nowrap outline-none cursor-pointer",
                    isActive
                      ? "border-[#D97706] text-[#D97706] bg-[#D97706]/[0.02] font-medium"
                      : "border-[#EAE5D9] text-[#6E6B64] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Room Items Grid - 4 Columns on larger screens since we have 8 items */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <Link to={item.href} className="group block space-y-2.5 focus:outline-none">
                  {/* Image Frame */}
                  <div className="relative aspect-square overflow-hidden bg-[#F5F2EA] rounded-lg border border-[#F2EDE2]/60 transition-all duration-300">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center select-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Title under image */}
                  <div className="text-center">
                    <h3 className="font-sans text-[10px] sm:text-xs tracking-wider uppercase font-semibold text-[#1A1A1A] group-hover:text-[#8C8273] transition-colors duration-300 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
