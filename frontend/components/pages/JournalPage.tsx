import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BLOG_ARTICLES, BlogArticle } from "../sections/section-data";
import { Container, Heading, SubHeading, Paragraph, SEO } from "../ui";
import { cn } from "../../lib/utils";

// Mock content databases for design readings
const JOURNAL_CONTENTS: Record<string, string> = {
  "blog-hotel-guide": "Procuring commercial-grade furniture for hotels requires a rigorous technical approach beyond aesthetic appeal. When buying from Jodhpur manufacturers, the primary specification is moisture content control. Timber must be kiln-dried to 8-12% relative humidity. This prevents warping, splitting, and joint failure when furniture is exposed to air conditioning or dry indoor heating in North American and European markets. Additionally, developers must prioritize timber legality, requiring FSC and Vriksh certifications. A successful hotel furniture program leverages standard container loads (FCL) to optimize freight budgets, utilizing robust double-wall corrugated cartons and wooden crate frames for safety in transit.",
  "blog-restaurant-trends": "Restaurant dining areas demand high durability under intensive traffic cycles. Today's fine-dining salons are moving away from ebonized synthetic finishes toward organic, reclaimed haveli teakwood which showcases natural grain character and historic scars. Visible mechanical joints, such as through-tenon and dowel pins, are highly favored as they emphasize structural honesty. Finished in organic, food-safe smoked matte oils rather than heavy chemical varnishes, these surfaces are highly resistant to wine and hot plate spills while allowing the wood to develop a rich, warm patina over time.",
  "blog-cane-ideas": "Incorporating natural cane into commercial spaces introduces tropical texture and visual lightness. In boutique resorts and hotels, cane easy chairs and partitions are utilized to construct airy lounge systems. Master craftsmen in Rajasthan workshops employ traditional steam-bending techniques to curve premium solid rattan poles. Woven cane mesh panels, especially double-woven star patterns, allow airflow and decrease overall furniture weight, creating comfortable, low-maintenance seating solutions for resort verandas and spa lobbies.",
  "blog-bone-guide": "Jodhpur bone inlay represents a royal legacy of hand-carved artistry. Ethically retrieved camel bone tiles are hand-split and carved into geometric chevron or floral damask motifs. These tiles are laid tile-by-tile onto solid mango wood cores and filled with pigmented organic resins. To ensure longevity, the cores must be stabilized using kiln-dried wood to prevent movement that could cause resin check-lines. Interior designers can specify custom Pantone resin shades to coordinate inlay sideboards and mirrors with their modern hospitality palettes.",
  "blog-maintenance": "To keep contract furniture in prime condition, commercial project developers must follow strict maintenance guidelines. Solid wood furniture should be polished periodically with organic beeswax or natural lemon oil rather than silicone sprays. Rattan and cane require light anti-fungal wiping and humidity-balancing with damp cloths to prevent cane fibers from turning brittle. Regular inspection of joint pins and re-tensioning rope grids ensures long-term structural integrity and safety.",
  "blog-export-guide": "Navigating the logistics of international furniture exports from India requires meticulous document handling and packaging standards. From Jodhpur's Inland Container Depot (ICD) dry port, containers are railed to Mundra or Kandla sea ports for loading onto cargo vessels. Solid wood cargo must be packed with humidity-absorbing gel sheets, wrapped in thick foam padding, and placed inside heavy corrugated export boxes secured on wooden pallets. Mandatory export documents include phytosanitary certificates, ISPM-15 wood fumigation records, and Vriksh legality certificates.",
  "blog-design-trends": "Modern commercial interior design is bridging clean geometric lines with traditional Rajasthani woodcarving proportions. This design direction, termed the Modern Haveli Edit, simplifies complex historic structures. It retains traditional mortise joinery and arched silhouettes but uses ebonized walnut or bleached teak finishes. By matching clean brass legs with detailed bone inlay cabinets or woven coir daybeds, designers create conversation statements that honor heritage craftsmanship within contemporary hotels.",
  "blog-cafe-guide": "Procuring commercial cafe furniture requires balancing outdoor weathering resistance with space-maximizing indoor footprints. Bistro tables are fabricated from seasoned solid acacia wood finished in poly-urethane weather-barriers, or reinforced steel frames paired with weather-stable stone tops. Rattan chairs are hand-woven with high-density polyethylene (HDPE) synthetic fibers over powder-coated aluminum cores to resist UV breakdown and monsoon rain. For indoor setups, banquette booths and space-saving nesting chairs allow restaurants and cafes to optimize guest density, ensuring durability under high daily turnover."
};

