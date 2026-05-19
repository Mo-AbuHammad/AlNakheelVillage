"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ChevronDown, Dumbbell, Waves, Trophy, Baby, Briefcase,
  ShoppingBag, Scissors, Coffee, Car, MapPin, Sparkles,
  ArrowRight, Smartphone, CheckCircle2, Star,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";

/* ── Animated counter ─────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numeric = parseInt(target.replace(/[^0-9]/g, "")) || 0;

  useEffect(() => {
    if (!inView || numeric === 0) return;
    const duration = 1800;
    const steps = 60;
    const inc = numeric / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= numeric) { setCount(numeric); clearInterval(timer); }
      else setCount(Math.floor(cur));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, numeric]);

  const prefix = target.startsWith("<") ? "<" : target.startsWith("+") ? "+" : "";
  return (
    <span ref={ref}>
      {prefix}{numeric === 0 ? target : count}{suffix}
    </span>
  );
}

/* ── Facility icons map ───────────────────────────────── */
const iconMap: Record<string, React.ReactNode> = {
  dumbbell: <Dumbbell size={26} />,
  waves: <Waves size={26} />,
  "circle-dot": <Star size={26} />,
  goal: <Trophy size={26} />,
  trophy: <Trophy size={26} />,
  party: <Sparkles size={26} />,
  baby: <Baby size={26} />,
  briefcase: <Briefcase size={26} />,
  "shopping-bag": <ShoppingBag size={26} />,
  sparkles: <Sparkles size={26} />,
  scissors: <Scissors size={26} />,
  coffee: <Coffee size={26} />,
  shirt: <Sparkles size={26} />,
  "cup-soda": <Coffee size={26} />,
  car: <Car size={26} />,
  "map-pin": <MapPin size={26} />,
};

/* ── Placeholder image seeds ─────────────────────────── */
const HERO_BG = "https://picsum.photos/seed/luxury-compound-pool/1920/1080";
const ABOUT_IMG = "https://picsum.photos/seed/luxury-villa-entrance/800/600";
const UNIT_IMGS = [
  "https://picsum.photos/seed/apartment-interior/600/450",
  "https://picsum.photos/seed/family-villa/600/450",
  "https://picsum.photos/seed/penthouse-villa/600/450",
];
const GALLERY_IMGS = [
  "https://picsum.photos/seed/pool-luxury/800/600",
  "https://picsum.photos/seed/villa-interior/800/600",
  "https://picsum.photos/seed/sports-court/800/600",
  "https://picsum.photos/seed/garden-estate/800/600",
];

