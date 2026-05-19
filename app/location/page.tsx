"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";

const HERO_BG = "https://picsum.photos/seed/khobar-aerial-city/1920/800";

export default function LocationPage() {
  const { t, isRTL } = useLanguage();
  const loc = t.location;
  const landmarks = t.home.location.landmarks;

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <Image src={HERO_BG} alt="Location" fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.35) 60%, transparent 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="section-label mb-3">{loc.hero.label}</p>
            <h1 className="text-white font-black text-4xl lg:text-6xl leading-tight mb-3">{loc.hero.title}</h1>
            <p className="text-white/60 text-lg max-w-xl">{loc.hero.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Map + Info */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* Map embed placeholder */}
            <div className="lg:col-span-3">
              <AnimatedSection direction={isRTL ? "right" : "left"}>
                <div className="relative h-[480px] rounded-sm overflow-hidden border border-beige/60 shadow-xl bg-beige-light">
                  {/* Google Maps will be embedded here */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                      className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center border-2 border-gold/30"
                    >
                      <MapPin size={36} className="text-gold" />
                    </motion.div>
                    <div className="text-center px-8">
                      <p className="text-dark font-black text-xl mb-2">Al Nakheel Village</p>
                      <p className="text-charcoal/60 text-sm leading-relaxed mb-4" dir={isRTL ? "rtl" : "ltr"}>
                        {loc.address}
                      </p>
                      <div className="inline-block bg-green/10 border border-green/20 text-green text-xs font-bold px-4 py-2 rounded-sm tracking-widest uppercase">
                        Google Maps — Coming Soon
                      </div>
                    </div>
                  </div>
                  {/* Corner decorations */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/40" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/40" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/40" />
                </div>

                {/* Directions button */}
                <a
                  href={`https://maps.google.com/?q=Al+Nakheel+Village+Al+Khobar+Saudi+Arabia`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-green mt-4 inline-flex items-center gap-2 w-full justify-center"
                >
                  <Navigation size={16} />
                  {loc.cta}
                </a>
              </AnimatedSection>
            </div>

            {/* Landmarks */}
            <div className="lg:col-span-2">
              <AnimatedSection direction={isRTL ? "left" : "right"}>
                <p className="section-label mb-3">{t.home.location.label}</p>
                <div className="gold-divider mb-6" />
                <h2 className="text-2xl font-black text-dark mb-6">
                  {t.home.location.title}
                </h2>

                <div className="space-y-3">
                  {(landmarks as Array<{ name: string; distance: string }>).map((lm, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 + 0.2 }}
                      className="flex items-center justify-between bg-white border border-beige/60 rounded-sm px-4 py-3 group hover:border-gold/40 hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <MapPin size={13} className="text-gold" />
                        </div>
                        <span className="text-dark text-sm font-semibold">{lm.name}</span>
                      </div>
                      <span className="text-gold text-xs font-black tracking-wide ml-3 flex-shrink-0">
                        {lm.distance}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Address card */}
                <div className="mt-6 bg-dark rounded-sm p-5">
                  <div className="flex gap-3 mb-4">
                    <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" />
                    <p className="text-white/70 text-sm leading-relaxed">{loc.address}</p>
                  </div>
                  <div className="flex gap-3 mb-3">
                    <Clock size={15} className="text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/60 text-xs">{t.facilities.hours.office}</p>
                      <p className="text-green-light text-xs font-bold mt-0.5">{t.facilities.hours.maintenance}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mb-3">
                    <Phone size={15} className="text-gold flex-shrink-0" />
                    <a href="tel:+966554443333" className="text-white/60 text-xs hover:text-gold transition-colors" dir="ltr">+966 55 444 3333</a>
                  </div>
                  <div className="flex gap-3">
                    <Mail size={15} className="text-gold flex-shrink-0" />
                    <a href="mailto:info@alnakheelvillage.com" className="text-white/60 text-xs hover:text-gold transition-colors">info@alnakheelvillage.com</a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Visual Strip */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="section-label mb-3">Neighborhood</p>
              <h2 className="text-2xl lg:text-3xl font-black text-white">Surrounded by the Best of Al Khobar</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Rakah Beach", sub: "< 1 Minute Walk", src: "https://picsum.photos/seed/beach-view/400/300" },
              { title: "Top Schools", sub: "500m Away", src: "https://picsum.photos/seed/school-campus/400/300" },
              { title: "Hospitals", sub: "500m – Opposite", src: "https://picsum.photos/seed/hospital-modern/400/300" },
              { title: "Shurfat Park Mall", sub: "Direct Gate Access", src: "https://picsum.photos/seed/shopping-mall/400/300" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative overflow-hidden rounded-sm group h-44">
                  <Image src={item.src} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-dark/20" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-gold text-xs font-bold uppercase tracking-widest">{item.title}</p>
                    <p className="text-white/70 text-[10px] mt-0.5">{item.sub}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green text-center px-6">
        <AnimatedSection>
          <h2 className="text-3xl font-black text-white mb-4">{t.home.cta.title}</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">{t.home.cta.subtitle}</p>
          <Link href="/contact" className="btn-gold">{t.home.cta.btn1}</Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
