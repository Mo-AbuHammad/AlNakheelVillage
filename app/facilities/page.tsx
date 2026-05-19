"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dumbbell, Waves, Trophy, Baby, Briefcase, ShoppingBag,
  Scissors, Coffee, Car, MapPin, Sparkles, Star, Clock,
  CheckCircle2, Smartphone,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";

const HERO_BG = "https://picsum.photos/seed/luxury-pool-facility/1920/800";
const FACILITY_IMGS = [
  "https://picsum.photos/seed/indoor-pool-spa/800/500",
  "https://picsum.photos/seed/gym-fitness/800/500",
  "https://picsum.photos/seed/football-pitch/800/500",
  "https://picsum.photos/seed/padel-court/800/500",
  "https://picsum.photos/seed/party-hall/800/500",
  "https://picsum.photos/seed/cafe-lounge/800/500",
];

const iconMap: Record<string, React.ReactNode> = {
  dumbbell: <Dumbbell size={22} />,
  waves: <Waves size={22} />,
  "circle-dot": <Star size={22} />,
  goal: <Trophy size={22} />,
  trophy: <Trophy size={22} />,
  party: <Sparkles size={22} />,
  baby: <Baby size={22} />,
  briefcase: <Briefcase size={22} />,
  "shopping-bag": <ShoppingBag size={22} />,
  sparkles: <Sparkles size={22} />,
  scissors: <Scissors size={22} />,
  coffee: <Coffee size={22} />,
  shirt: <Sparkles size={22} />,
  "cup-soda": <Coffee size={22} />,
  car: <Car size={22} />,
  "map-pin": <MapPin size={22} />,
};

const categoryColors = [
  { bg: "bg-green", text: "text-white", border: "border-green-dark" },
  { bg: "bg-blue", text: "text-white", border: "border-blue-dark" },
  { bg: "bg-gold", text: "text-dark", border: "border-gold-dark" },
  { bg: "bg-dark", text: "text-white", border: "border-charcoal" },
];

export default function FacilitiesPage() {
  const { t, isRTL } = useLanguage();
  const f = t.facilities;
  const items = t.home.facilities.items;

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <Image src={HERO_BG} alt="Facilities" fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,106,50,0.9) 0%, rgba(26,26,26,0.4) 60%, transparent 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="section-label mb-3">{f.hero.label}</p>
            <h1 className="text-white font-black text-4xl lg:text-6xl leading-tight mb-3">{f.hero.title}</h1>
            <p className="text-white/60 text-lg max-w-xl">{f.hero.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* All facilities grid */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(items as Array<{ name: string; icon: string }>).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 + 0.1, duration: 0.5 }}
                className="facility-card bg-white border border-beige/60 rounded-sm p-5 flex flex-col items-center gap-3 text-center group hover:border-gold/40 transition-all duration-300"
              >
                <div className="facility-icon-wrap text-green">
                  {iconMap[item.icon] ?? <Star size={22} />}
                </div>
                <span className="text-dark text-xs font-semibold leading-tight">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase grid */}
      <section className="section-padding bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <AnimatedSection>
              <p className="section-label mb-3">{f.hero.label}</p>
              <div className="gold-divider mx-auto mb-5" />
              <h2 className="text-3xl lg:text-4xl font-black text-white">Premium Spaces</h2>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FACILITY_IMGS.map((src, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative overflow-hidden rounded-sm group" style={{ height: i === 0 ? "380px" : "260px" }}>
                  <Image src={src} alt={`Facility ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-108" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-gold text-xs font-bold tracking-widest uppercase">
                      {["Pool & Spa", "Fitness Center", "Football Pitch", "Padel Courts", "Party Halls", "Café & Lounge"][i]}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <AnimatedSection>
              <p className="section-label mb-3">By Category</p>
              <div className="gold-divider mx-auto mb-5" />
              <h2 className="text-3xl font-black text-dark">Every Aspect of Life, Covered</h2>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(f.categories as Array<{ name: string; items: string[] }>).map((cat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white border border-beige/60 rounded-sm overflow-hidden">
                  <div className={`px-6 py-4 ${categoryColors[i].bg} ${categoryColors[i].text}`}>
                    <h3 className="font-black text-lg tracking-wide">{cat.name}</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-2">
                      {cat.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                          <span className="text-charcoal/70 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="py-16 bg-green">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <AnimatedSection delay={0}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
                  <Clock size={22} className="text-gold" />
                </div>
                <p className="text-white font-bold">{f.hours.office}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Sparkles size={22} className="text-gold" />
                </div>
                <p className="text-white font-bold">{f.hours.maintenance}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
                  <Smartphone size={22} className="text-white" />
                </div>
                <p className="text-white font-bold">{f.app.title}</p>
                <p className="text-white/60 text-sm">{f.app.body}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark text-center px-6">
        <AnimatedSection>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">{t.home.cta.title}</h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">{t.home.cta.subtitle}</p>
          <Link href="/contact" className="btn-gold">{t.home.cta.btn1}</Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