export default function HomePage() {
  const { t, isRTL } = useLanguage();
  const h = t.home;
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        {/* Parallax bg */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={HERO_BG}
            alt="Al Nakheel Village"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-dark/55" />
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(15,106,50,0.25) 0%, transparent 40%, rgba(26,26,26,0.6) 100%)"
            }}
          />
        </motion.div>

        {/* Decorative gold line top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent z-10" />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-label text-gold/90 mb-4"
          >
            {h.hero.label}
          </motion.p>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-white font-black leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
          >
            {isRTL ? (
              h.hero.title
            ) : (
              <>
                A Life of{" "}
                <span className="text-gradient-gold">Curated Elegance</span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            {h.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/residences" className="btn-gold">
              {h.hero.cta1}
            </Link>
            <Link href="/contact" className="btn-outline">
              {h.hero.cta2}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">{h.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="text-gold/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <section className="bg-green py-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #F9AD51 0%, transparent 60%), radial-gradient(circle at 80% 50%, #1DA5DE 0%, transparent 60%)" }}
        />
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {h.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-gold font-black text-4xl lg:text-5xl mb-2 counter-number">
                <Counter target={stat.number} />
              </div>
              <div className="text-white/80 text-xs font-medium tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <section className="section-padding bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isRTL ? "lg:flex-row-reverse" : ""}`}>

            {/* Image */}
            <AnimatedSection direction={isRTL ? "right" : "left"}>
              <div className="relative h-[500px] rounded-sm overflow-hidden shadow-2xl group">
                <Image src={ABOUT_IMG} alt="Al Nakheel Village" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                {/* Gold border accent */}
                <div className="absolute inset-0 border border-gold/20 rounded-sm pointer-events-none" />
                {/* Corner accent */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/60" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold/60" />
                {/* Badge */}
                <div className="absolute bottom-6 left-6 bg-dark/85 backdrop-blur px-5 py-3 rounded-sm">
                  <p className="text-gold text-xs font-bold tracking-widest uppercase">Al Khobar · KSA</p>
                  <p className="text-white text-sm font-semibold mt-0.5">210+ Residential Units</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Text */}
            <AnimatedSection direction={isRTL ? "left" : "right"} delay={0.15}>
              <p className="section-label mb-4">{h.about.label}</p>
              <div className="gold-divider mb-6" />
              <h2 className="text-3xl lg:text-4xl font-black text-dark leading-tight mb-6">
                {h.about.title}
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-6 text-base">
                {h.about.body}
              </p>
              <blockquote className="border-l-2 border-gold pl-5 mb-8 italic text-charcoal/60 leading-relaxed">
                &ldquo;{h.about.vision}&rdquo;
              </blockquote>
              <Link href="/contact" className="btn-gold inline-flex items-center gap-2">
                {h.about.cta}
                <ArrowRight size={15} className={isRTL ? "rotate-180" : ""} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          RESIDENCES TEASER
      ══════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <AnimatedSection>
              <p className="section-label mb-3">{h.residences.label}</p>
              <div className="gold-divider mx-auto mb-5" />
              <h2 className="text-3xl lg:text-4xl font-black text-dark">{h.residences.title}</h2>
              <p className="text-charcoal/60 mt-3 max-w-xl mx-auto">{h.residences.subtitle}</p>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {h.residences.units.map((unit, i) => (
              <AnimatedSection key={i} delay={i * 0.12} direction="up">
                <div className="luxury-card bg-cream rounded-sm overflow-hidden border border-beige/60 group h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={UNIT_IMGS[i]}
                      alt={unit.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                    {/* Tag */}
                    <div className="absolute top-3 left-3 bg-green text-white text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase rounded-sm">
                      {unit.tag}
                    </div>
                    {/* Type */}
                    <p className="absolute bottom-3 left-3 text-gold text-xs font-bold tracking-widest uppercase">
                      {unit.type}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-dark mb-2">{unit.name}</h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed mb-4 flex-1">
                      {unit.description}
                    </p>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-2 mb-5 pt-4 border-t border-beige">
                      {[
                        { val: unit.size, lbl: "Size" },
                        { val: unit.beds, lbl: "Bedrooms" },
                        { val: unit.baths, lbl: "Bathrooms" },
                      ].map((spec) => (
                        <div key={spec.lbl} className="text-center">
                          <p className="text-dark font-bold text-sm">{spec.val}</p>
                          <p className="text-charcoal/40 text-[10px] uppercase tracking-wide">{spec.lbl}</p>
                        </div>
                      ))}
                    </div>

                    <Link href="/contact" className="btn-gold text-center w-full">
                      {h.residences.inquire}
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/residences" className="btn-outline inline-flex items-center gap-2">
              {h.residences.cta}
              <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FACILITIES
      ══════════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F6A32 0%, #178F44 50%, #1EAD53 100%)" }}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #F9AD51 0px, #F9AD51 1px, transparent 0px, transparent 50%)", backgroundSize: "20px 20px" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <AnimatedSection>
              <p className="section-label text-gold mb-3">{h.facilities.label}</p>
              <div className="gold-divider mx-auto mb-5" />
              <h2 className="text-3xl lg:text-4xl font-black text-white">{h.facilities.title}</h2>
              <p className="text-white/60 mt-3 max-w-xl mx-auto">{h.facilities.subtitle}</p>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {h.facilities.items.slice(0, 12).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 + 0.1, duration: 0.5 }}
                className="facility-card bg-white/8 backdrop-blur-sm border border-white/15 rounded-sm p-4 flex flex-col items-center gap-3 text-center hover:bg-white/15 transition-all duration-300 cursor-default group"
              >
                <div className="facility-icon-wrap text-white group-hover:text-dark">
                  {iconMap[item.icon] ?? <Star size={26} />}
                </div>
                <span className="text-white/90 text-xs font-semibold leading-tight">{item.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/facilities" className="btn-gold inline-flex items-center gap-2">
              {h.facilities.cta}
              <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          APP SECTION
      ══════════════════════════════════════ */}
      <section className="section-padding bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>
            {/* Text */}
            <AnimatedSection direction={isRTL ? "right" : "left"}>
              <p className="section-label mb-4">{h.app.label}</p>
              <div className="gold-divider mb-6" />
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                {h.app.title}
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">{h.app.subtitle}</p>
              <ul className="space-y-4 mb-10">
                {h.app.features.map((feat, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 size={17} className="text-gold flex-shrink-0" />
                    <span className="text-white/70 text-sm">{feat}</span>
                  </motion.li>
                ))}
              </ul>
              <button className="btn-gold inline-flex items-center gap-2">
                <Smartphone size={16} />
                {h.app.cta}
              </button>
            </AnimatedSection>

            {/* Phone mockup */}
            <AnimatedSection direction={isRTL ? "left" : "right"} delay={0.2}>
              <div className="flex justify-center animate-float">
                <div className="relative w-[260px] h-[520px]">
                  {/* Phone frame */}
                  <div className="absolute inset-0 rounded-[40px] border-[6px] border-white/20 shadow-2xl overflow-hidden"
                    style={{ background: "linear-gradient(160deg, #178F44 0%, #0F6A32 100%)" }}>
                    {/* Screen content placeholder */}
                    <div className="absolute inset-0 p-5 flex flex-col">
                      {/* Status bar */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-white/60 text-[10px]">9:41</span>
                        <div className="w-20 h-5 bg-black rounded-full" />
                        <div className="flex gap-1">
                          <div className="w-3 h-3 bg-white/40 rounded-full" />
                        </div>
                      </div>
                      {/* App header */}
                      <div className="flex items-center gap-2 mb-5">
                        <div className="relative w-8 h-8">
                          <Image src="/logo.png" alt="app" fill className="object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                        </div>
                        <span className="text-white text-xs font-bold">Al Nakheel</span>
                      </div>
                      {/* Quick actions */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {["Book Facility", "Maintenance", "Community", "Payments"].map((a) => (
                          <div key={a} className="bg-white/10 rounded-xl p-3 text-center">
                            <div className="w-8 h-8 bg-gold/20 rounded-full mx-auto mb-1.5 flex items-center justify-center">
                              <div className="w-3 h-3 bg-gold rounded-full" />
                            </div>
                            <span className="text-white/80 text-[9px] font-medium">{a}</span>
                          </div>
                        ))}
                      </div>
                      {/* Notifications */}
                      <div className="flex-1 space-y-2">
                        {["Hall booked for Friday", "Maintenance completed", "Community update"].map((n, i) => (
                          <div key={i} className="bg-white/8 rounded-lg px-3 py-2 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                            <span className="text-white/60 text-[9px]">{n}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Gold ring */}
                  <div className="absolute -inset-3 rounded-[48px] border border-gold/15 pointer-events-none" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LOCATION TEASER
      ══════════════════════════════════════ */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction={isRTL ? "right" : "left"}>
              <p className="section-label mb-4">{h.location.label}</p>
              <div className="gold-divider mb-6" />
              <h2 className="text-3xl lg:text-4xl font-black text-dark leading-tight mb-4">
                {h.location.title}
              </h2>
              <p className="text-charcoal/60 mb-8">{h.location.subtitle}</p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {h.location.landmarks.map((lm, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.2 }}
                    className="flex items-center gap-3 bg-white border border-beige/60 rounded-sm px-4 py-3"
                  >
                    <MapPin size={14} className="text-gold flex-shrink-0" />
                    <div>
                      <p className="text-dark text-xs font-semibold">{lm.name}</p>
                      <p className="text-gold text-[10px] font-bold">{lm.distance}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/location" className="btn-gold inline-flex items-center gap-2">
                {h.location.cta}
                <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
              </Link>
            </AnimatedSection>

            {/* Map placeholder */}
            <AnimatedSection direction={isRTL ? "left" : "right"} delay={0.2}>
              <div className="relative h-[420px] rounded-sm overflow-hidden shadow-xl border border-beige/60">
                <div className="absolute inset-0 bg-beige-light flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center border border-gold/30">
                    <MapPin size={28} className="text-gold" />
                  </div>
                  <div className="text-center">
                    <p className="text-dark font-bold text-sm mb-1">Al Nakheel Village</p>
                    <p className="text-charcoal/60 text-xs px-8 text-center leading-relaxed">
                      {h.location.address}
                    </p>
                  </div>
                  <div className="bg-green text-white text-xs font-semibold px-4 py-2 rounded-sm">
                    Google Maps — Coming Soon
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERY TEASER
      ══════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <AnimatedSection>
              <p className="section-label mb-3">{h.gallery.label}</p>
              <div className="gold-divider mx-auto mb-5" />
              <h2 className="text-3xl lg:text-4xl font-black text-dark">{h.gallery.title}</h2>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {GALLERY_IMGS.map((src, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative overflow-hidden rounded-sm group cursor-pointer"
                  style={{ height: i === 0 ? "320px" : "220px" }}>
                  <Image
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-all duration-400" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center">
                      <ArrowRight size={16} className="text-dark" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/gallery" className="btn-outline inline-flex items-center gap-2">
              {h.gallery.cta}
              <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/luxury-estate-aerial/1920/600"
            alt="Al Nakheel Village"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(15,106,50,0.92) 0%, rgba(26,26,26,0.88) 100%)" }}
          />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <p className="section-label mb-4">{h.cta.hours}</p>
            <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-4">
              {h.cta.title}
            </h2>
            <p className="text-white/60 mb-10 text-lg">{h.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-gold">
                {h.cta.btn1}
              </Link>
              <Link href="/contact" className="btn-outline">
                {h.cta.btn2}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
