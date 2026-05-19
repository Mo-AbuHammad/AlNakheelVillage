"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navTextColor =
    isHome && !scrolled ? "text-white" : "text-dark";
  const logoFilter =
    isHome && !scrolled ? "brightness(0) invert(1)" : "none";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? "glass-nav py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div
              className="relative w-[120px] h-[50px] transition-all duration-500"
              style={{ filter: scrolled || !isHome ? "none" : logoFilter }}
            >
              <Image
                src="/logo.png"
                alt="Al Nakheel Village"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`nav-link ${navTextColor} ${
                  pathname === link.href ? "active text-gold" : ""
                }`}
              >
                {t.nav[link.key]}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className={`flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${navTextColor} hover:text-gold`}
            >
              <span className={lang === "en" ? "text-gold" : "opacity-50"}>EN</span>
              <span className="opacity-30">|</span>
              <span className={lang === "ar" ? "text-gold" : "opacity-50"}>ع</span>
            </button>

            {/* Phone */}
            <a
              href={`tel:${t.nav.phone.replace(/\s/g, "")}`}
              className={`flex items-center gap-2 text-xs font-semibold tracking-wide transition-colors ${navTextColor} hover:text-gold`}
            >
              <Phone size={13} />
              <span dir="ltr">{t.nav.phone}</span>
            </a>

            {/* CTA */}
            <Link href="/contact" className="btn-gold text-xs py-2.5 px-5">
              {t.nav.bookVisit}
            </Link>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleLang}
              className={`text-xs font-bold tracking-widest uppercase ${navTextColor}`}
            >
              {lang === "en" ? "ع" : "EN"}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className={`p-1 ${navTextColor}`}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-lg flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="relative w-[110px] h-[45px]">
                <Image
                  src="/logo.png"
                  alt="Al Nakheel Village"
                  fill
                  className="object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white p-1"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-2xl font-bold py-3 border-b border-white/8 transition-colors ${
                      pathname === link.href
                        ? "text-gold"
                        : "text-white hover:text-gold"
                    }`}
                  >
                    {t.nav[link.key]}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom */}
            <div className="px-8 py-8 space-y-4">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-gold w-full text-center block"
              >
                {t.nav.bookVisit}
              </Link>
              <a
                href={`tel:${t.nav.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 text-white/70 text-sm"
              >
                <Phone size={14} />
                <span dir="ltr">{t.nav.phone}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
