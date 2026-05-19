"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";

const GALLERY_ITEMS = [
  { src: "https://picsum.photos/seed/gallery-pool/800/600", category: "Facilities", label: "Indoor Pool & Spa" },
  { src: "https://picsum.photos/seed/gallery-villa-ext/800/600", category: "Exterior", label: "Villa Exteriors" },
  { src: "https://picsum.photos/seed/gallery-living/800/600", category: "Interiors", label: "Living Spaces" },
  { src: "https://picsum.photos/seed/gallery-gym/800/600", category: "Facilities", label: "Fitness Center" },
  { src: "https://picsum.photos/seed/gallery-entrance/800/600", category: "Exterior", label: "Main Entrance" },
  { src: "https://picsum.photos/seed/gallery-bedroom/800/600", category: "Interiors", label: "Master Bedroom" },
  { src: "https://picsum.photos/seed/gallery-football/800/600", category: "Facilities", label: "Football Pitch" },
  { src: "https://picsum.photos/seed/gallery-garden/800/600", category: "Community", label: "Landscaped Gardens" },
  { src: "https://picsum.photos/seed/gallery-kitchen/800/600", category: "Interiors", label: "Modern Kitchen" },
  { src: "https://picsum.photos/seed/gallery-padel/800/600", category: "Facilities", label: "Padel Courts" },
  { src: "https://picsum.photos/seed/gallery-aerial/1200/600", category: "Exterior", label: "Aerial View" },
  { src: "https://picsum.photos/seed/gallery-cafe/800/600", category: "Community", label: "Community Café" },
];

export default function GalleryPage() {
  const { t } = useLanguage();
  const g = t.gallery;
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered =
    activeFilter === "All" || activeFilter === "الكل"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const nextImg = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % filtered.length);
  };
  const prevImg = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + filtered.length) % filtered.length);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0F6A32 0%, #178F44 40%, #1A1A1A 100%)" }}>
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, rgba(249,173,81,0.4) 0%, transparent 60%)" }}
          />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="section-label mb-3">{g.hero.label}</p>
            <h1 className="text-white font-black text-4xl lg:text-6xl leading-tight mb-3">{g.hero.title}</h1>
            <p className="text-white/60 text-lg max-w-xl">{g.hero.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="bg-cream sticky top-[68px] z-40 border-b border-beige/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-0">
            {(g.categories as string[]).map((cat: string) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex-shrink-0 px-5 py-4 text-sm font-bold tracking-wide border-b-2 transition-all duration-300 whitespace-nowrap ${
                  activeFilter === cat
                    ? "border-gold text-gold"
                    : "border-transparent text-charcoal/50 hover:text-dark"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="break-inside-avoid mb-4"
                >
                  <div
                    className="relative overflow-hidden rounded-sm group cursor-pointer"
                    style={{ height: i % 3 === 0 ? "280px" : "220px" }}
                    onClick={() => setLightboxIdx(i)}
                  >
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-all duration-400" />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center">
                        <ZoomIn size={18} className="text-dark" />
                      </div>
                      <span className="text-white text-xs font-bold tracking-widest uppercase">{item.label}</span>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 bg-dark/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-sm tracking-widest uppercase">
                      {item.category}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-dark/95 backdrop-blur-md flex items-center justify-center px-4"
            onClick={() => setLightboxIdx(null)}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-dark transition-colors z-10"
              onClick={() => setLightboxIdx(null)}
            >
              <X size={18} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-dark transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-[4/3] rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIdx].src}
                alt={filtered[lightboxIdx].label}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-dark/70 backdrop-blur px-5 py-3">
                <p className="text-gold text-xs font-bold uppercase tracking-widest">{filtered[lightboxIdx].category}</p>
                <p className="text-white font-bold">{filtered[lightboxIdx].label}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-dark transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
            >
              <ChevronRight size={20} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {lightboxIdx + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
