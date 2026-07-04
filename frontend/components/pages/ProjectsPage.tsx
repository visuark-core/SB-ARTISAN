import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Container, SEO } from "../ui";
import { cn } from "../../lib/utils";

interface CaseStudy {
  id: string;
  title: string;
  category: string; // Hotels, Restaurants, Cafés, Bars, Resorts, Villas, Interior Design
  location: string;
  clientName: string;
  completionYear: string;
  scope: string;
  story: string;
  image: string;
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filterCategories = [
    "All",
    "Hotels",
    "Restaurants",
    "Cafés",
    "Bars",
    "Resorts",
    "Villas",
    "Interior Design",
  ];

  const fetchProjectsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects`);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped = json.data.map((p: any): CaseStudy => ({
          id: p.id.toString(),
          title: p.title,
          category: p.project_type || "Other",
          location: p.location || "Undisclosed Location",
          clientName: p.client_name || "B2B Contract Client",
          completionYear: p.completion_year ? p.completion_year.toString() : "2026",
          scope: p.client_name ? `${p.client_name} — Completed ${p.completion_year}` : "Contract custom furniture package",
          story: p.description,
          image: p.image_url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
        }));
        setCaseStudies(mapped);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to retrieve case studies registry.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  // Compute category counts dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: caseStudies.length };
    caseStudies.forEach((study) => {
      const cat = study.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [caseStudies]);

  // Filtering pipeline
  const filteredCaseStudies = useMemo(() => {
    if (activeFilter === "All") return caseStudies;
    return caseStudies.filter(
      (project) => project.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, caseStudies]);

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "B2B Furniture Export Projects & Case Studies",
    "description": "View SB Artisan's completed global contract furniture installations. Portfolios include teakwood daybeds, restaurant dining sets, and bone inlay cabinets.",
    "url": "https://www.sbartisan.com/projects"
  };

  // Helper to resolve mockup specifications based on category
  const getCategorySpecs = (category: string) => {
    switch (category.toLowerCase()) {
      case "resorts":
        return { materials: "Plantation Teak & Coir Cordage", load: "FCL Sea Freight", finishing: "Grey Bleached Wax Oils" };
      case "restaurants":
        return { materials: "Seasoned Reclaimed Teakwood", load: "FCL Sea Freight", finishing: "Smoked Charcoal Matte Oil" };
      case "cafés":
        return { materials: "Steam-Bent Cane & Rattan Peel", load: "LCL Sea Freight", finishing: "Weatherproof Natural Oil" };
      case "bars":
        return { materials: "Bone Inlay & Brass Cladding", load: "LCL Sea Freight", finishing: "Charcoal Pigment Resin" };
      case "hotels":
        return { materials: "Carved Teakwood & Brass Accents", load: "FCL Sea Freight", finishing: "Linseed Polish Finish" };
      default:
        return { materials: "Contract Grade Seasoned Hardwood", load: "Mixed Container Freight", finishing: "Natural Beeswax Polish" };
    }
  };

  return (
    <div className="bg-[#FDFCF7] pt-28 pb-20 text-[#1A1A1A]">
      <SEO 
        title="Commercial FF&E Furniture Project Portfolios"
        description="View our contract furniture project portfolios. SB Artisan supplies custom handcrafted teak, cane, and bone inlay furniture to global hospitality developments."
        keywords="hospitality furniture installations, commercial FF&E projects, hotel furniture case studies, Jodhpur contract furniture exporter"
        canonical="/projects"
        schema={projectsSchema}
      />

      {/* 1. ARCHITECTURAL HERO & SOURCING COUNTERS */}
      <section className="py-16 border-b border-[#EAE5D9] bg-[#FAF8F2]/50">
        <Container variant="default">
          <div className="space-y-12">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-[#8C6D4F]" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-[#8C6D4F] font-semibold">
                  Global Contract Index
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight tracking-tight">
                Completed Portfolios & Case Studies
              </h1>
              <p className="max-w-2xl font-serif text-base text-[#5A5751] font-light leading-relaxed">
                Explore our commercial portfolio detailing solid teakwood, bone inlay, and custom rattan installations inside luxury hotel guestrooms, fine-dining restaurants, and beach resorts globally.
              </p>
            </div>

            {/* B2B Sourcing Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[#EAE5D9]">
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest text-[#8C6D4F] font-mono font-semibold block">DEPLOYMENTS</span>
                <div className="font-serif text-2xl lg:text-3xl text-[#1A1A1A] font-light">45+ Commercial</div>
                <span className="text-[9px] text-[#8C8273] font-light block font-mono">Bespoke Fit-out Sites</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest text-[#8C6D4F] font-mono font-semibold block">GLOBAL FOOTPRINT</span>
                <div className="font-serif text-2xl lg:text-3xl text-[#1A1A1A] font-light">18 Countries</div>
                <span className="text-[9px] text-[#8C8273] font-light block font-mono">Direct Export Terminals</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest text-[#8C6D4F] font-mono font-semibold block">WOOD CERTIFICATION</span>
                <div className="font-serif text-2xl lg:text-3xl text-[#1A1A1A] font-light">FSC / Vriksh</div>
                <span className="text-[9px] text-[#8C8273] font-light block font-mono">Legally Sourced Hardwoods</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest text-[#8C6D4F] font-mono font-semibold block">PRODUCTION LEAD</span>
                <div className="font-serif text-2xl lg:text-3xl text-[#1A1A1A] font-light">8 - 12 Weeks</div>
                <span className="text-[9px] text-[#8C8273] font-light block font-mono">Factory to Port Sourcing</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. DOSSIER FILTER TABS */}
      <Container variant="default" className="py-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-[#EAE5D9] pb-6">
          {filterCategories.map((category) => {
            const count = categoryCounts[category] || 0;
            // Only hide tabs that have zero items (except "All")
            if (category !== "All" && count === 0) return null;

            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "px-4 py-2 text-[10px] uppercase tracking-widest font-mono transition-all duration-300 border cursor-pointer outline-none",
                  activeFilter === category
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-transparent text-[#6E6B64] border-[#EAE5D9] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                )}
              >
                {category} <span className="text-[9px] opacity-70 ml-1">({count})</span>
              </button>
            );
          })}
        </div>
      </Container>

      {/* 3. CASE STUDIES GRID */}
      <Container variant="default" className="pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-[#FAF8F2] border border-[#EAE5D9] rounded-xs overflow-hidden flex flex-col justify-between animate-pulse">
                <div className="aspect-[4/3] w-full bg-[#F5F2EA]" />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <div className="h-2.5 bg-[#F5F2EA] w-1/4 rounded-xs" />
                    <div className="h-2.5 bg-[#F5F2EA] w-1/4 rounded-xs" />
                  </div>
                  <div className="h-4 bg-[#F5F2EA] w-3/4 rounded-xs" />
                  <div className="space-y-2">
                    <div className="h-3 bg-[#F5F2EA] w-full rounded-xs" />
                    <div className="h-3 bg-[#F5F2EA] w-5/6 rounded-xs" />
                  </div>
                  <div className="h-3.5 bg-[#F5F2EA] w-1/3 rounded-xs pt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-20 text-center space-y-6 max-w-md mx-auto select-none">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500 mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-lg text-[#1A1A1A] font-light">Failed to load project registry</h4>
              <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed">{error}</p>
            </div>
            <button
              onClick={fetchProjectsData}
              className="px-5 py-2.5 bg-[#1A1A1A] text-white hover:bg-[#8C6D4F] font-mono text-[10px] uppercase tracking-widest font-medium transition-all duration-300 rounded-sm cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredCaseStudies.length === 0 ? (
          <div className="py-20 text-center space-y-4 border border-dashed border-[#EAE5D9] rounded-sm bg-[#FAF8F2]/50 select-none">
            <svg className="w-10 h-10 text-[#8C8273] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18" />
            </svg>
            <p className="font-serif text-base text-[#8C8273] font-light">No case studies found matching this sector.</p>
            <p className="font-sans text-xs text-[#9E9B95] font-light">Try selecting a different filter category tab above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((project) => {
              const specs = getCategorySpecs(project.category);
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer bg-[#FAF8F2] border border-[#EAE5D9] overflow-hidden flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] hover:border-[#8C6D4F]/50 transition-all duration-500 rounded-xs"
                >
                  {/* Image Block */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#F5F2EA] relative">
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-xs border border-[#EAE5D9] px-2 py-0.5 rounded-xs text-[8px] font-mono text-[#8C6D4F] uppercase tracking-wider">
                      {project.category}
                    </div>
                    <div className="absolute inset-0 bg-black/5 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-103 transition-transform duration-[1500ms] ease-out select-none"
                    />
                  </div>

                  {/* Content Block */}
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[9px] uppercase tracking-widest font-mono text-[#8C8273]">
                        <span>{project.location.split(",")[0]}</span>
                        <span>{project.completionYear}</span>
                      </div>
                      <h3 className="font-serif text-lg font-light text-[#1A1A1A] group-hover:text-[#8C6D4F] transition-colors duration-300 leading-snug">
                        {project.title}
                      </h3>
                      <div className="text-[9px] font-mono text-[#8C6D4F] pt-1">
                        Specs: {specs.materials}
                      </div>
                    </div>
                    
                    <p className="font-sans text-xs font-light text-[#6E6B64] line-clamp-2 leading-relaxed text-justify">
                      {project.story}
                    </p>

                    <div className="pt-3 border-t border-[#EAE5D9]/50 flex items-center justify-between text-[9px] font-mono font-semibold uppercase tracking-widest text-[#1A1A1A] group-hover:text-[#8C6D4F] transition-colors duration-300">
                      <span>View Specifications</span>
                      <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>

      {/* 4. DETAILS LIGHTBOX MODAL (STRUCTURAL BLUEPRINT DOSSIER) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none">
          {/* Backdrop Mask */}
          <div
            onClick={() => setSelectedProject(null)}
            className="absolute inset-0 bg-[#0F0E0D]/85 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Modal Body */}
          <div className="relative w-full max-w-4xl bg-[#FDFCF7] border border-[#EAE5D9] shadow-2xl rounded-xs overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh] animate-scaleUp">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/75 text-white rounded-full transition-all focus:outline-none cursor-pointer border-none"
              aria-label="Close Case Study"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Column: Image Block */}
            <div className="md:col-span-6 bg-[#FAF8F2] relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#1E1D1B]/95 text-[#EAE5D9] p-3 border border-[#8C6D4F]/30 backdrop-blur-xs rounded-xs text-[9px] font-mono space-y-1">
                <div className="text-white uppercase tracking-wider font-semibold">Plate Reference</div>
                <div>Completed Site Installation - {selectedProject.location}</div>
              </div>
            </div>

            {/* Right Column: Narrative Block */}
            <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh] space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-widest text-[#8C6D4F] font-mono font-bold">
                      {selectedProject.category} Dossier
                    </span>
                    <span className="h-1.5 w-1.5 bg-[#8C6D4F] rounded-full" />
                    <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-mono">
                      Ref: 0{selectedProject.id}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl font-light text-[#1A1A1A] leading-tight">
                    {selectedProject.title}
                  </h2>
                </div>

                {/* Sourcing blueprint specifications */}
                <div className="border border-[#EAE5D9] rounded-xs overflow-hidden text-[10px] font-mono bg-[#FAF8F2]/60">
                  <div className="grid grid-cols-3 border-b border-[#EAE5D9] p-2.5">
                    <span className="text-[#8C8273] font-medium">CLIENT</span>
                    <span className="col-span-2 text-[#1A1A1A] font-medium">{selectedProject.clientName}</span>
                  </div>
                  <div className="grid grid-cols-3 border-b border-[#EAE5D9] p-2.5">
                    <span className="text-[#8C8273] font-medium">LOCATION</span>
                    <span className="col-span-2 text-[#1A1A1A]">{selectedProject.location}</span>
                  </div>
                  <div className="grid grid-cols-3 border-b border-[#EAE5D9] p-2.5">
                    <span className="text-[#8C8273] font-medium">YEAR COMPLETED</span>
                    <span className="col-span-2 text-[#1A1A1A]">{selectedProject.completionYear}</span>
                  </div>
                  <div className="grid grid-cols-3 border-b border-[#EAE5D9] p-2.5">
                    <span className="text-[#8C8273] font-medium">MATERIALS</span>
                    <span className="col-span-2 text-[#8C6D4F] font-medium">{getCategorySpecs(selectedProject.category).materials}</span>
                  </div>
                  <div className="grid grid-cols-3 border-b border-[#EAE5D9] p-2.5">
                    <span className="text-[#8C8273] font-medium">FINISHING</span>
                    <span className="col-span-2 text-[#1A1A1A]">{getCategorySpecs(selectedProject.category).finishing}</span>
                  </div>
                  <div className="grid grid-cols-3 p-2.5">
                    <span className="text-[#8C8273] font-medium">EXPORT TYPE</span>
                    <span className="col-span-2 text-[#1A1A1A]">{getCategorySpecs(selectedProject.category).load}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A] font-mono font-bold block">
                    PROJECT NARRATIVE
                  </span>
                  <p className="font-sans text-xs text-[#5A5751] font-light leading-relaxed text-justify">
                    {selectedProject.story}
                  </p>
                </div>
              </div>

              {/* WhatsApp Call to Action */}
              <div className="pt-4 border-t border-[#EAE5D9]">
                <a
                  href={`https://wa.me/919999999999?text=Hello%20SB%20Artisan%2C%20I%20would%20like%20to%20discuss%20a%20commercial%20furniture%20inquiry%20modeled%20after%20your%20${encodeURIComponent(
                    selectedProject.title
                  )}%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white text-[10px] uppercase tracking-[0.25em] font-mono font-semibold transition-all duration-300 rounded-xs flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  WhatsApp Spec Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. B2B TRADE RFP CALLOUT */}
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
                  FACTORY CONTRACT DESK
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-white font-light leading-snug">
                  Partner with SB Artisan on Your Next Hospitality Venture
                </h2>
                <p className="text-xs text-[#9E9B95] font-light leading-relaxed max-w-xl">
                  We collaborate with architectural bureaus, hotel developers, and procurement agents globally to deliver customized furniture schedules. Submit your CAD layouts, material requirements, or itemized lists to our Jodhpur desk for a comprehensive quote.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-[#8C6D4F] hover:bg-[#A3927B] text-[#0F0E0D] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-xs text-center transition-all duration-300"
                >
                  Submit RFP Specifications
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 border border-[#EAE5D9]/20 hover:border-[#8C6D4F]/50 text-white text-[10px] font-semibold uppercase tracking-[0.2em] rounded-xs text-center transition-all duration-300"
                >
                  Learn About Custom Manufacturing
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
