import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { BlogArticle } from "./section-data";
import { Container } from "../ui";

import { Link } from "react-router-dom";

interface BlogPreviewProps {
  articles: BlogArticle[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function BlogPreview({
  articles,
  title = "Atelier Chronicles",
  subtitle = "Journal & Readings",
  className,
}: BlogPreviewProps) {
  
  return (
    <section className={cn("py-8 md:py-12 bg-[#FDFCF7] border-t border-[#F2EDE2]", className)}>
      <Container variant="wide" className="space-y-8 sm:space-y-12 md:space-y-16">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#1A1A1A] tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="font-sans text-xs text-[#6E6B64] font-light tracking-wide uppercase">
              {subtitle}
            </p>
          )}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {articles.slice(0, 4).map((article) => (
            <motion.article
              key={article.id}
              className="group space-y-2 sm:space-y-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Image Container */}
              <Link to={`/journal?article=${article.id}`} className="block overflow-hidden aspect-[3/2] w-full bg-[#F5F2EA] relative rounded-md">
                <div className="absolute inset-0 bg-black/[0.02] z-10 pointer-events-none" />
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-104"
                  loading="lazy"
                />
              </Link>

              {/* Text Meta Container */}
              <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between items-center text-[6px] min-[360px]:text-[7px] sm:text-[9px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-sans text-[#8C8273]">
                  <span>{article.category}</span>
                  <span className="hidden min-[360px]:inline">{article.readTime}</span>
                </div>
                
                <h3 className="font-serif text-[9px] min-[360px]:text-[10px] min-[400px]:text-xs sm:text-sm md:text-lg lg:text-xl font-light text-[#1A1A1A] leading-tight group-hover:text-[#8C8273] transition-colors duration-300 text-pretty">
                  <Link to={`/journal?article=${article.id}`}>{article.title}</Link>
                </h3>
                
                <div className="flex justify-between items-center text-[6px] min-[360px]:text-[8px] sm:text-[10px] font-sans text-[#9E9B95] font-light pt-1">
                  <span>{article.author}</span>
                  <span className="hidden min-[360px]:inline">{article.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </Container>
    </section>
  );
}
export type { BlogPreviewProps };
