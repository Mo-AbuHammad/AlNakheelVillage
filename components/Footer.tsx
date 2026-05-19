"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="bg-dark text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="relative w-[130px] h-[55px] mb-5">
            <Image
              src="/logo.png"
              alt="Al Nakheel Village"
              fill
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          <p className="text-beige text-sm leading-relaxed mb-6 max-w-[220px]">
            {f.tagline}
          </p>
          <div className="gold-divider" />
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-gold font-bold text-xs tracking-[0.2em] uppercase mb-6">
            {f.links.company}
          </h4>
          <ul className="space-y-3">
            {(
              [
                { label: f.links.residences, href: "/residences" },
                { label: f.links.facilities, href: "/facilities" },
                { label: f.links.location, href: "/location" },
                { label: f.links.gallery, href: "/gallery" },
                { label: f.links.contact, href: "/contact" },
              ] as const
            ).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/60 hover:text-gold text-sm transition-colors duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gold font-bold text-xs tracking-[0.2em] uppercase mb-6">
            {f.contact.title}
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={15} className="text-gold mt-0.5 flex-shrink-0" />
              <span className="text-white/60 text-sm leading-relaxed">
                {f.contact.address}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={15} className="text-gold flex-shrink-0" />
              <a
                href={`tel:${f.contact.phone.replace(/\s/g, "")}`}
                dir="ltr"
                className="text-white/60 hover:text-gold text-sm transition-colors"
              >
                {f.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={15} className="text-gold flex-shrink-0" />
              <a
                href={`mailto:${f.contact.email}`}
                className="text-white/60 hover:text-gold text-sm transition-colors"
              >
                {f.contact.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-gold font-bold text-xs tracking-[0.2em] uppercase mb-6">
            {f.hours.title}
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Clock size={15} className="text-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white/60 text-sm">{f.hours.weekdays}</p>
                <p className="text-white/40 text-sm">{f.hours.weekend}</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green animate-pulse flex-shrink-0 mt-0.5" />
              <span className="text-green-light text-sm font-medium">
                {f.hours.maintenance}
              </span>
            </li>
          </ul>

          {/* Emails */}
          <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
            {["leasing@alnakheelvillage.com", "community@alnakheelvillage.com"].map(
              (email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="block text-white/40 hover:text-gold text-xs transition-colors"
                >
                  {email}
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">{f.copyright}</p>
          <p className="text-white/30 text-xs">
            {f.developer}{" "}
            <span className="text-gold font-semibold">{f.developerName}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
