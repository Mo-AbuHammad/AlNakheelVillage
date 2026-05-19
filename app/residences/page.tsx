"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BedDouble, Bath, Square, Layers, CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";

const HERO_BG = "https://picsum.photos/seed/villa-exterior-luxury/1920/800";
const UNIT_IMGS = [
  "https://picsum.photos/seed/apartment-modern/800/600",
  "https://picsum.photos/seed/villa-family-home/800/600",
  "https://picsum.photos/seed/penthouse-luxury/800/600",
];

const tagColors: Record<string, string> = {
  "Starting Unit": "bg-blue text-white",
  "Most Popular": "bg-gold text-dark",
  Premium: "bg-dark text-white",
  "وحدة ابتدائية": "bg-blue text-white",
  "الأكثر طلبًا": "bg-gold text-dark",
  "بريميوم": "bg-dark text-white",
};

export default function ResidencesPage() {
  const { t, isRTL } = useLanguage();
  const r = t.residences;
  const [active, setActive] = useState(0);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <Image src={HERO_BG} alt="Residences" fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.4) 60%, transparent 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="section-label mb-3">{r.hero.label}</p>
            <h1 className="text-white font-black text-4xl lg:text-6xl leading-tight mb-3">{r.hero.title}</h1>
            <p className="text-white/60 text-lg max-w-xl">{r.hero.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Unit Selector Tabs */}
      <section className="bg-cream sticky top-[68px] z-40 border-b border-beige/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            {r.units.map((unit, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-bold tracking-wide border-b-2 transition-all duration-300 whitespace-nowrap ${
                  active === i
                    ? "border-gold text-gold"
                    : "border-transparent text-charcoal/50 hover:text-dark"
                }`}
              >
                {unit.type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Unit Detail */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          {r.units.map((unit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: active === i ? 1 : 0, display: active === i ? "grid" : "none" }}
              transition={{ duration: 0.5 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${isRTL ? "" : ""}`}
            >
              {/* Image */}
              <div className="relative h-[480px] rounded-sm overflow-hidden shadow-2xl group">
                <Image
                  src={UNIT_IMGS[i]}
                  alt={unit.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-sm tracking-widest uppercase ${tagColors[unit.tag] ?? "bg-gold text-dark"}`}>
                    {unit.tag}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1">{unit.type}</p>
                  <h2 className="text-white text-2xl font-black">{unit.name}</h2>
                </div>
                {/* Corner accents */}
                <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-gold/50" />
                <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-gold/50" />
              </div>

              {/* Details */}
              <div>
                <p className="section-label mb-3">{r.specs}</p>
                <div className="gold-divider mb-6" />
                <h2 className="text-3xl font-black text-dark mb-3">{unit.name}</h2>
                <p className="text-charcoal/60 leading-relaxed mb-8">{unit.desc}</p>

                {/* Specs grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: <Square size={18} />, val: unit.size, lbl: "Area" },
                    { icon: <Layers size={18} />, val: unit.floors, lbl: "Floors" },
                    { icon: <BedDouble size={18} />, val: unit.beds, lbl: "Bedrooms" },
                    { icon: <Bath size={18} />, val: unit.baths, lbl: "Bathrooms" },
                  ].map((s) => (
                    <div key={s.lbl} className="flex items-center gap-3 bg-white border border-beige/60 rounded-sm px-4 py-3">
                      <span className="text-gold">{s.icon}</span>
                      <div>
                        <p className="text-dark font-bold text-sm">{s.val}</p>
                        <p className="text-charcoal/40 text-[10px] uppercase tracking-wide">{s.lbl}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-dark font-bold text-sm uppercase tracking-widest mb-4">{r.features}</h4>
                  <ul className="space-y-3">
                    {unit.features.map((feat, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.08 + 0.3 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 size={16} className="text-green flex-shrink-0" />
                        <span className="text-charcoal/70 text-sm">{feat}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Pricing note */}
                <div className="bg-gold/10 border border-gold/20 rounded-sm px-5 py-4 mb-6">
                  <p className="text-gold font-bold text-xs tracking-widest uppercase mb-1">{r.inquire}</p>
                  <p className="text-charcoal/70 text-sm">Contact our leasing team for current availability and pricing.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact" className="btn-gold flex items-center justify-center gap-2">
                    {r.cta}
                    <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
                  </Link>
                  <a href="tel:+966554443333" className="btn-outline flex items-center justify-center gap-2">
                    <Phone size={14} />
                    {t.nav.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark text-center px-6">
        <AnimatedSection>
          <p className="section-label mb-4">{t.home.cta.hours}</p>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">{t.home.cta.title}</h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">{t.home.cta.subtitle}</p>
          <Link href="/contact" className="btn-gold">
            {t.home.cta.btn1}
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