export default function JournalPage() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const articleIdParam = searchParams.get("article");

  const [scrollProgress, setScrollProgress] = useState(0);

  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscriberEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setSubscriberEmail("");
      }, 5000);
    }
  };

  useEffect(() => {
    if (!selectedArticle) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedArticle]);

  useEffect(() => {
    if (articleIdParam && blogs.length > 0) {
      const found = blogs.find((b) => b.id === articleIdParam);
      if (found) {
        setSelectedArticle(found);
      } else {
        setSelectedArticle(null);
      }
    } else {
      setSelectedArticle(null);
    }
  }, [articleIdParam, blogs]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/blogs`);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped = json.data.map((b: any): BlogArticle => {
          let category = "Design Trends";
          const slugLower = (b.slug || "").toLowerCase();
          if (slugLower.includes("hotel")) category = "Hotel Furniture";
          else if (slugLower.includes("restaurant")) category = "Restaurant Furniture";
          else if (slugLower.includes("cane")) category = "Cane Furniture";
          else if (slugLower.includes("bone")) category = "Bone Inlay";
          else if (slugLower.includes("maintenance")) category = "Hotel Furniture";
          else if (slugLower.includes("export")) category = "Furniture Export";
          else if (slugLower.includes("design")) category = "Design Trends";
          else if (slugLower.includes("cafe")) category = "Cafe Furniture";

          const readTimeMinutes = Math.max(3, Math.ceil((b.content || "").split(" ").length / 200));

          let formattedDate = b.published_date;
          try {
            const d = new Date(b.published_date);
            if (!isNaN(d.getTime())) {
              formattedDate = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
            }
          } catch {}

          let galleryImages: string[] = [];
          try {
            if (b.gallery_images) {
              galleryImages = typeof b.gallery_images === 'string' ? JSON.parse(b.gallery_images) : b.gallery_images;
            }
          } catch (e) {
            console.error("Failed to parse gallery_images:", e);
          }

          return {
            id: b.id.toString(),
            title: b.title,
            category,
            date: formattedDate,
            readTime: `${readTimeMinutes} min read`,
            image: b.featured_image || "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
            galleryImages,
            author: b.author || "Atelier Editor",
            href: "/journal",
            description: b.excerpt || "",
            content: b.content
          } as any;
        });
        setBlogs(mapped);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to retrieve blog publications.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchBlogsData();
  }, []);

  const categories = [
    "All Articles",
    "Hotel Furniture",
    "Restaurant Furniture",
    "Cafe Furniture",
    "Cane Furniture",
    "Bone Inlay",
    "Furniture Export",
    "Design Trends"
  ];

  const filteredArticles = blogs.filter((article) => {
    const matchesCategory = selectedCategory === "All Articles" || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const journalSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SB Artisan Journal & Export Guides",
    "description": "Professional sourcing insights, technical lumber manuals, Jodhpur kiln methods, and export packing guidelines for hospitality developers and trade importers.",
    "publisher": {
      "@type": "Organization",
      "name": "SB Artisan",
      "logo": "https://www.sbartisan.com/images/commercial_workshop_custom.png"
    }
  };

  const getCategoryCallout = (category: string) => {
    switch (category) {
      case "Cane Furniture":
        return {
          title: "The Atelier Cane Series",
          description: "Explore our collection of hand-tensioned tropical rattan easy chairs, lounge suites, and architectural room dividers.",
          link: "/collections/cane",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
        };
      case "Bone Inlay":
        return {
          title: "Royal Bone Inlay Casegoods",
          description: "Bespoke chests of drawers, mirrors, and console tables handcrafted tile-by-tile in traditional Rajasthani styles.",
          link: "/collections/bone",
          image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"
        };
      case "Hotel Furniture":
      case "Restaurant Furniture":
      case "Cafe Furniture":
        return {
          title: "Hospitality Contract Series",
          description: "Engineered solid wood seating, dining tables, and heavy-duty bar stools built for high-traffic environments.",
          link: "/collections",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
        };
      default:
        return {
          title: "Custom Craftsmanship Portfolio",
          description: "Browse our complete catalog of solid wood, iron joinery, and custom contract projects exported globally.",
          link: "/collections",
          image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80"
        };
    }
  };

  const getCategoryCount = (category: string) => {
    if (category === "All Articles") return blogs.length;
    return blogs.filter((b) => b.category === category).length;
  };

  return (
    <div className="bg-[#FDFCF7] pt-28 pb-20 selection:bg-[#EAE5D9]">
      {/* Scroll Progress Bar */}
      {selectedArticle && (
        <div className="fixed top-0 left-0 w-full h-[3px] bg-[#EAE5D9] z-50">
          <div 
            className="h-full bg-[#8C6D4F] transition-all duration-100 ease-out" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}
      <SEO 
        title={selectedArticle ? `${selectedArticle.title} - SB Artisan Journal` : "Furniture Insights & Export Guides | SB Artisan Jodhpur"}
        description={selectedArticle ? selectedArticle.description : "Explore SB Artisan's B2B knowledge base: technical specifications for commercial furniture seasoning, custom inlay commissions, and export container logistics coordinates."}
        keywords="hospitality furniture procurement, furniture manufacturer Jodhpur, solid wood kiln seasoning, export coordinates India, hotel furniture supplier Jodhpur"
        canonical={selectedArticle ? `/journal?article=${selectedArticle.id}` : "/journal"}
        schema={journalSchema}
      />
      
      {selectedArticle ? (
        (() => {
          const callout = getCategoryCallout(selectedArticle.category);
          const relatedArticles = blogs.filter((b) => b.id !== selectedArticle.id).slice(0, 3);

          return (
            <Container variant="default" className="py-8">
              {/* Back button */}
              <button
                onClick={() => setSearchParams({})}
                className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8C8273] hover:text-[#1A1A1A] transition-colors duration-300 mb-10 border-none bg-transparent cursor-pointer outline-none"
              >
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 8H1M6 13L1 8l5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Journal Archive
              </button>

              {/* Split Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
                {/* Left Side: Metadata and Title */}
                <div className="lg:col-span-6 space-y-6">
                  <span className="inline-block text-[9px] uppercase tracking-[0.25em] font-sans text-[#8C6D4F] border border-[#8C6D4F]/20 px-3 py-1 bg-[#FAF8F2] rounded-xs">
                    {selectedArticle.category} • {selectedArticle.readTime}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight tracking-wide">
                    {selectedArticle.title}
                  </h1>
                  
                  {/* Excerpt Pullquote style */}
                  <p className="font-serif text-lg text-[#8C8273] italic leading-relaxed font-light border-l-2 border-[#8C6D4F] pl-6 py-1 my-4">
                    {selectedArticle.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-sans text-[#8C8273] font-light pt-2">
                    <div className="w-8 h-8 rounded-full bg-[#EAE5D9] flex items-center justify-center font-serif text-xs text-[#8C6D4F] font-bold">
                      {selectedArticle.author.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div>
                      <span className="block text-[#1A1A1A] font-medium">{selectedArticle.author}</span>
                      <span className="block text-[10px] text-[#8C8273]">{selectedArticle.date}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Zoom Hero Image */}
                <div className="lg:col-span-6">
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[#F5F2EA] border border-[#EAE5D9] rounded-sm shadow-md group">
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover object-center transition-transform duration-[2000ms] group-hover:scale-102"
                    />
                  </div>
                </div>
              </div>

              {/* Two-Column Reading Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
                {/* Sidebar Column */}
                <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
                  {/* Quick Info Box */}
                  <div className="border border-[#EAE5D9] bg-[#FAF8F2]/50 p-6 rounded-sm space-y-6">
                    <div>
                      <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold font-mono">AUTHOR</span>
                      <p className="text-xs font-sans text-[#1A1A1A] font-light mt-1">{selectedArticle.author}</p>
                    </div>

                    <div className="border-t border-[#EAE5D9] pt-4">
                      <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold font-mono">PUBLISHED</span>
                      <p className="text-xs font-sans text-[#1A1A1A] font-light mt-1">{selectedArticle.date}</p>
                    </div>

                    <div className="border-t border-[#EAE5D9] pt-4">
                      <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold font-mono">EST. READING TIME</span>
                      <p className="text-xs font-sans text-[#1A1A1A] font-light mt-1">{selectedArticle.readTime}</p>
                    </div>
                  </div>

                  {/* B2B Sourcing Advantage CTA Card */}
                  <div className="border border-[#8C6D4F]/30 bg-[#1E1D1B] p-6 rounded-sm text-[#EAE5D9] space-y-4 shadow-lg">
                    <span className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">SB ARTISAN TRADE DESK</span>
                    <h4 className="font-serif text-sm font-light text-white leading-snug">Procuring Custom Contract Lots?</h4>
                    <p className="text-[11px] text-[#9E9B95] font-light leading-relaxed">
                      We specialize in high-capacity hospitality fabrication directly from our Jodhpur workshops. Seasoned timber, certified specs, and complete container freight coordination.
                    </p>
                    <a
                      href="/contact"
                      className="block w-full py-2.5 bg-[#8C6D4F] hover:bg-[#A3927B] text-[#0F0E0D] hover:text-[#0F0E0D] text-[9px] font-semibold uppercase tracking-[0.2em] rounded-xs text-center transition-all duration-300"
                    >
                      Inquire B2B Trade Details
                    </a>
                  </div>
                </aside>

                {/* Article Main Body Column */}
                <main className="lg:col-span-8 space-y-8">
                  <div className="w-full font-sans text-sm text-[#5A5751] font-light leading-relaxed space-y-6 text-justify">
                    {/* Paragraphs with Dropcap on first letter */}
                    {(() => {
                      const content = (selectedArticle as any).content || JOURNAL_CONTENTS[selectedArticle.id] || "Dossier content matches catalog details...";
                      const paragraphs = content.split("\n\n").filter((p: string) => p.trim() !== "");
                      
                      return paragraphs.map((para: string, idx: number) => {
                        if (idx === 0) {
                          return (
                            <p key={idx} className="text-base text-[#2D2A26] font-light leading-relaxed first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:text-[#8C6D4F] first-letter:mr-3 first-letter:mt-1">
                              {para}
                            </p>
                          );
                        }
                        return (
                          <p key={idx} className="text-base text-[#2D2A26] font-light leading-relaxed">
                            {para}
                          </p>
                        );
                      });
                    })()}

                    {/* Standard details block */}
                    <p className="text-base text-[#2D2A26] font-light leading-relaxed">
                      As an export-oriented manufacturer, SB Artisan ensures all orders strictly align with destination coordinates. Every batch processed through our Jodhpur facility goes through seasoned checks, double-insulated structural finishes, and drop-tested cardboard packaging configurations suitable for sea-freight container corridors. We guarantee compliance with FSC and Vriksh standards for all international shipments.
                    </p>
                    <p className="text-base text-[#2D2A26] font-light leading-relaxed">
                      Our design team collaborates directly with architectural firms and hospitality designers globally to manufacture custom furniture programs. From large-scale hotel projects to boutique resort installations, we coordinate each detail to fit your technical and aesthetic criteria.
                    </p>

                    {/* Article Gallery Grid */}
                    {(selectedArticle as any).galleryImages && (selectedArticle as any).galleryImages.length > 0 && (
                      <div className="my-10 space-y-4 pt-4 border-t border-[#EAE5D9]">
                        <span className="text-[9px] uppercase tracking-widest text-[#8C6D4F] font-mono font-semibold block">Article Gallery Portfolio</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {(selectedArticle as any).galleryImages.map((imgUrl: string, imgIdx: number) => (
                            <div key={imgIdx} className="aspect-[16/10] overflow-hidden bg-[#FAF8F2] border border-[#EAE5D9] rounded-sm group shadow-xs">
                              <img 
                                src={imgUrl} 
                                alt={`${selectedArticle.title} Gallery - ${imgIdx + 1}`} 
                                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-103"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Category-Specific Collections Callout */}
                    {callout && (
                      <div className="my-8 border border-[#EAE5D9] bg-[#FAF8F2] rounded-sm overflow-hidden flex flex-col md:flex-row group shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden bg-[#F5F2EA]">
                          <img 
                            src={callout.image} 
                            alt={callout.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80";
                            }}
                          />
                        </div>
                        <div className="p-6 md:w-2/3 space-y-3 flex flex-col justify-center">
                          <span className="text-[8px] uppercase tracking-widest text-[#8C6D4F] font-mono font-semibold">RECOMMENDED COLLECTION</span>
                          <h5 className="font-serif text-base text-[#1A1A1A] font-light leading-snug">{callout.title}</h5>
                          <p className="text-xs text-[#6E6B64] font-light leading-relaxed">{callout.description}</p>
                          <a 
                            href={callout.link}
                            className="text-[9px] uppercase tracking-[0.15em] font-medium text-[#1A1A1A] hover:text-[#8C6D4F] inline-flex items-center gap-1 transition-colors pt-2"
                          >
                            View Catalog
                            <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </main>
              </div>

              {/* Bottom Action Section */}
              <div className="border-t border-[#EAE5D9] pt-12 mt-16 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-serif text-lg text-[#1A1A1A] font-light">Interested in custom contract commissions?</h4>
                  <p className="text-xs text-[#8C8273] font-light">Contact our design desk to explore materials, finishes, and trade pricing guidelines.</p>
                </div>
                <a
                  href="/contact"
                  className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium py-3.5 px-8 bg-[#1A1A1A] text-white hover:bg-[#8C6D4F] transition-all duration-300 rounded-xs shrink-0 text-center"
                >
                  Inquire about project
                </a>
              </div>

              {/* Related Articles Section */}
              {relatedArticles.length > 0 && (
                <div className="border-t border-[#EAE5D9] pt-16 mt-20 space-y-8">
                  <div className="text-center md:text-left space-y-2">
                    <span className="text-[9px] uppercase tracking-widest text-[#8C6D4F] font-mono font-semibold">FURTHER READING</span>
                    <h4 className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A]">Related Publications & Guides</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedArticles.map((article) => (
                      <article
                        key={article.id}
                        className="group flex flex-col justify-between bg-white border border-[#EAE5D9] p-5 rounded-sm cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
                        onClick={() => setSearchParams({ article: article.id })}
                      >
                        <div className="space-y-4">
                          <div className="aspect-[16/10] w-full overflow-hidden bg-[#F5F2EA] relative rounded-xs">
                            <div className="absolute inset-0 bg-black/[0.02] z-10 pointer-events-none group-hover:bg-black/5 transition-colors duration-500" />
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover object-center transition-transform duration-[1500ms] ease-out group-hover:scale-103"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <span className="inline-block text-[8px] uppercase tracking-wider font-mono text-[#8C6D4F] bg-[#FAF8F2] border border-[#EAE5D9] px-2 py-0.5 rounded-xs">
                              {article.category}
                            </span>
                            <h4 className="font-serif text-sm text-[#1A1A1A] font-light leading-snug group-hover:text-[#8C6D4F] transition-colors duration-300 line-clamp-2">
                              {article.title}
                            </h4>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-[#F2EDE2] flex justify-between items-center text-[9px] font-mono text-[#9E9B95]">
                          <span>{article.date}</span>
                          <span className="text-[#1A1A1A] group-hover:text-[#8C6D4F] transition-colors">Read Guide →</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

            </Container>
          );
        })()
      ) : (
        <>
          {/* 1. EDITORIAL HERO HEADER SECTION */}
          <section className="py-16 border-b border-[#EAE5D9] bg-[#FAF8F2]/50">
            <Container variant="default">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Side: Brand and Title */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="h-[1px] w-8 bg-[#8C6D4F]" />
                    <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-[#8C6D4F] font-semibold">
                      Jodhpur Workshops • Rajasthan, India
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-none tracking-tight">
                      SB Artisan Journal
                    </h1>
                    <p className="font-mono text-[10px] text-[#8C8273] uppercase tracking-widest">
                      B2B Sourcing Intelligence & Technical Guides
                    </p>
                  </div>

                  <p className="max-w-2xl font-serif text-base text-[#5A5751] font-light leading-relaxed">
                    Explore kiln wood seasoning parameters, traditional bone inlay cabinetry methods, tropical rattan steam-bending guides, and international container freight logistics coordinates compiled by our master craftsmen and shipping desks.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-[10px] font-mono text-[#8C8273]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Seasoning status: 8% Optimal</span>
                    </div>
                    <span>•</span>
                    <span>ICD Jodhpur Port Active</span>
                    <span>•</span>
                    <span>Updated Weekly</span>
                  </div>
                </div>

                {/* Right Side: Sourcing Bulletin Subscription */}
                <div className="lg:col-span-4 bg-white border border-[#EAE5D9] p-6 rounded-sm space-y-5 shadow-xs">
                  <div className="space-y-2">
                    <span className="text-[8px] uppercase tracking-widest text-[#8C6D4F] font-mono font-semibold block">NEWSLETTER</span>
                    <h3 className="font-serif text-base text-[#1A1A1A] font-light leading-snug">Sourcing Bulletin</h3>
                    <p className="text-xs text-[#6E6B64] font-light leading-relaxed">
                      Subscribe to receive technical specifications, wood seasoning schedules, and new furniture container lots.
                    </p>
                  </div>

                  {isSubscribed ? (
                    <div className="bg-emerald-50/50 border border-emerald-200/50 text-emerald-800 text-[11px] p-3 rounded-xs font-light text-center">
                      ✓ Thank you for subscribing. Sourcing intelligence will be delivered to your inbox.
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-3">
                      <input
                        type="email"
                        required
                        placeholder="Enter trade email address"
                        value={subscriberEmail}
                        onChange={(e) => setSubscriberEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#EAE5D9] rounded-xs text-xs font-light text-[#1A1A1A] placeholder-[#9E9B95] focus:outline-none focus:border-[#8C6D4F] transition-all duration-300"
                      />
                      <button
                        type="submit"
                        className="w-full py-2 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white text-[9px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-xs cursor-pointer outline-none"
                      >
                        Subscribe to Bulletin
                      </button>
                    </form>
                  )}
                  
                  <span className="block text-[8px] text-[#9E9B95] text-center font-mono leading-none">
                    Unsubscribe at any time. Secure B2B data channel.
                  </span>
                </div>
              </div>
            </Container>
          </section>

          {/* 2. MAIN ARTICLES LAYOUT */}
          <section className="py-16">
            <Container variant="default">
              
              {/* Search & Category Filter Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#EAE5D9] pb-6 mb-12">
                {/* Search Input */}
                <div className="relative w-full lg:max-w-xs">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#8C8273]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search technical guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-white border border-[#EAE5D9] rounded-xs text-xs font-light placeholder-[#9E9B95] text-[#1A1A1A] focus:outline-none focus:border-[#8C6D4F] transition-all duration-300"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-3 flex items-center text-[#8C8273] hover:text-[#1A1A1A]"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Category Filter list with Counts */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
                  {categories.map((cat) => {
                    const count = getCategoryCount(cat);
                    if (count === 0 && searchQuery) return null;

                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "px-3 py-1.5 text-[9px] uppercase tracking-wider font-mono whitespace-nowrap rounded-xs transition-all duration-200 outline-none cursor-pointer border flex items-center gap-1.5",
                          selectedCategory === cat
                            ? "bg-[#1A1A1A] border-[#1A1A1A] text-white"
                            : "bg-white border-[#EAE5D9] text-[#6E6B64] hover:border-[#8C6D4F] hover:text-[#1A1A1A]"
                        )}
                      >
                        <span>{cat}</span>
                        <span className={cn(
                          "text-[8px] font-mono px-1 rounded-full",
                          selectedCategory === cat ? "bg-[#333333] text-[#FAF8F2]" : "bg-[#FAF8F2] text-[#8C8273]"
                        )}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Featured and Grid Sections with States */}
              {isLoading ? (
                <div className="space-y-16">
                  {/* Featured Skeleton */}
                  {!searchQuery && selectedCategory === "All Articles" && (
                    <div className="space-y-4">
                      <div className="h-4 bg-[#F5F2EA] w-48 rounded-xs animate-pulse" />
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-[#EAE5D9] bg-white rounded-sm overflow-hidden animate-pulse">
                        <div className="lg:col-span-7 aspect-[16/10] lg:h-[400px] bg-[#F5F2EA]" />
                        <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                          <div className="space-y-4">
                            <div className="h-6 bg-[#F5F2EA] w-24 rounded-xs" />
                            <div className="h-8 bg-[#F5F2EA] w-3/4 rounded-xs" />
                            <div className="h-16 bg-[#F5F2EA] w-full rounded-xs" />
                          </div>
                          <div className="h-10 bg-[#F5F2EA] w-full rounded-xs" />
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Grid Skeletons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="flex flex-col justify-between bg-white border border-[#EAE5D9] p-5 rounded-sm animate-pulse space-y-4">
                        <div className="aspect-[16/10] w-full bg-[#F5F2EA] rounded-xs" />
                        <div className="space-y-3">
                          <div className="h-5 bg-[#F5F2EA] w-1/4 rounded-xs" />
                          <div className="h-6 bg-[#F5F2EA] w-3/4 rounded-xs" />
                          <div className="h-12 bg-[#F5F2EA] w-full rounded-xs" />
                        </div>
                        <div className="h-10 bg-[#F5F2EA] w-full rounded-xs pt-4" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : error ? (
                <div className="py-20 text-center space-y-6 max-w-md mx-auto select-none">
                  <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500 mx-auto">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg text-[#1A1A1A] font-light">Failed to load publications</h4>
                    <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed">{error}</p>
                  </div>
                  <button
                    onClick={fetchBlogsData}
                    className="px-5 py-2.5 bg-[#1A1A1A] text-white hover:bg-[#8C6D4F] font-sans text-[10px] uppercase tracking-widest font-medium transition-all duration-300 rounded-sm cursor-pointer"
                  >
                    Retry Connection
                  </button>
                </div>
              ) : (
                <>
                  {/* Featured Article Section */}
                  {!searchQuery && selectedCategory === "All Articles" && blogs.length > 0 && (
                    <div className="mb-16">
                      <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block mb-4">
                        Featured Technical Publication
                      </span>
                      <div 
                        onClick={() => setSearchParams({ article: blogs[0].id })}
                        className="group grid grid-cols-1 lg:grid-cols-12 gap-8 border border-[#EAE5D9] bg-white rounded-sm overflow-hidden cursor-pointer shadow-xs hover:shadow-md hover:border-[#8C6D4F]/30 transition-all duration-500"
                      >
                        <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-[420px] overflow-hidden bg-[#F5F2EA] relative">
                          <div className="absolute inset-0 bg-black/[0.01] z-10 pointer-events-none group-hover:bg-black/5 transition-colors duration-500" />
                          <img
                            src={blogs[0].image}
                            alt={blogs[0].title}
                            className="w-full h-full object-cover object-center transition-transform duration-[2000ms] ease-out group-hover:scale-102"
                          />
                          <div className="absolute bottom-4 left-4 bg-[#1E1D1B]/90 backdrop-blur-xs text-[#EAE5D9] text-[8px] font-mono px-3 py-1.5 rounded-xs tracking-wider z-20 border border-[#8C6D4F]/30">
                            Figure 1.1 — Kiln seasoning analysis Jodhpur
                          </div>
                        </div>
                        <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                          <div className="space-y-4">
                            <span className="inline-block text-[8px] uppercase tracking-[0.25em] font-mono text-[#8C6D4F] border border-[#8C6D4F]/20 px-2.5 py-1 rounded-xs bg-[#FAF8F2]">
                              {blogs[0].category}
                            </span>
                            <h3 className="font-serif text-2xl lg:text-3xl font-light text-[#1A1A1A] leading-tight group-hover:text-[#8C6D4F] transition-colors duration-300">
                              {blogs[0].title}
                            </h3>
                            <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                              {blogs[0].description}
                            </p>
                          </div>
                          <div className="space-y-4 pt-6 border-t border-[#F2EDE2]">
                            <div className="flex justify-between items-center text-[9px] font-mono text-[#9E9B95] font-light">
                              <span>Authored by {blogs[0].author}</span>
                              <span>{blogs[0].date} • {blogs[0].readTime}</span>
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.15em] font-sans font-semibold text-[#1A1A1A] group-hover:text-[#8C6D4F] inline-flex items-center gap-1.5 transition-colors">
                              Read Technical Guide
                              <svg className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Grid Layout of Articles */}
                  {filteredArticles.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-[#EAE5D9] rounded-sm bg-[#FAF8F2]/50">
                      <svg className="w-10 h-10 text-[#8C8273] mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-sm font-light text-[#5A5751]">No export guides or articles matches your query.</p>
                      <button 
                        onClick={() => { setSearchQuery(""); setSelectedCategory("All Articles"); }}
                        className="mt-4 text-[10px] uppercase tracking-widest text-[#8C6D4F] font-mono border-b border-[#8C6D4F] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                      >
                        Clear filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredArticles.map((article) => {
                        const isFirstInAll = !searchQuery && selectedCategory === "All Articles" && blogs.length > 0 && article.id === blogs[0].id;
                        if (isFirstInAll) return null;

                        return (
                          <article
                            key={article.id}
                            className="group flex flex-col justify-between bg-white border border-[#EAE5D9] p-5 rounded-sm cursor-pointer shadow-xs hover:shadow-md hover:border-[#8C6D4F]/30 hover:bg-[#FAF8F2]/20 transition-all duration-300"
                            onClick={() => setSearchParams({ article: article.id })}
                          >
                            <div className="space-y-4">
                              {/* Image Container */}
                              <div className="aspect-[16/10] w-full overflow-hidden bg-[#F5F2EA] relative rounded-xs border border-[#EAE5D9]/50">
                                <div className="absolute inset-0 bg-black/[0.01] z-10 pointer-events-none group-hover:bg-black/5 transition-colors duration-500" />
                                <img
                                  src={article.image}
                                  alt={article.title}
                                  className="w-full h-full object-cover object-center transition-transform duration-[1500ms] ease-out group-hover:scale-103"
                                />
                              </div>

                              {/* Info Metadata */}
                              <div className="space-y-3">
                                <span className="inline-block text-[8px] uppercase tracking-wider font-mono text-[#8C6D4F] bg-[#FAF8F2] border border-[#EAE5D9] px-2 py-0.5 rounded-xs">
                                  {article.category}
                                </span>
                                
                                <h3 className="font-serif text-base text-[#1A1A1A] font-light leading-snug group-hover:text-[#8C6D4F] transition-colors duration-300 line-clamp-2">
                                  {article.title}
                                </h3>
                                
                                <p className="text-xs text-[#6E6B64] font-light leading-relaxed line-clamp-3">
                                  {article.description}
                                </p>
                              </div>
                            </div>

                            <div className="pt-5 mt-5 border-t border-[#F2EDE2] space-y-3">
                              <div className="flex justify-between items-center text-[9px] font-mono text-[#9E9B95] font-light">
                                <span>By {article.author}</span>
                                <span>{article.date}</span>
                              </div>

                              <div className="flex justify-between items-center pt-1">
                                <span className="text-[8px] text-[#8C8273] font-mono">{article.readTime}</span>
                                <span className="text-[10px] uppercase tracking-[0.15em] font-sans font-semibold text-[#1A1A1A] group-hover:text-[#8C6D4F] inline-flex items-center gap-1 transition-colors">
                                  Read Guide
                                  <svg className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}

                  {/* 5. BOTTOM TRADE CATALOG PROMO BANNER */}
                  <div className="mt-20 border border-[#8C6D4F]/30 bg-[#1E1D1B] p-8 lg:p-12 rounded-sm text-[#EAE5D9] relative overflow-hidden group shadow-lg">
                    {/* Background architectural details */}
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
                          PRINTED SPECIFICATIONS CATALOG
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-white font-light leading-snug">
                          Request the SB Artisan Lumber & Joinery Manual
                        </h2>
                        <p className="text-xs text-[#9E9B95] font-light leading-relaxed max-w-xl">
                          Our comprehensive B2B manual details lumber kiln schedules, wood density certifications, camel bone sourcing guidelines, and tropical cane stress metrics. Perfect for procurement offices and architectural reference libraries.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <a
                          href="/contact"
                          className="px-6 py-3 bg-[#8C6D4F] hover:bg-[#A3927B] text-[#0F0E0D] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-xs text-center transition-all duration-300"
                        >
                          Request Printed Copy
                        </a>
                        <a
                          href="/collections"
                          className="px-6 py-3 border border-[#EAE5D9]/20 hover:border-[#8C6D4F]/50 text-white text-[10px] font-semibold uppercase tracking-[0.2em] rounded-xs text-center transition-all duration-300"
                        >
                          Browse Online Collections
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}

            </Container>
          </section>
        </>
      )}
    </div>
  );
}
