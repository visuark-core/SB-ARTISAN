import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, SEO } from "../ui";
import { WhyArtisan } from "../sections";
import { cn } from "../../lib/utils";

const CHAPTERS = [
  { id: "provenance", num: "01", label: "Provenance", title: "Our Story" },
  { id: "identity", num: "02", label: "Identity", title: "Who We Are" },
  { id: "infrastructure", num: "03", label: "Infrastructure", title: "Manufacturing Expertise" },
  { id: "guilds", num: "04", label: "The Guilds", title: "Artisan Craftsmanship" },
  { id: "supply-chain", num: "05", label: "Supply Chain", title: "Export Capabilities" },
  { id: "quality-control", num: "06", label: "Precision Check", title: "Quality Control Process" },
  { id: "horizon", num: "07", label: "Horizon", title: "Global Market Vision" },
];

export default function AboutPage() {
  const [activeChapter, setActiveChapter] = useState("provenance");
  const [activePhase, setActivePhase] = useState<"phase1" | "phase2" | "phase3">("phase1");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 350; // Offset detection threshold
      for (const ch of CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveChapter(ch.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About SB Artisan - Jodhpur Furniture Factory & Exporter",
    "description": "Learn about SB Artisan's solid wood furniture manufacturing heritage in Jodhpur, India. Read about our wood seasoning kilns, hand-carved joinery details, and international B2B export capabilities.",
    "publisher": {
      "@type": "Organization",
      "name": "SB Artisan Jodhpur",
      "logo": "https://www.sbartisan.com/images/commercial_workshop_custom.png"
    }
  };

  return (
    <div className="bg-[#FDFCF7] pt-28 pb-20 selection:bg-[#EAE5D9] text-[#1A1A1A]">
      <SEO 
        title="Jodhpur Furniture Manufacturer Sourcing & Factory Profile"
        description="Explore SB Artisan's Jodhpur furniture manufacturing plant profile. Discover our sustainable wood seasoning practices, generational craftsmanship, and global container logistics capabilities."
        keywords="furniture manufacturer Jodhpur, Indian furniture factory profile, solid wood exporter, custom furniture sourcing India, hotel furniture contractor Jodhpur"
        canonical="/about"
        schema={aboutSchema}
      />

      {/* 1. HERO HEADER WITH STATS GRID */}
      <section className="py-16 border-b border-[#EAE5D9] bg-[#FAF8F2]/50">
        <Container variant="default">
          <div className="space-y-12">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-[#8C6D4F]" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-[#8C6D4F] font-semibold">
                  Factory Profile & Sourcing Dossier
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight tracking-tight">
                Premium Indian Hospitality Furniture Manufacturer & Exporter
              </h1>
              <p className="max-w-2xl font-serif text-base text-[#5A5751] font-light leading-relaxed">
                Based in the handicraft capital of Jodhpur, India, SB Artisan operates specialized contract-grade mills and workshops. We partner directly with hospitality developers, architects, and trade importers to deliver stabilized kiln-dried wood, woven rattan, and bone inlay custom designs globally.
              </p>
            </div>

            {/* B2B Factory Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[#EAE5D9]">
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest text-[#8C6D4F] font-mono font-semibold block">ESTABLISHED</span>
                <div className="font-serif text-2xl lg:text-3xl text-[#1A1A1A] font-light">2012</div>
                <span className="text-[9px] text-[#8C8273] font-light block font-mono">Jodhpur, Rajasthan</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest text-[#8C6D4F] font-mono font-semibold block">PLANT CAPACITY</span>
                <div className="font-serif text-2xl lg:text-3xl text-[#1A1A1A] font-light">8,500 m²</div>
                <span className="text-[9px] text-[#8C8273] font-light block font-mono">Woodmills & Kilns</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest text-[#8C6D4F] font-mono font-semibold block">GLOBAL LOGISTICS</span>
                <div className="font-serif text-2xl lg:text-3xl text-[#1A1A1A] font-light">450+ FCL</div>
                <span className="text-[9px] text-[#8C8273] font-light block font-mono">Containers Shipped Annually</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest text-[#8C6D4F] font-mono font-semibold block">MASTER CRAFTSMEN</span>
                <div className="font-serif text-2xl lg:text-3xl text-[#1A1A1A] font-light">120+ Members</div>
                <span className="text-[9px] text-[#8C8273] font-light block font-mono">Traditional Joinery Guilds</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. STICKY DUAL-COLUMN CONTENT LAYOUT */}
      <section className="py-20">
        <Container variant="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
            
            {/* Sticky Left Chapter Navigator */}
            <aside className="lg:col-span-3 lg:sticky lg:top-36 hidden lg:block border-r border-[#EAE5D9]/50 pr-8">
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[8px] uppercase tracking-widest font-mono text-[#8C6D4F] font-bold block">FACTORY PROFILE</span>
                  <span className="text-[10px] text-[#8C8273] font-light font-mono block">Dossier Chapters</span>
                </div>
                <nav className="flex flex-col gap-3">
                  {CHAPTERS.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => scrollToSection(ch.id)}
                      className={cn(
                        "text-left text-xs transition-all duration-300 font-mono flex items-center gap-3 py-1 cursor-pointer outline-none group",
                        activeChapter === ch.id
                          ? "text-[#8C6D4F] translate-x-1.5 font-medium"
                          : "text-[#8C8273] hover:text-[#1A1A1A] hover:translate-x-1"
                      )}
                    >
                      <span className={cn(
                        "text-[9px] px-1.5 py-0.5 border rounded-xs transition-colors",
                        activeChapter === ch.id ? "border-[#8C6D4F] bg-[#FAF8F2]" : "border-[#EAE5D9] bg-white group-hover:border-[#8C8273]"
                      )}>
                        {ch.num}
                      </span>
                      <span>{ch.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Narrative Area */}
            <div className="lg:col-span-9 space-y-32">
              
              {/* CHAPTER 1: Provenance */}
              <article id="provenance" className="scroll-mt-36 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#8C8273] block">
                        Chapter 01 / Provenance
                      </span>
                      <h2 className="font-serif text-2xl lg:text-3xl font-light text-[#1A1A1A] leading-tight">
                        Our Story
                      </h2>
                      <div className="w-12 h-[1px] bg-[#8C6D4F] my-3" />
                    </div>
                    <p className="text-sm text-[#5A5751] font-light leading-relaxed text-justify">
                      SB Artisan was founded in Jodhpur, Rajasthan, with a mission to bring authentic Indian woodworking techniques to the global hospitality market. Moving away from standard, mass-produced commercial furniture, we established a manufacturing guild that blends generational Rajasthani craftsmanship with modern, high-precision engineering.
                    </p>
                    <p className="text-sm text-[#5A5751] font-light leading-relaxed text-justify">
                      Today, we operate direct-to-project <Link to="/contact" className="underline hover:text-[#8C6D4F] transition-colors duration-200">custom contract manufacturing workshops</Link>, crafting custom installations for boutique hotels, island resorts, and premium fine-dining salons worldwide. By working directly with designers and developers, we bypass middle brokers to offer authentic craft integrity at competitive factory rates.
                    </p>
                  </div>
                  <div className="md:col-span-5 space-y-2">
                    <div className="aspect-square bg-[#F5F2EA] overflow-hidden rounded-xs border border-[#EAE5D9]/50 group relative">
                      <div className="absolute inset-0 bg-black/[0.01] z-10 pointer-events-none group-hover:bg-black/5 transition-colors duration-500" />
                      <img
                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                        alt="Jodhpur city heritage view"
                        className="w-full h-full object-cover object-center transition-transform duration-[1500ms] group-hover:scale-102"
                      />
                    </div>
                    <span className="block text-[8px] text-[#9E9B95] font-mono text-center">
                      Plate 01.1 — Rajasthani heritage craft influence in Jodhpur.
                    </span>
                  </div>
                </div>
              </article>

              {/* CHAPTER 2: Identity */}
              <article id="identity" className="scroll-mt-36 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 md:order-2 space-y-2">
                    <div className="aspect-square bg-[#F5F2EA] overflow-hidden rounded-xs border border-[#EAE5D9]/50 group relative">
                      <div className="absolute inset-0 bg-black/[0.01] z-10 pointer-events-none group-hover:bg-black/5 transition-colors duration-500" />
                      <img
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                        alt="Teakwood material sample"
                        className="w-full h-full object-cover object-center transition-transform duration-[1500ms] group-hover:scale-102"
                      />
                    </div>
                    <span className="block text-[8px] text-[#9E9B95] font-mono text-center">
                      Plate 02.1 — Materials selection at Jodhpur design studio.
                    </span>
                  </div>
                  <div className="md:col-span-7 md:order-1 space-y-6">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#8C8273] block">
                        Chapter 02 / Identity
                      </span>
                      <h2 className="font-serif text-2xl lg:text-3xl font-light text-[#1A1A1A] leading-tight">
                        Who We Are
                      </h2>
                      <div className="w-12 h-[1px] bg-[#8C6D4F] my-3" />
                    </div>
                    
                    <blockquote className="border-l-2 border-[#8C6D4F] pl-4 italic text-sm text-[#8C6D4F] font-serif my-4">
                      "We bridge the gap between regional artisan guilds and high-end international specifications, ensuring contract-grade stability."
                    </blockquote>
                    
                    <p className="text-sm text-[#5A5751] font-light leading-relaxed text-justify">
                      SB Artisan is a leading Indian supplier and exporter of handcrafted wooden, cane, rope, and bone inlay furniture. Rooted in Jodhpur, the handicraft capital of India, we bridge the gap between regional artisan guilds and international hospitality developments.
                    </p>
                    <p className="text-sm text-[#5A5751] font-light leading-relaxed text-justify">
                      We partner directly with hotels, resorts, cafés, bars, wholesalers, and commercial interior project developers worldwide. By operating our own wood mills and assembly halls, we ensure strict contract-grade quality specs while maintaining competitive direct-to-factory trade pricing.
                    </p>
                  </div>
                </div>
              </article>

              {/* CHAPTER 3: Infrastructure */}
              <article id="infrastructure" className="scroll-mt-36 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#8C8273] block">
                        Chapter 03 / Infrastructure
                      </span>
                      <h2 className="font-serif text-2xl lg:text-3xl font-light text-[#1A1A1A] leading-tight">
                        Manufacturing Expertise
                      </h2>
                      <div className="w-12 h-[1px] bg-[#8C6D4F] my-3" />
                    </div>
                    <p className="text-sm text-[#5A5751] font-light leading-relaxed text-justify">
                      Our facilities in Jodhpur combine heavy wood-milling machinery with dedicated seasoning kilns. Solid hardwoods such as plantation teakwood, Indian Rosewood (Sheesham), and sustainable mango wood are processed through precision sawmills to ensure clean geometric frame lines.
                    </p>
                    <p className="text-sm text-[#5A5751] font-light leading-relaxed text-justify">
                      We maintain massive wood seasoning chambers where logs undergo slow drying, stabilizing the internal moisture level of the timber to international climate targets (8-12% RH) before it enters fabrication. This ensures that the products remain stable and warp-free in dry indoor heating or humid coastal regions globally.
                    </p>
                  </div>
                  <div className="md:col-span-5 space-y-2">
                    <div className="aspect-square bg-[#F5F2EA] overflow-hidden rounded-xs border border-[#EAE5D9]/50 group relative">
                      <div className="absolute inset-0 bg-black/[0.01] z-10 pointer-events-none group-hover:bg-black/5 transition-colors duration-500" />
                      <img
                        src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
                        alt="Wood timber yard stack"
                        className="w-full h-full object-cover object-center transition-transform duration-[1500ms] group-hover:scale-102"
                      />
                    </div>
                    <span className="block text-[8px] text-[#9E9B95] font-mono text-center">
                      Plate 03.1 — Raw hardwood timber seasoning stacks.
                    </span>
                  </div>
                </div>
              </article>

              {/* CHAPTER 4: The Guilds */}
              <article id="guilds" className="scroll-mt-36 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 md:order-2 space-y-2">
                    <div className="aspect-square bg-[#F5F2EA] overflow-hidden rounded-xs border border-[#EAE5D9]/50 group relative">
                      <div className="absolute inset-0 bg-black/[0.01] z-10 pointer-events-none group-hover:bg-black/5 transition-colors duration-500" />
                      <img
                        src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"
                        alt="Woodworking hands carpentry joinery"
                        className="w-full h-full object-cover object-center transition-transform duration-[1500ms] group-hover:scale-102"
                      />
                    </div>
                    <span className="block text-[8px] text-[#9E9B95] font-mono text-center">
                      Plate 04.1 — Hand-finishing timber joinery joints.
                    </span>
                  </div>
                  <div className="md:col-span-7 md:order-1 space-y-6">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#8C8273] block">
                        Chapter 04 / The Guilds
                      </span>
                      <h2 className="font-serif text-2xl lg:text-3xl font-light text-[#1A1A1A] leading-tight">
                        Artisan Craftsmanship
                      </h2>
                      <div className="w-12 h-[1px] bg-[#8C6D4F] my-3" />
                    </div>
                    <p className="text-sm text-[#5A5751] font-light leading-relaxed text-justify">
                      Mechanical joints are carved by master carpenters utilizing traditional blind mortise-and-tenon and dowel joinery methods. This guarantees structural stability under intensive commercial use without relying on synthetic chemical adhesives.
                    </p>
                    <p className="text-sm text-[#5A5751] font-light leading-relaxed text-justify">
                      Our specialized material sub-guilds hand-split blonde rattan cane for open star weaves, twist Alleppey coconut fibers into coir rope daybeds, and lay thousands of hand-carved ethically sourced camel bone tiles tile-by-tile into colored organic resins. Each piece carries the distinct touch of Indian artistry.
                    </p>
                  </div>
                </div>
              </article>

              {/* CHAPTER 5: Supply Chain */}
              <article id="supply-chain" className="scroll-mt-36 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#8C8273] block">
                        Chapter 05 / Supply Chain
                      </span>
                      <h2 className="font-serif text-2xl lg:text-3xl font-light text-[#1A1A1A] leading-tight">
                        Export Capabilities
                      </h2>
                      <div className="w-12 h-[1px] bg-[#8C6D4F] my-3" />
                    </div>
                    <p className="text-sm text-[#5A5751] font-light leading-relaxed text-justify">
                      We coordinate container-load logistics globally. Our packing processes are optimized for both Full Container Load (FCL) and Less than Container Load (LCL) sea freight. Solid wood products are wrapped in humidity-absorbing sheets and secured in heavy-gauge corrugated cartons with reinforced corner caps.
                    </p>
                    <p className="text-sm text-[#5A5751] font-light leading-relaxed text-justify">
                      SB Artisan handles complete <Link to="/contact" className="underline hover:text-[#8C6D4F] transition-colors duration-200">export documentation & logistics</Link>, including phytosanitary certification, fumigation records, origin declarations, and customs clearance filings. We clear freight from Jodhpur's dry ports directly to international hubs, ensuring scheduled arrivals for resort openings and commercial installations.
                    </p>
                  </div>
                  <div className="md:col-span-5 space-y-2">
                    <div className="aspect-square bg-[#F5F2EA] overflow-hidden rounded-xs border border-[#EAE5D9]/50 group relative">
                      <div className="absolute inset-0 bg-black/[0.01] z-10 pointer-events-none group-hover:bg-black/5 transition-colors duration-500" />
                      <img
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                        alt="Export shipping container loading terminal"
                        className="w-full h-full object-cover object-center transition-transform duration-[1500ms] group-hover:scale-102"
                      />
                    </div>
                    <span className="block text-[8px] text-[#9E9B95] font-mono text-center">
                      Plate 05.1 — Export container load terminal (ICD Jodhpur).
                    </span>
                  </div>
                </div>
              </article>

              {/* CHAPTER 6: Quality Control Process (INTERACTIVE FACTORY AUDIT) */}
              <article id="quality-control" className="scroll-mt-36 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#8C8273] block">
                      Chapter 06 / Precision Check
                    </span>
                    <h2 className="font-serif text-2xl lg:text-3xl font-light text-[#1A1A1A] leading-tight">
                      Quality Control Process & Audit
                    </h2>
                    <div className="w-12 h-[1px] bg-[#8C6D4F] my-3" />
                  </div>
                  <p className="text-sm text-[#5A5751] font-light leading-relaxed max-w-2xl">
                    To guarantee structural durability in diverse destination climates, we enforce a strict multi-tier quality control protocol throughout our milling, joinery, and packing lines.
                  </p>
                  
                  {/* Interactive Phase Toggle Tabs */}
                  <div className="border border-[#EAE5D9] bg-white rounded-sm overflow-hidden shadow-xs">
                    <div className="grid grid-cols-3 border-b border-[#EAE5D9] bg-[#FAF8F2]/60">
                      <button
                        onClick={() => setActivePhase("phase1")}
                        className={cn(
                          "py-3 text-[10px] uppercase tracking-wider font-mono border-r border-[#EAE5D9] outline-none cursor-pointer transition-all text-center",
                          activePhase === "phase1"
                            ? "bg-white text-[#8C6D4F] font-semibold border-b-2 border-b-[#8C6D4F]"
                            : "text-[#8C8273] hover:text-[#1A1A1A] hover:bg-white/50"
                        )}
                      >
                        Phase 1: Moisture
                      </button>
                      <button
                        onClick={() => setActivePhase("phase2")}
                        className={cn(
                          "py-3 text-[10px] uppercase tracking-wider font-mono border-r border-[#EAE5D9] outline-none cursor-pointer transition-all text-center",
                          activePhase === "phase2"
                            ? "bg-white text-[#8C6D4F] font-semibold border-b-2 border-b-[#8C6D4F]"
                            : "text-[#8C8273] hover:text-[#1A1A1A] hover:bg-white/50"
                        )}
                      >
                        Phase 2: Stress & Joints
                      </button>
                      <button
                        onClick={() => setActivePhase("phase3")}
                        className={cn(
                          "py-3 text-[10px] uppercase tracking-wider font-mono outline-none cursor-pointer transition-all text-center",
                          activePhase === "phase3"
                            ? "bg-white text-[#8C6D4F] font-semibold border-b-2 border-b-[#8C6D4F]"
                            : "text-[#8C8273] hover:text-[#1A1A1A] hover:bg-white/50"
                        )}
                      >
                        Phase 3: Surface & Pack
                      </button>
                    </div>

                    <div className="p-6 min-h-[220px] flex flex-col justify-between">
                      {activePhase === "phase1" && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] uppercase tracking-widest text-[#8C6D4F] font-mono font-bold">Moisture Content Control</span>
                            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-xs">Target: 8% - 12% RH</span>
                          </div>
                          <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                            Timber is kiln-dried in slow steam-heating cycles in our seasoning chambers to stabilize internal cells. This prevents checking, splitting, or joint movement when the furniture is exposed to air conditioning or dry indoor heating in North American and European markets.
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[10px] font-mono text-[#8C8273] pt-2">
                            <li className="flex items-center gap-2">✓ Handheld pin meter audit of every plank</li>
                            <li className="flex items-center gap-2">✓ Kiln logging and timestamping</li>
                            <li className="flex items-center gap-2">✓ FSC/Vriksh certified wood compliance</li>
                            <li className="flex items-center gap-2">✓ Internal relative humidity verification</li>
                          </ul>
                        </div>
                      )}

                      {activePhase === "phase2" && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] uppercase tracking-widest text-[#8C6D4F] font-mono font-bold">Stress & Joint Testing</span>
                            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-xs">Target: Shear Load 250kg</span>
                          </div>
                          <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                            Assembled frames undergo shear testing to verify joint load resilience under intensive commercial cycles. Master carpenters utilize blind mortise-and-tenon joints secured by interlocking wooden dowels to avoid shifting or squeaking under long-term B2B contract hospitality traffic.
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[10px] font-mono text-[#8C8273] pt-2">
                            <li className="flex items-center gap-2">✓ Mortise & tenon joinery check</li>
                            <li className="flex items-center gap-2">✓ Leg splay weight-load tests</li>
                            <li className="flex items-center gap-2">✓ Cane mesh tensioning inspection</li>
                            <li className="flex items-center gap-2">✓ Double-star pattern structure validation</li>
                          </ul>
                        </div>
                      )}

                      {activePhase === "phase3" && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] uppercase tracking-widest text-[#8C6D4F] font-mono font-bold">Surface Clearance & Packing</span>
                            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-xs">Target: Defect Free CRI 95+</span>
                          </div>
                          <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                            Every article is audited under specialized CRI 95+ studio lights to inspect finishing coats, resin-fill consistency for bone inlay, and coir rope patterns. Packaged units are wrapped in thick foam wrappers with moisture-absorbing gel sheets before entering thick double-wall export boxes.
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[10px] font-mono text-[#8C8273] pt-2">
                            <li className="flex items-center gap-2">✓ Surface sanding audit</li>
                            <li className="flex items-center gap-2">✓ Organic beeswax coating inspection</li>
                            <li className="flex items-center gap-2">✓ Moisture absorbing gel sheet packing</li>
                            <li className="flex items-center gap-2">✓ Corner protector checks & crating</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>

              {/* CHAPTER 7: Horizon */}
              <article id="horizon" className="scroll-mt-36 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#8C8273] block">
                        Chapter 07 / Horizon
                      </span>
                      <h2 className="font-serif text-2xl lg:text-3xl font-light text-[#1A1A1A] leading-tight">
                        Global Market Vision
                      </h2>
                      <div className="w-12 h-[1px] bg-[#8C6D4F] my-3" />
                    </div>
                    <p className="text-sm text-[#5A5751] font-light leading-relaxed text-justify">
                      We believe that premium Indian furniture should stand as a global benchmark for hospitality projects. Our vision is to place SB Artisan pieces inside Michelin-starred restaurants, beachfront wellness retreats, and luxury urban hotels in North America, Europe, Australia, and the Middle East.
                    </p>
                    <p className="text-sm text-[#5A5751] font-light leading-relaxed text-justify">
                      By maintaining a transparent factory supply chain, adhering to strict sustainable harvesting regulations, and respecting the legacy of Rajasthan's artisan guilds, we build trade relationships that support local Indian craft communities while equipping international developments with heritage objects built to last.
                    </p>
                  </div>
                  <div className="md:col-span-5 space-y-2">
                    <div className="aspect-square bg-[#F5F2EA] overflow-hidden rounded-xs border border-[#EAE5D9]/50 group relative">
                      <div className="absolute inset-0 bg-black/[0.01] z-10 pointer-events-none group-hover:bg-black/5 transition-colors duration-500" />
                      <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                        alt="Teak luxury hotel interior"
                        className="w-full h-full object-cover object-center transition-transform duration-[1500ms] ease-out group-hover:scale-102"
                      />
                    </div>
                    <span className="block text-[8px] text-[#9E9B95] font-mono text-center">
                      Plate 07.1 — Modern Haveli furniture integration in a luxury resort lobby.
                    </span>
                  </div>
                </div>
              </article>

            </div>
          </div>
        </Container>
      </section>

      {/* WHY PARTNER WITH SB ARTISAN (B2B Sourcing Advantages) */}
      <WhyArtisan />

      {/* 3. B2B TRADE SAMPLE REQUEST CTA */}
      <section className="py-12 border-t border-[#EAE5D9]">
        <Container variant="default">
          <div className="border border-[#8C6D4F]/30 bg-[#1E1D1B] p-8 lg:p-12 rounded-sm text-[#EAE5D9] relative overflow-hidden group shadow-lg">
            <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block select-none">
              <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="max-w-2xl space-y-6 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#8C6D4F] rounded-full" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-[#8C6D4F] font-semibold">
                  TRADE DEVELOPMENT DESK
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-white font-light leading-snug">
                  Request Material Samples & Finish Swatches
                </h2>
                <p className="text-xs text-[#9E9B95] font-light leading-relaxed max-w-xl">
                  Evaluate raw material density and handiwork before placing container bookings. Sourcing officers can request sample crates containing distressed teak, Star cane weave swatches, and bone inlay resin palettes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-[#8C6D4F] hover:bg-[#A3927B] text-[#0F0E0D] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-xs text-center transition-all duration-300"
                >
                  Request Swatch Kit
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 border border-[#EAE5D9]/20 hover:border-[#8C6D4F]/50 text-white text-[10px] font-semibold uppercase tracking-[0.2em] rounded-xs text-center transition-all duration-300"
                >
                  Submit RFP Specifications
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
