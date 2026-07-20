import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Heading, Paragraph, SEO, PrimaryButton } from "../ui";
import { cn } from "../../lib/utils";

interface InquiryRecord {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  firm: string;
  product: string;
  category: string;
  message: string;
  date: string;
  status: "New" | "Contacted" | "Quotation Sent" | "Closed";
  notes?: string;
  volume?: number;
}

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Form states for Request a Quote
  const [quoteName, setQuoteName] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteCompany, setQuoteCompany] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [quoteStatus, setQuoteStatus] = useState<"idle" | "loading" | "success">("idle");

  // Submit Handler for Quote Request
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quoteEmail || !quoteMessage) return;

    setQuoteStatus("loading");

    setTimeout(() => {
      const newInquiry: InquiryRecord = {
        id: `inq-${Date.now()}`,
        clientName: quoteName,
        email: quoteEmail,
        phone: quotePhone || "Not Provided",
        firm: quoteCompany || "Not Provided",
        product: "B2B Quote Request",
        category: "Hospitality Furniture",
        message: quoteMessage,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        status: "New",
        volume: 1,
      };

      try {
        const saved = localStorage.getItem("sbartisan_inquiries");
        const list = saved ? JSON.parse(saved) : [];
        list.unshift(newInquiry);
        localStorage.setItem("sbartisan_inquiries", JSON.stringify(list));
      } catch (err) {
        console.error("Failed to sync inquiry to local storage", err);
      }

      setQuoteStatus("success");
    }, 1200);
  };

  // WhatsApp click handlers with pre-filled department messages
  const launchWhatsApp = (department: "rfq" | "production" | "logistics") => {
    let text = "";
    if (department === "rfq") {
      text = "Hello SB Artisan, I am seeking a custom CAD drawing approval and manufacturing bid for an upcoming B2B contract project.";
    } else if (department === "production") {
      text = "Hello SB Artisan, I would like to request a production status report and progress images for our active furniture orders.";
    } else {
      text = "Hello SB Artisan, I want to check shipping transit schedules, container loading capacities, and certificate files (FSC/fumigation).";
    }
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919602114711?text=${encoded}`, "_blank");
  };

  // B2B FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    {
      q: "What is your Minimum Order Quantity (MOQ) for international container exports?",
      a: "Our standard export MOQ is one 20ft container (approx. 28-33 CBM). We allow client to mix up to 6 different catalog designs to construct a balanced import container. Small batch LCL/pallet loads are processed on a case-by-case basis for high-end hospitality designs."
    },
    {
      q: "Can we submit custom shop drawings, or do you offer OEM/ODM services?",
      a: "Yes. Over 70% of our production is fully customized OEM contract furniture. We have an in-house drafting desk using AutoCAD and SolidWorks. We submit precise 2D shop drawings, joinery cutaways, and physical wood finish blocks to procurement agents for approval prior to raw saw cutting."
    },
    {
      q: "How do you guarantee wood moisture stability in cold, dry climates (e.g. US, Northern Europe)?",
      a: "Jodhpur is famous for its seasoned solid wood. We operate heavy-duty vacuum drying chambers that reduce wood moisture levels to a stabilized 8-12%. Every joint is reinforced with tension-relief cuts and tongue-and-groove joinery, shielding our furniture from cracking or twisting in low-humidity zones."
    },
    {
      q: "What certifications do your lumber and factory hold?",
      a: "We are committed to legal harvesting and trade ethics. Our factory operates under the Forest Stewardship Council (FSC) Certification, EPA TSCA Title VI compliance, and the Indian Vriksh Timber Legality Assessment. We are also active members of EPCH (Export Promotion Council for Handicrafts)."
    },
    {
      q: "What are your standard payment terms and shipping transit times?",
      a: "Our payment terms are T/T (30% deposit to initiate shop drawings, 70% balance against scanning of Original Bill of Lading) or Irrevocable Letter of Credit (L/C) at sight. Shipping lead times range between 8 to 11 weeks for manufacturing, with an extra 20-30 days ocean transit depending on destination ports."
    }
  ];

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SB Artisan Jodhpur Factory",
    "image": "https://www.sbartisan.com/images/commercial_workshop_custom.png",
    "telephone": "+91-96021-14711, +91-70144-37945",
    "email": "contact@sbartisan.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "SB-Artisan, iStart Nest Incubation Center, Vikramaditya Nagar, Surya Colony",
      "addressLocality": "Jodhpur",
      "addressRegion": "Rajasthan",
      "postalCode": "342011",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.2358",
      "longitude": "73.0033"
    },
    "url": "https://www.sbartisan.com/contact"
  };

  return (
    <div className="bg-[#FDFCF7] pt-24 pb-20 selection:bg-[#EAE5D9] text-[#1A1A1A] font-sans antialiased overflow-x-hidden">
      <SEO 
        title="Jodhpur Factory Export & Sourcing Coordinates"
        description="Contact our Jodhpur furniture manufacturing plant coordinates directly. Speak to our custom RFQ, quality control, or container logistics desks."
        keywords="contact furniture manufacturer Jodhpur, Jodhpur factory export coordinates, furniture wholesale Jodhpur, custom design RFQ India"
        canonical="/contact"
        schema={contactSchema}
      />
      




      {/* 3. FACTORY PROFILE SHOWCASE */}
      <section className="py-20 bg-[#FAF8F2] border-b border-[#F2EDE2]">
        <Container variant="default" className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Visual Factory Floor */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative border border-[#EAE5D9] rounded-sm overflow-hidden bg-white group shadow-sm">
                <img
                  src="/images/commercial_workshop_custom.png"
                  alt="SB Artisan Jodhpur Production Hub Floor"
                  className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[9px] uppercase tracking-widest text-[#8C6D4F] font-mono">Pal Gaon, Jodhpur</span>
                  <h3 className="font-serif text-lg font-light tracking-wide mt-1">Jodhpur Production Headquarters</h3>
                  <p className="text-[11px] text-gray-300 font-light mt-1 max-w-md">
                    Integrated logs wood seasoning kilns, carpentry workshops, polishing facilities, and secure container crating bays.
                  </p>
                </div>
              </div>

              {/* Technical Certifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#FDFCF7] border border-[#EAE5D9] p-3 rounded-sm text-center">
                  <span className="block text-xs font-serif text-[#1A1A1A]">FSC® Cert</span>
                  <span className="text-[8px] text-[#8C8273] font-mono uppercase tracking-wider block mt-1">Sustainable Wood</span>
                </div>
                <div className="bg-[#FDFCF7] border border-[#EAE5D9] p-3 rounded-sm text-center">
                  <span className="block text-xs font-serif text-[#1A1A1A]">Vriksh compliant</span>
                  <span className="text-[8px] text-[#8C8273] font-mono uppercase tracking-wider block mt-1">Forest Legality</span>
                </div>
                <div className="bg-[#FDFCF7] border border-[#EAE5D9] p-3 rounded-sm text-center">
                  <span className="block text-xs font-serif text-[#1A1A1A]">ISO 9001:2015</span>
                  <span className="text-[8px] text-[#8C8273] font-mono uppercase tracking-wider block mt-1">Quality Standards</span>
                </div>
                <div className="bg-[#FDFCF7] border border-[#EAE5D9] p-3 rounded-sm text-center">
                  <span className="block text-xs font-serif text-[#1A1A1A]">EPCH Member</span>
                  <span className="text-[8px] text-[#8C8273] font-mono uppercase tracking-wider block mt-1">Craft Council</span>
                </div>
              </div>
            </div>

            {/* Right Column: Factory Specs & Moisture Control */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">
                  MANUFACTURING METRICS
                </span>
                <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A]">
                  Built For Global Destination Specs
                </Heading>
                <div className="w-12 h-[1.5px] bg-[#8C6D4F]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D4F]" />
                    <h4 className="font-serif text-sm font-light text-[#1A1A1A]">45,000 SQ FT Facility</h4>
                  </div>
                  <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                    Houses fully segregated sawmill sections, structural sanders, joint routing machinery, and double-insulated lacquer bays to support commercial contracts.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D4F]" />
                    <h4 className="font-serif text-sm font-light text-[#1A1A1A]">Moisture Kiln Control</h4>
                  </div>
                  <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                    20,000 cubic feet timber kiln capacity ensuring lumber relative humidity is lowered to 8-12% preventing cracking in heated spaces.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D4F]" />
                    <h4 className="font-serif text-sm font-light text-[#1A1A1A]">40 Container Monthly Volume</h4>
                  </div>
                  <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                    Highly scalable production capacity, structured cargo workflows, phytosanitary treatment clearances, and certified fumigation processes.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D4F]" />
                    <h4 className="font-serif text-sm font-light text-[#1A1A1A]">ICD Dry Port Transit</h4>
                  </div>
                  <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                    Fast access via Jodhpur Inland Container Depot directly linked to Mundra/Kandla sea ports in 48 hours, keeping logistics highly coordinated.
                  </p>
                </div>
              </div>

              {/* Timber Species Profiles */}
              <div className="p-5 border border-[#EAE5D9] bg-[#FDFCF7] rounded-sm space-y-3">
                <span className="text-[9px] uppercase tracking-widest text-[#8C8273] font-mono block">WOOD SPECIES PROFILES</span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] bg-[#FAF8F2] border border-[#EAE5D9] px-2 py-1 text-[#1A1A1A] rounded-xs font-mono">Premium Indian Teak</span>
                  <span className="text-[10px] bg-[#FAF8F2] border border-[#EAE5D9] px-2 py-1 text-[#1A1A1A] rounded-xs font-mono">Acacia Wood</span>
                  <span className="text-[10px] bg-[#FAF8F2] border border-[#EAE5D9] px-2 py-1 text-[#1A1A1A] rounded-xs font-mono">Sheesham (Indian Rosewood)</span>
                  <span className="text-[10px] bg-[#FAF8F2] border border-[#EAE5D9] px-2 py-1 text-[#1A1A1A] rounded-xs font-mono">Mango Timber</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>



      {/* 4. DUAL WHATSAPP CONCIERGE & CHANNELS */}
      <section className="py-20 border-b border-[#F2EDE2] bg-[#FDFCF7]">
        <Container variant="default" className="space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">
              REAL-TIME COLLABORATION
            </span>
            <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A] leading-tight">
              Direct Trade Desk & Department Channels
            </Heading>
            <Paragraph variant="md" className="text-[#5A5751] font-light max-w-xl">
              Connect directly with our specialized factory units. Select a channel below to initiate a WhatsApp workspace conversation with pre-loaded context templates.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Channel A: Pre-Contract / Quotes */}
            <div className="border border-[#EAE5D9] bg-gradient-to-br from-[#FDFCF7] to-[#FAF8F2] p-8 rounded-xs flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#8C6D4F]/40 hover:from-white hover:to-white group">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#8C6D4F]/10 text-[#8C6D4F] flex items-center justify-center rounded-xs group-hover:bg-[#8C6D4F] group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h4 className="font-serif text-base text-[#1A1A1A] font-light">Custom RFQ & CAD Desk</h4>
                <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                  Submit shop drawings, custom hotel layouts, wood finishing specifications, and requests for wholesale trade discounts.
                </p>
              </div>

              <button
                onClick={() => launchWhatsApp("rfq")}
                className="w-full py-3.5 border border-[#8C6D4F] hover:bg-[#8C6D4F] hover:text-white text-[#8C6D4F] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-transparent"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.457 3.473 1.332 4.99L2 22l5.176-1.357a9.92 9.92 0 004.836 1.258h.005c5.506 0 9.987-4.482 9.987-9.988C22 6.482 17.518 2 12.012 2zm5.776 14.156c-.246.696-1.43 1.31-1.956 1.396-.477.078-1.096.148-3.176-.71-2.656-1.096-4.366-3.79-4.5-3.966-.13-.178-1.066-1.423-1.066-2.715 0-1.29.673-1.922.91-2.184.24-.262.527-.328.706-.328.178 0 .356.006.51.012.164.006.386-.062.604.46.224.536.76 1.86.826 1.996.066.136.108.296.018.476-.09.18-.178.29-.356.5-.178.21-.376.47-.536.63-.178.178-.366.372-.158.73.208.358.924 1.524 1.98 2.466 1.362 1.214 2.51 1.592 2.868 1.772.358.18.564.15.774-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.32.12 2.03.956 2.38 1.126.35.17.584.254.67.4.086.148.086.852-.16 1.548z" />
                </svg>
                Chat Custom Specs
              </button>
            </div>

            {/* Channel B: Production & QC */}
            <div className="border border-[#EAE5D9] bg-gradient-to-br from-[#FDFCF7] to-[#FAF8F2] p-8 rounded-xs flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#8C6D4F]/40 hover:from-white hover:to-white group">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#8C6D4F]/10 text-[#8C6D4F] flex items-center justify-center rounded-xs group-hover:bg-[#8C6D4F] group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                </div>
                <h4 className="font-serif text-base text-[#1A1A1A] font-light">QC & Production Desk</h4>
                <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                  Monitor work-in-progress. Request weekly manufacturing photos, seasoning graphs, raw structure inspections, and finish reports.
                </p>
              </div>

              <button
                onClick={() => launchWhatsApp("production")}
                className="w-full py-3.5 border border-[#8C6D4F] hover:bg-[#8C6D4F] hover:text-white text-[#8C6D4F] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-transparent"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.457 3.473 1.332 4.99L2 22l5.176-1.357a9.92 9.92 0 004.836 1.258h.005c5.506 0 9.987-4.482 9.987-9.988C22 6.482 17.518 2 12.012 2zm5.776 14.156c-.246.696-1.43 1.31-1.956 1.396-.477.078-1.096.148-3.176-.71-2.656-1.096-4.366-3.79-4.5-3.966-.13-.178-1.066-1.423-1.066-2.715 0-1.29.673-1.922.91-2.184.24-.262.527-.328.706-.328.178 0 .356.006.51.012.164.006.386-.062.604.46.224.536.76 1.86.826 1.996.066.136.108.296.018.476-.09.18-.178.29-.356.5-.178.21-.376.47-.536.63-.178.178-.366.372-.158.73.208.358.924 1.524 1.98 2.466 1.362 1.214 2.51 1.592 2.868 1.772.358.18.564.15.774-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.32.12 2.03.956 2.38 1.126.35.17.584.254.67.4.086.148.086.852-.16 1.548z" />
                </svg>
                Request Order Photos
              </button>
            </div>

            {/* Channel C: Logistics */}
            <div className="border border-[#EAE5D9] bg-gradient-to-br from-[#FDFCF7] to-[#FAF8F2] p-8 rounded-xs flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#8C6D4F]/40 hover:from-white hover:to-white group">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#8C6D4F]/10 text-[#8C6D4F] flex items-center justify-center rounded-xs group-hover:bg-[#8C6D4F] group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.321-5.128a1.13 1.13 0 00-1.09-1.053H14.5a1.13 1.13 0 00-1.092.839l-.35 1.112m-.073 5.352a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H9.75M12 10.5V1.875c0-.621-.504-1.125-1.125-1.125H8.25m0 0a1.5 1.5 0 013 0m-3 0a1.5 1.5 0 003 0m-9 7.375h9.75M3 10.5h18" />
                  </svg>
                </div>
                <h4 className="font-serif text-base text-[#1A1A1A] font-light">Logistics & Shipping Desk</h4>
                <p className="text-xs text-[#5A5751] font-light leading-relaxed">
                  Query ocean freight rates, coordinate port deliveries, request packing certificates, customs paperwork, and fumigation papers.
                </p>
              </div>

              <button
                onClick={() => launchWhatsApp("logistics")}
                className="w-full py-3.5 border border-[#8C6D4F] hover:bg-[#8C6D4F] hover:text-white text-[#8C6D4F] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-transparent"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.457 3.473 1.332 4.99L2 22l5.176-1.357a9.92 9.92 0 004.836 1.258h.005c5.506 0 9.987-4.482 9.987-9.988C22 6.482 17.518 2 12.012 2zm5.776 14.156c-.246.696-1.43 1.31-1.956 1.396-.477.078-1.096.148-3.176-.71-2.656-1.096-4.366-3.79-4.5-3.966-.13-.178-1.066-1.423-1.066-2.715 0-1.29.673-1.922.91-2.184.24-.262.527-.328.706-.328.178 0 .356.006.51.012.164.006.386-.062.604.46.224.536.76 1.86.826 1.996.066.136.108.296.018.476-.09.18-.178.29-.356.5-.178.21-.376.47-.536.63-.178.178-.366.372-.158.73.208.358.924 1.524 1.98 2.466 1.362 1.214 2.51 1.592 2.868 1.772.358.18.564.15.774-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.32.12 2.03.956 2.38 1.126.35.17.584.254.67.4.086.148.086.852-.16 1.548z" />
                </svg>
                Track Shipping Details
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. COORDINATES & REQUEST A QUOTE SECTION */}
      <section id="contact-coordinates" className="py-20 bg-[#FAF8F2] border-b border-[#F2EDE2]">
        <Container variant="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">OFFICE COORDINATES</span>
                <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A]">
                  Global HQ & Showroom
                </Heading>
                <div className="w-12 h-[1.5px] bg-[#8C6D4F]" />
              </div>


              {/* Contact Information Details */}
              <div className="space-y-6 font-sans text-xs text-[#5A5751] font-light leading-relaxed">
                <div className="border-l-2 border-[#8C6D4F]/30 pl-4 space-y-1">
                  <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold font-mono">GENERAL ENQUIRIES & CONTRACT BIDDING</span>
                  <a href="mailto:contact@sbartisan.com" className="text-sm font-serif text-[#1A1A1A] hover:text-[#8C6D4F] transition-colors duration-200">
                    contact@sbartisan.com
                  </a>
                </div>
                <div className="border-l-2 border-[#8C6D4F]/30 pl-4 space-y-1">
                  <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold font-mono">HEAD OFFICE LINE</span>
                  <p className="text-sm font-serif text-[#1A1A1A] font-light">+91 96021 14711, +91 70144 37945</p>
                </div>
                <div className="border-l-2 border-[#8C6D4F]/30 pl-4 space-y-1">
                  <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold font-mono">OFFICE ADDRESS</span>
                  <p className="text-sm text-[#1A1A1A] font-light leading-snug">
                    SB-Artisan, iStart Nest Incubation Center,<br />
                    Vikramaditya Nagar, Surya Colony,<br />
                    Jodhpur, Rajasthan 342011, India
                  </p>
                </div>
                <div className="border-l-2 border-[#8C6D4F]/30 pl-4 space-y-1">
                  <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold font-mono">FACTORY ADDRESS</span>
                  <p className="text-sm text-[#1A1A1A] font-light leading-snug">
                    Khasra No. 387/4, Near Rameshwar Dham,<br />
                    Pal Gaon, Jodhpur, Rajasthan 342014, India
                  </p>
                </div>
              </div>

              {/* Stylized Google Map */}
              <div className="space-y-3 pt-2">
                <span className="block text-[8px] uppercase tracking-widest text-[#8C8273] font-semibold font-mono">SHOWROOM COORDINATES</span>
                <div className="relative w-full h-[260px] border border-[#EAE5D9] rounded-xs overflow-hidden bg-[#FAF8F2] shadow-sm group">
                  <iframe
                    title="SB Artisan Jodhpur Location Map"
                    src="https://maps.google.com/maps?q=Pal%20Gaon,%20Jodhpur,%20Rajasthan%20342014,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(1) contrast(1.1) brightness(0.95)" }}
                    allowFullScreen={false}
                    loading="lazy"
                    className="group-hover:filter-none transition-all duration-700 ease-in-out"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs border border-[#8C6D4F]/30 px-3 py-1.5 text-[9px] font-mono text-[#FDFCF7] tracking-wider uppercase rounded-xs">
                    26.2358° N, 73.0033° E
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Component */}
            <div className="lg:col-span-7 bg-[#FDFCF7] border border-[#EAE5D9] p-8 sm:p-12 rounded-xs shadow-xl relative">
              <div className="space-y-2 mb-8">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#8C6D4F] font-mono font-semibold block">DIRECT LOGISTICS & MANUFACTURING CHANNELS</span>
                <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A]">
                  Request a Quote
                </Heading>
                <Paragraph variant="sm" className="text-[#5A5751] font-light leading-relaxed">
                  Provide your B2B project details below. Our engineering and estimation team in Jodhpur will prepare a detailed manufacturing bid and CAD review dossier.
                </Paragraph>
              </div>

              {quoteStatus === "success" ? (
                <div className="py-12 px-6 text-center space-y-5 bg-[#FAF8F2] border border-[#EAE5D9] rounded-xs">
                  <svg className="w-12 h-12 text-[#8C6D4F] mx-auto animate-bounce" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  </svg>
                  <h4 className="font-serif text-lg font-light text-[#1A1A1A]">Quote Request Received</h4>
                  <p className="text-xs text-[#5A5751] font-light leading-relaxed max-w-md mx-auto">
                    Thank you for contacting the SB Artisan Export desk. A container logistics and project estimation specialist has been assigned to your file. We will review your project specs and respond within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono font-semibold">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      disabled={quoteStatus === "loading"}
                      placeholder="Your Full Name"
                      className="w-full bg-[#FAF8F2] border border-[#EAE5D9] rounded-xs px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#8C6D4F] focus:ring-1 focus:ring-[#8C6D4F] font-light font-sans transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono font-semibold">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={quoteEmail}
                        onChange={(e) => setQuoteEmail(e.target.value)}
                        disabled={quoteStatus === "loading"}
                        placeholder="you@company.com"
                        className="w-full bg-[#FAF8F2] border border-[#EAE5D9] rounded-xs px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#8C6D4F] focus:ring-1 focus:ring-[#8C6D4F] font-light font-sans transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono font-semibold">
                        WhatsApp / Phone (with Country Code)
                      </label>
                      <input
                        type="tel"
                        value={quotePhone}
                        onChange={(e) => setQuotePhone(e.target.value)}
                        disabled={quoteStatus === "loading"}
                        placeholder="e.g., +1 (555) 019-2834"
                        className="w-full bg-[#FAF8F2] border border-[#EAE5D9] rounded-xs px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#8C6D4F] focus:ring-1 focus:ring-[#8C6D4F] font-light font-sans transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono font-semibold">
                      Company / Design Firm
                    </label>
                    <input
                      type="text"
                      value={quoteCompany}
                      onChange={(e) => setQuoteCompany(e.target.value)}
                      disabled={quoteStatus === "loading"}
                      placeholder="e.g., Marriott, Hyatt, Gensler, Independent Designer"
                      className="w-full bg-[#FAF8F2] border border-[#EAE5D9] rounded-xs px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#8C6D4F] focus:ring-1 focus:ring-[#8C6D4F] font-light font-sans transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-[#8C8273] font-mono font-semibold">
                      Project Brief & Quote Details *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={quoteMessage}
                      onChange={(e) => setQuoteMessage(e.target.value)}
                      disabled={quoteStatus === "loading"}
                      placeholder="Describe custom dimension parameters, wood choice preferences (Teak, Acacia, Mango), quantities, target shipping schedule, and drawing files to match..."
                      className="w-full bg-[#FAF8F2] border border-[#EAE5D9] rounded-xs p-4 text-sm text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#8C6D4F] focus:ring-1 focus:ring-[#8C6D4F] font-light font-sans resize-none transition-all duration-300"
                    />
                  </div>

                  <PrimaryButton
                    type="submit"
                    isLoading={quoteStatus === "loading"}
                    size="lg"
                    className="w-full cursor-pointer"
                  >
                    Submit Quote Request
                  </PrimaryButton>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>



      {/* 7. B2B TECHNICAL FAQS */}
      <section className="py-20 bg-[#FDFCF7]">
        <Container variant="default" className="max-w-4xl space-y-12">
          <div className="text-center space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C6D4F] block">EXPORT KNOWLEDGEBASE</span>
            <Heading variant="display" size="sm" weight="light" className="text-[#1A1A1A]">
              Frequently Asked B2B Questions
            </Heading>
            <Paragraph variant="md" className="text-[#5A5751] font-light max-w-xl mx-auto">
              Clear technical details on minimum volumes, customs coordination, timber seasoning, and bespoke OEM drawing approvals.
            </Paragraph>
          </div>

          <div className="space-y-4 pt-6">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="border border-[#EAE5D9] rounded-sm bg-[#FAF8F2] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-5 px-6 text-left flex justify-between items-center gap-4 hover:bg-white transition-colors duration-200 outline-none cursor-pointer"
                  >
                    <span className="font-serif text-sm md:text-base font-light text-[#1A1A1A] leading-snug">
                      {faq.q}
                    </span>
                    <span className="shrink-0 text-[#8C6D4F]">
                      <svg 
                        className={cn("w-4 h-4 transition-transform duration-300", isOpen ? "rotate-180" : "")} 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-[#5A5751] font-light leading-relaxed border-t border-[#EAE5D9]/50">
                      {faq.a}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}

