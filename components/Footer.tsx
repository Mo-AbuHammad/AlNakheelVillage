"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

export default function Footer() {
  const { t, isRTL } = useLanguage();

  return (
    <footer style={{ background: "#0A1209", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-7xl mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 border-b border-white/5">
        {/* Brand */}
        <div>
          <div className="relative w-[120px] h-[50px] mb-4">
            <Image src="/logo.png" alt="Al Nakheel Village" fill className="object-contain" style={{ filter: "brightness(0) invert(1)" }} />
          </div>
          <p className="text-sm leading-[1.9] mb-5" style={{ color: "rgba(255,255,255,0.32)", maxWidth: 220 }}>
            {isRTL
              ? "مجمع سكني راقٍ في قلب الخبر — مبني للعائلات التي لا تقبل إلا الأفضل."
              : "A prestigious gated compound in the heart of Al Khobar — built for families who expect nothing less than the finest."}
          </p>
          {/* Social */}
          <div className="flex gap-2">
            {[
              { label: "Instagram", d: "M2 2h20v20H2zM16 12a4 4 0 11-8 0 4 4 0 018 0z" },
              { label: "WhatsApp", href: "https://wa.me/966504844181", d: "M12 2C6.48 2 2 6.48 2 12c0 2.123.554 4.118 1.528 5.855L.057 23.8a.5.5 0 00.609.61l6.102-1.463A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 2 12 2z" },
              { label: "X / Twitter", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
            ].map((s) => (
              <a key={s.label} href={s.href || "#"} target={s.href ? "_blank" : undefined} rel="noopener noreferrer" aria-label={s.label}
                className="sb2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, stroke: "rgba(255,255,255,0.3)", fill: "none", strokeWidth: 1.5 }}>
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div className="text-[8px] font-bold tracking-[3px] uppercase text-gold mb-5">
            {isRTL ? "التنقل" : "Navigation"}
          </div>
          <ul className="space-y-3">
            {[
              { href: "/", en: "Home", ar: "الرئيسية" },
              { href: "/residences", en: "Residences", ar: "المساكن" },
              { href: "/facilities", en: "Facilities", ar: "المرافق" },
              { href: "/location", en: "Location", ar: "الموقع" },
              { href: "/gallery", en: "Gallery", ar: "معرض الصور" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link">{isRTL ? l.ar : l.en}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Residences */}
        <div>
          <div className="text-[8px] font-bold tracking-[3px] uppercase text-gold mb-5">
            {isRTL ? "المساكن" : "Residences"}
          </div>
          <ul className="space-y-3">
            {[
              { en: "Villa 3 Floors", ar: "فيلا ٣ طوابق" },
              { en: "Villa 2 Floors", ar: "فيلا طابقان" },
              { en: "Apartment", ar: "شقة سكنية" },
              { en: "Book a Viewing", ar: "احجز معاينة" },
            ].map((l) => (
              <li key={l.en}>
                <Link href="/residences" className="footer-link">{isRTL ? l.ar : l.en}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-[8px] font-bold tracking-[3px] uppercase text-gold mb-5">
            {isRTL ? "اتصل بنا" : "Contact"}
          </div>
          <ul className="space-y-3">
            <li><a href="mailto:info@alnakheelvillage.com" className="footer-link">info@alnakheelvillage.com</a></li>
            <li><a href="https://wa.me/966504844181" className="footer-link" dir="ltr">+966 50 484 4181</a></li>
            <li><Link href="/location" className="footer-link">{isRTL ? "الخبر، السعودية" : "Al Khobar, KSA"}</Link></li>
            <li><Link href="/contact" className="footer-link">{isRTL ? "احجز جولة" : "Book a Tour"}</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-10 py-8 flex items-center justify-between flex-wrap gap-4">
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.5px" }}>
          {isRTL ? "© ٢٠٢٦ قرية النخيل. جميع الحقوق محفوظة." : "© 2026 Alnakheel Village. All rights reserved."}
        </p>
        <p style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.25)" }}>
          Alnakheel Village
        </p>
      </div>
    </footer>
  );
}
