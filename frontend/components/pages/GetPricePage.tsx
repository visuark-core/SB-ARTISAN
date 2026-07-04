import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProductById, HospitalityProduct } from "../product/hospitality-data";
import { Container, Heading, SubHeading, Paragraph, SEO } from "../ui";

export default function GetPricePage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product") || searchParams.get("id") || "";

  const [product, setProduct] = useState<HospitalityProduct | undefined>(undefined);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [locationVal, setLocationVal] = useState("");
  const [moq, setMoq] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (productId) {
      setIsLoadingProduct(true);
      fetchProductById(productId)
        .then((found) => {
          setProduct(found);
          setIsLoadingProduct(false);
        })
        .catch((err) => {
          console.error("Error loading product for price request:", err);
          setIsLoadingProduct(false);
        });
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !locationVal || !moq) return;

    setStatus("loading");
    setErrorMessage("");
    try {
      const payload = {
        name,
        company_name: "Price Request Customer",
        email,
        phone,
        country: "India",
        message: notes || "No message provided",
        location: locationVal,
        moq,
        inquiry_type: product ? `Price Request: ${product.title}` : "Price Request"
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const json = await res.json();
      
      if (json.success) {
        setStatus("success");
      } else {
        throw new Error(json.message || "Failed to log inquiry");
      }
    } catch (err: any) {
      console.error("Inquiry submission error:", err);
      setStatus("error");
      setErrorMessage(err.message || "We encountered an error submitting your trade inquiry. Please try again.");
    }
  };

  const handleWhatsAppDirect = () => {
    const productText = product 
      ? `"${product.title}" (${product.category})`
      : "hospitality furniture solutions";
    const text = encodeURIComponent(
      `Hello SB Artisan, I just submitted a B2B price request for ${productText} and would like to coordinate delivery estimates.`
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  const handleCloseWindow = () => {
    window.close();
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] pt-32 pb-20 selection:bg-[#EAE5D9]">
      <SEO
        title={product ? `Request Price: ${product.title} - SB Artisan` : "Request Price - SB Artisan"}
        description="Submit a trade request to receive pricing details, specifications, and minimum order terms."
      />
      <Container variant="default">
        <div className="max-w-5xl mx-auto bg-[#FAF8F2] border border-[#EAE5D9] shadow-md overflow-hidden relative min-h-[500px] flex flex-col md:flex-row">
          
          {/* Left Column: Product Context */}
          <div className="w-full md:w-5/12 bg-[#FAF8F2] p-8 border-b md:border-b-0 md:border-r border-[#EAE5D9] flex flex-col justify-between">
            {isLoadingProduct ? (
              <div className="space-y-4 animate-pulse my-auto">
                <div className="aspect-[4/3] bg-[#EAE5D9] w-full" />
                <div className="h-4 bg-[#EAE5D9] w-2/3" />
                <div className="h-3 bg-[#EAE5D9] w-1/2" />
              </div>
            ) : product ? (
              <div className="space-y-6 my-auto">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#8C8273] font-medium block mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#1A1A1A] leading-tight">
                    {product.title}
                  </h3>
                  <p className="font-sans italic text-xs text-[#8C8273] font-light mt-1">
                    Designed by {product.designer}
                  </p>
                </div>

                <div className="aspect-[4/3] overflow-hidden bg-[#F5F2EA] border border-[#EAE5D9]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <span className="block text-[9px] uppercase tracking-widest text-[#8C8273] font-semibold">Materials & Details</span>
                  <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed">
                    {product.materials.join(", ")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 my-auto text-center md:text-left">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#8C8273] font-medium block mb-1">
                    SB Artisan
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#1A1A1A] leading-tight">
                    Premium Trade Pricing
                  </h3>
                </div>

                <div className="p-6 bg-[#F5F2EA] border border-[#EAE5D9]">
                  <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed">
                    Welcome to the SB Artisan B2B Trade Desk. Please fill out the form to request wholesale pricing, materials customization, and bulk shipping logs.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-[#EAE5D9]/60 hidden md:block">
              <p className="text-[10px] text-[#8C8273] font-light leading-relaxed">
                Inquiries are processed with certified material spec logs and freight logistics within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form Panel */}
          <div className="w-full md:w-7/12 p-8 flex flex-col justify-center">
            {status === "success" ? (
              <div className="text-center space-y-6 py-8">
                <div className="w-12 h-12 rounded-full bg-[#8C6D4F]/10 border border-[#8C6D4F]/30 flex items-center justify-center text-[#8C6D4F] mx-auto">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-serif text-xl font-light text-[#1A1A1A]">
                    Acquisition Inquiry Registered
                  </h4>
                  <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed max-w-md mx-auto">
                    Thank you. A custom specification document and commercial trade quote for <strong>{product ? `"${product.title}"` : "your design project"}</strong> has been logged at our Jodhpur Trade Desk.
                  </p>
                  <p className="font-sans text-[11px] text-[#8C8273] italic">
                    A coordinator will email you at {email} shortly.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#EAE5D9] bg-white hover:bg-[#F5F2EA] text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-sm cursor-pointer"
                  >
                    WhatsApp Chat
                  </button>
                  <button
                    onClick={handleCloseWindow}
                    className="flex-1 py-3 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-sm cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-lg font-light text-[#1A1A1A]">
                    Trade Quotation & Specification Request
                  </h4>
                  <p className="font-sans text-[11px] text-[#8C8273] font-light mt-1">
                    Access commercial pricing, material customizations, and bulk export solutions.
                  </p>
                </div>

                {status === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-sm">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs font-light">
                  {/* Basic Info: Name, Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="E.g., Rajiv Mehta"
                        disabled={status === "loading"}
                        className="bg-transparent border-b border-[#2C2B29] pb-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] w-full font-sans transition-colors disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E.g., r.mehta@group.com"
                        disabled={status === "loading"}
                        className="bg-transparent border-b border-[#2C2B29] pb-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] w-full font-sans transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Phone, Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                        Your Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="E.g., +91 98765 43210"
                        disabled={status === "loading"}
                        className="bg-transparent border-b border-[#2C2B29] pb-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] w-full font-sans transition-colors disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                        Your Location
                      </label>
                      <input
                        type="text"
                        required
                        value={locationVal}
                        onChange={(e) => setLocationVal(e.target.value)}
                        placeholder="E.g., Mumbai, Maharashtra"
                        disabled={status === "loading"}
                        className="bg-transparent border-b border-[#2C2B29] pb-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] w-full font-sans transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* MOQ */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                      MOQ (Minimum Order Quantity)
                    </label>
                    <input
                      type="text"
                      required
                      value={moq}
                      onChange={(e) => setMoq(e.target.value)}
                      placeholder="E.g., 24 chairs"
                      disabled={status === "loading"}
                      className="bg-transparent border-b border-[#2C2B29] pb-2 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] w-full font-sans transition-colors disabled:opacity-50"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] uppercase tracking-wider font-semibold text-[#8C8273]">
                      Your Message
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Specify wood selection, custom dimensions, finishes, or project terms..."
                      disabled={status === "loading"}
                      className="bg-transparent border-b border-[#2C2B29] pb-1 text-xs text-[#1A1A1A] placeholder:text-[#9E9B95] focus:outline-none focus:border-[#1A1A1A] w-full font-sans transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white text-[10px] uppercase tracking-[0.25em] font-sans font-medium transition-all duration-300 disabled:opacity-50 rounded-sm cursor-pointer border-none"
                    >
                      {status === "loading" ? "Registering Inquiry..." : "Submit Pricing Request"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>
      </Container>
    </div>
  );
}
