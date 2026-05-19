"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const HERO_BG = "https://picsum.photos/seed/contact-luxury/1920/800";

export default function ContactPage() {
  const { t, isRTL } = useLanguage();
  const c = t.contact;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 6000);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <Image src={HERO_BG} alt="Contact" fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.4) 60%, transparent 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="section-label mb-3">{c.hero.label}</p>
            <h1 className="text-white font-black text-4xl lg:text-6xl leading-tight mb-3">{c.hero.title}</h1>
            <p className="text-white/60 text-lg max-w-xl">{c.hero.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction={isRTL ? "right" : "left"}>
                <div className="bg-white border border-beige/60 rounded-sm p-8 shadow-sm">
                  <p className="section-label mb-3">{c.hero.label}</p>
                  <div className="gold-divider mb-6" />
                  <h2 className="text-2xl font-black text-dark mb-6">{c.hero.title}</h2>

                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 bg-green/10 border border-green/20 rounded-sm px-4 py-3 mb-6"
                    >
                      <CheckCircle2 size={18} className="text-green flex-shrink-0" />
                      <p className="text-green text-sm font-medium">{c.form.success}</p>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-sm px-4 py-3 mb-6"
                    >
                      <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                      <p className="text-red-600 text-sm font-medium">{c.form.error}</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-dark text-xs font-bold uppercase tracking-widest mb-1.5">
                          {c.form.name} *
                        </label>
                        <input
                          {...register("name", { required: true })}
                          className={`w-full border rounded-sm px-4 py-3 text-sm text-dark bg-cream focus:outline-none focus:border-gold transition-colors ${errors.name ? "border-red-300" : "border-beige"}`}
                          placeholder={c.form.name}
                        />
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="block text-dark text-xs font-bold uppercase tracking-widest mb-1.5">
                          {c.form.phone}
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          dir="ltr"
                          className="w-full border border-beige rounded-sm px-4 py-3 text-sm text-dark bg-cream focus:outline-none focus:border-gold transition-colors"
                          placeholder="+966 5X XXX XXXX"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-dark text-xs font-bold uppercase tracking-widest mb-1.5">
                        {c.form.email} *
                      </label>
                      <input
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        type="email"
                        className={`w-full border rounded-sm px-4 py-3 text-sm text-dark bg-cream focus:outline-none focus:border-gold transition-colors ${errors.email ? "border-red-300" : "border-beige"}`}
                        placeholder="email@example.com"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-dark text-xs font-bold uppercase tracking-widest mb-1.5">
                        {c.form.subject}
                      </label>
                      <select
                        {...register("subject")}
                        className="w-full border border-beige rounded-sm px-4 py-3 text-sm text-dark bg-cream focus:outline-none focus:border-gold transition-colors appearance-none"
                      >
                        {(c.form.subjects as string[]).map((s: string) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-dark text-xs font-bold uppercase tracking-widest mb-1.5">
                        {c.form.message} *
                      </label>
                      <textarea
                        {...register("message", { required: true })}
                        rows={5}
                        className={`w-full border rounded-sm px-4 py-3 text-sm text-dark bg-cream focus:outline-none focus:border-gold transition-colors resize-none ${errors.message ? "border-red-300" : "border-beige"}`}
                        placeholder={c.form.message}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? c.form.sending : c.form.submit}
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-5">
              <AnimatedSection direction={isRTL ? "left" : "right"}>
                {/* WhatsApp */}
                <a
                  href="https://wa.me/966504844181"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white border border-beige/60 rounded-sm px-5 py-4 hover:border-gold/40 hover:shadow-sm transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                    <MessageSquare size={20} fill="white" color="white" />
                  </div>
                  <div>
                    <p className="text-dark font-bold text-sm group-hover:text-green transition-colors">{c.whatsapp}</p>
                    <p className="text-charcoal/50 text-xs">+966 50 484 4181</p>
                  </div>
                </a>

                {/* Address */}
                <div className="bg-white border border-beige/60 rounded-sm px-5 py-4">
                  <div className="flex gap-3 mb-1">
                    <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-dark font-bold text-sm mb-1">Address</p>
                      <p className="text-charcoal/60 text-sm leading-relaxed whitespace-pre-line">{c.info.address}</p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white border border-beige/60 rounded-sm px-5 py-4">
                  <div className="flex gap-3">
                    <Phone size={16} className="text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-dark font-bold text-sm mb-1">Phone</p>
                      <a href="tel:+966554443333" className="text-charcoal/60 text-sm hover:text-gold transition-colors" dir="ltr">
                        {c.info.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Emails */}
                <div className="bg-white border border-beige/60 rounded-sm px-5 py-4">
                  <div className="flex gap-3">
                    <Mail size={16} className="text-gold flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-dark font-bold text-sm mb-1">Email</p>
                      {[c.info.email, c.info.leasing].map((email) => (
                        <a key={email} href={`mailto:${email}`} className="block text-charcoal/60 text-sm hover:text-gold transition-colors">
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-dark rounded-sm px-5 py-4">
                  <div className="flex gap-3">
                    <Clock size={16} className="text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gold font-bold text-sm mb-2">Office Hours</p>
                      <p className="text-white/60 text-sm whitespace-pre-line leading-relaxed">{c.info.hours}</p>
                      <p className="text-green-light text-xs font-bold mt-2">⬤ {c.info.maintenance}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
