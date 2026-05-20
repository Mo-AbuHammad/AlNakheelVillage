"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { key: "home" as const, href: "/" },
  { key: "residences" as const, href: "/residences" },
  { key: "facilities" as const, href: "/facilities" },
  { key: "location" as const, href: "/location" },
  { key: "gallery" as const, href: "/gallery" },
  { key: "contact" as const, href: "/contact" },
];

export default function Navbar() {
  const { t, lang, toggleLang, isRTL } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY;
      setScrolled(s > 60);
      if (s > 200 && s > lastScrollRef.current) setHidden(true);
      else setHidden(false);
      lastScrollRef.current = s;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="relative w-[110px] h-[46px]">
              <Image
                src="/logo.png"
                alt="Al Nakheel Village"
                fill
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-9 list-none">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className={`nav-link ${
                    pathname === link.href ? "active text-gold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Language */}
            <div className="flex items-center bg-black/40 backdrop-blur-md border border-gold/20 rounded-full p-1">
              <button
                onClick={() => lang !== "en" && toggleLang()}
                className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full transition-all ${
                  lang === "en" ? "bg-gold text-dark" : "text-white/40"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => lang !== "ar" && toggleLang()}
                className={`text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full transition-all ${
                  lang === "ar" ? "bg-gold text-dark" : "text-white/40"
                }`}
              >
                عر
              </button>
            </div>

            {/* CTA */}
            <Link href="/contact" className="btn-gold text-[10px] py-2.5 px-5">
              {t.nav.bookVisit}
            </Link>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="text-[10px] font-bold tracking-widest uppercase text-white/60"
            >
              {lang === "en" ? "عر" : "EN"}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="text-white p-1"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "rgba(10,18,9,0.98)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div className="relative w-[100px] h-[42px]">
                <Image src="/logo.png" alt="Al Nakheel Village" fill className="object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-white p-1">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 border-b border-white/6 transition-colors"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(28px, 6vw, 36px)",
                      fontWeight: 300,
                      color: pathname === link.href ? "#F9AD51" : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {t.nav[link.key]}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="px-8 py-8 space-y-4">
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn-gold w-full justify-center">
                {t.nav.bookVisit}
              </Link>
              <a href={`tel:${t.nav.phone.replace(/\s/g, "")}`} className="flex items-center justify-center text-white/40 text-sm" dir="ltr">
                {t.nav.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
