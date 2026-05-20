"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// ─── Counter ──────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = target / 40;
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.ceil(cur));
    }, 25);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Reveal block ─────────────────────────────────────────────
function Reveal({
  children, className = "", direction = "up", delay = 0, style,
}: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
  direction?: "up" | "left" | "right" | "none"; delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const init = { opacity: 0, y: direction === "up" ? 40 : 0, x: direction === "left" ? -40 : direction === "right" ? 40 : 0 };
  return (
    <motion.div ref={ref} className={className} style={style} initial={init}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : init}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────
const CHIPS_EN = ["Pool","Men's Gym","Women's Gym","Spa","Padel","Football","Basketball","Party Halls","Café","Business Center","Mini Market","Barbershop & Salon","Dry Cleaning","Kindergarten"];
const CHIPS_AR = ["مسبح","صالة رجال","صالة نساء","سبا","بادل","كرة قدم","كرة سلة","قاعات أفراح","مقهى","مركز أعمال","ميني ماركت","حلاقة وصالون","تنظيف جاف","روضة أطفال"];

const LAND_EN = [
  { name: "Rakah Beach", dist: "<1 min" },
  { name: "Seven City Mall", dist: "1 km" },
  { name: "Al Mana Hospital", dist: "500m" },
  { name: "Dallah Hospital", dist: "Opposite" },
  { name: "Top Schools", dist: "500m" },
  { name: "Shurfat Park Mall", dist: "Direct Gate" },
  { name: "Jarir / Farm / Al Dawaa", dist: "Opposite" },
  { name: "Dhahran Expo & Aramco", dist: "Few minutes" },
];
const LAND_AR = [
  { name: "شاطئ راكة", dist: "أقل من دقيقة" },
  { name: "سفن سيتي مول", dist: "١ كم" },
  { name: "مستشفى المانع", dist: "٥٠٠ متر" },
  { name: "مستشفى دلة", dist: "مباشرةً أمامه" },
  { name: "أفضل المدارس", dist: "٥٠٠ متر" },
  { name: "مول شرفات بارك", dist: "بوابة خاصة" },
  { name: "جرير / الفارم / الدواء", dist: "مباشرةً أمامه" },
  { name: "ظهران إكسبو وأرامكو", dist: "دقائق معدودة" },
];

const MQ_EN = ["Luxury Living","Gated Community","Heart of Al Khobar","15+ Facilities","Walking Distance to Everything"];
const MQ_AR = ["عيش فاخر","مجمع مسوّر","قلب الخبر","أكثر من ١٥ مرفقاً","كل شيء على بُعد خطوات"];

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";

export default function HomePage() {
  const { isRTL } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const chips = isRTL ? CHIPS_AR : CHIPS_EN;
  const lands = isRTL ? LAND_AR : LAND_EN;
  const mq = [...(isRTL ? MQ_AR : MQ_EN), ...(isRTL ? MQ_AR : MQ_EN)];

  return (
    <div style={{ background: "#0A1209", color: "#fff" }}>

      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden flex items-center justify-center text-center" style={{ height: "100vh", minHeight: 680 }}>
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image src="https://picsum.photos/seed/alnakheel-aerial-khobar/1920/1080" alt="" fill className="object-cover" style={{ opacity: 0.55 }} priority />
        </motion.div>
        <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to bottom,rgba(10,18,9,.2) 0%,rgba(10,18,9,.5) 55%,rgba(10,18,9,1) 100%)" }} />
        <div className="absolute rounded-full pointer-events-none z-[1]" style={{ width:400,height:400,top:-100,left:-100,background:"radial-gradient(circle,rgba(249,173,81,.06),transparent 70%)",animation:"float-orb 16s ease-in-out infinite" }} />
        <div className="absolute rounded-full pointer-events-none z-[1]" style={{ width:300,height:300,bottom:-50,right:-50,background:"radial-gradient(circle,rgba(249,173,81,.06),transparent 70%)",animation:"float-orb2 20s ease-in-out infinite" }} />

        <motion.div className="relative z-[2] px-8" style={{ maxWidth:900, opacity: heroOpacity }}>
          {/* Label */}
          <motion.div className="flex items-center justify-center gap-4 mb-8" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.2, duration:.8 }}>
            <motion.div className="h-px bg-gold opacity-60" initial={{ width:0 }} animate={{ width:48 }} transition={{ delay:.5, duration:.8 }} />
            <span className="text-[10px] font-bold tracking-[4px] uppercase text-gold">
              {isRTL ? "الخبر، المملكة العربية السعودية" : "Al Khobar, Saudi Arabia"}
            </span>
            <motion.div className="h-px bg-gold opacity-60" initial={{ width:0 }} animate={{ width:48 }} transition={{ delay:.5, duration:.8 }} />
          </motion.div>

          {/* Headline */}
          <h1 className="sh-hero mb-5">
            <span className="line">
              <motion.span style={{ display:"inline-block" }} initial={{ y:"110%" }} animate={{ y:0 }} transition={{ delay:.4, duration:.9, ease:[.16,1,.3,1] }}>
                {isRTL ? "كل ما تحتاجه." : "Everything You Need."}
              </motion.span>
            </span>
            <span className="line">
              <motion.span style={{ display:"inline-block" }} initial={{ y:"110%" }} animate={{ y:0 }} transition={{ delay:.55, duration:.9, ease:[.16,1,.3,1] }}>
                <em>{isRTL ? "عنوان واحد." : "One Address."}</em>
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p style={{ fontFamily:SERIF, fontSize:"clamp(18px,2vw,26px)", fontWeight:300, fontStyle:"italic", color:"rgba(255,255,255,.7)", marginBottom:28 }} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.9, duration:1 }}>
            {isRTL ? "عالمك بأكمله — على بُعد خطوات." : "Your whole world — walking distance."}
          </motion.p>

          {/* Desc */}
          <motion.p className="text-sm text-white/50 mx-auto mb-10 leading-[1.9]" style={{ maxWidth:520 }} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1, duration:1 }}>
            {isRTL ? "مجمع سكني راقٍ في قلب الخبر — تجتمع فيه الفخامة والمجتمع وكل وسائل الراحة في مكان واحد مصمم بإتقان." : "A prestigious gated compound in the heart of Al Khobar — where luxury, community, and every convenience exist in one perfectly designed place."}
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex items-center justify-center gap-5 flex-wrap" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3, duration:.8 }}>
            <Link href="/residences" className="btn-gold">
              {isRTL ? "استكشف المساكن" : "Explore Residences"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/contact" className="btn-outline">{isRTL ? "احجز جولة" : "Book a Tour"}</Link>
          </motion.div>
        </motion.div>

        {/* Scroll line */}
        <div className="absolute hidden md:flex flex-col items-center gap-[10px] z-[2]" style={{ right:36, bottom:88 }}>
          <span className="text-[8px] tracking-[3px] uppercase text-white/30" style={{ writingMode:"vertical-rl" }}>{isRTL ? "مرر" : "Scroll"}</span>
          <div className="w-px h-14" style={{ background:"linear-gradient(to bottom,rgba(249,173,81,.6),transparent)", animation:"scroll-line 2s ease-in-out infinite" }} />
        </div>

        {/* Stats bar */}
        <motion.div className="absolute bottom-0 left-0 right-0 z-[2] flex justify-center border-t border-white/5" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5, duration:.8 }}>
          {[
            { n:"3", label:isRTL?"أنواع المساكن":"Residence Types" },
            { n:"15", suf:"+", label:isRTL?"مرافق":"Facilities" },
            { raw:"<1", label:isRTL?"دقيقة لشاطئ راكة":"Min to Rakah Beach" },
            { raw:"2026", label:isRTL?"الافتتاح الكبير":"Grand Opening" },
          ].map((s,i) => (
            <div key={i} className="flex-1 py-5 text-center border-r border-white/5 last:border-r-0 hover:bg-gold/5 transition-colors" style={{ maxWidth:220, background:"rgba(10,18,9,.65)", backdropFilter:"blur(10px)" }}>
              <div style={{ fontFamily:SERIF, fontSize:30, color:"#F9AD51", fontWeight:600, lineHeight:1 }}>
                {"raw" in s ? s.raw : <Counter target={parseInt(s.n)} suffix={s.suf} />}
              </div>
              <div className="text-[8px] tracking-[2.5px] uppercase text-white/35 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══ MARQUEE ═════════════════════════════════════════════ */}
      <div style={{ background:"#111c14", borderTop:"1px solid rgba(255,255,255,.05)", borderBottom:"1px solid rgba(255,255,255,.05)", overflow:"hidden", padding:"24px 0" }}>
        <div className="marquee-track">
          {mq.map((txt, i) => (
            <span key={i} className="marquee-item">{txt}<span className="marquee-dot"/></span>
          ))}
        </div>
      </div>

      {/* ═══ ABOUT ═══════════════════════════════════════════════ */}
      <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"90vh" }} className="overflow-hidden max-lg:!grid-cols-1">
        {/* Image side */}
        <Reveal className="relative overflow-hidden" style={{ minHeight:400 } as React.CSSProperties} direction={isRTL?"right":"left"}>
          <motion.div className="absolute inset-0" initial={{ scale:1.15 }} whileInView={{ scale:1 }} viewport={{ once:true }} transition={{ duration:1.5, ease:[.16,1,.3,1] }}
            style={{ background:"linear-gradient(to right,rgba(10,18,9,0) 55%,rgba(10,18,9,1) 100%),url('https://picsum.photos/seed/luxury-villa-compound/900/1000') center/cover" }} />
          <motion.div className="absolute text-center" style={{ bottom:44, right:-1 }} initial={{ x:"100%" }} whileInView={{ x:0 }} viewport={{ once:true }} transition={{ delay:.5, duration:.8, ease:[.16,1,.3,1] }}>
            <div style={{ background:"#F9AD51", padding:"22px 26px" }}>
              <div style={{ fontFamily:SERIF, fontSize:42, fontWeight:700, color:"#0A1209", lineHeight:1 }}>2026</div>
              <div className="text-[8px] font-bold tracking-[2px] uppercase mt-1" style={{ color:"rgba(10,18,9,.55)" }}>
                {isRTL ? "الافتتاح" : "Grand Opening"}
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Content side */}
        <div className="flex flex-col justify-center px-14 py-20 max-lg:px-8 max-lg:py-14">
          <Reveal direction={isRTL?"left":"right"}>
            <div className="kk lft mb-5"><div className="kl"/><span>{isRTL?"من نحن":"Who We Are"}</span></div>
            <h2 className="sh mb-6">
              {isRTL ? <>أكثر من مجرد منزل.<br/><em>مجتمع متكامل.</em></> : <>More Than a Home.<br/><em>A Community.</em></>}
            </h2>
            <p className="text-sm leading-[1.9] text-white/50 mb-8" style={{ maxWidth:480 }}>
              {isRTL ? "قرية النخيل عالم متكامل بذاته، صُمِّمت كل تفصيلة فيه حول راحتك وأمانك وسعادتك." : "Alnakheel Village is a self-contained world where every detail has been designed around your comfort, security, and well-being — from resort wellness to world-class sports, family dining, and daily conveniences."}
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", border:"1px solid rgba(255,255,255,.05)" }}>
              {[
                { icon:<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, en:["Gated & Secure","24/7 security and controlled access."], ar:["مسوّر وآمن","أمن على مدار الساعة."] },
                { icon:<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>, en:["Family-Centered","Nursery, kids areas & family halls."], ar:["بيئة عائلية","حضانة وروضة وأماكن للأطفال."] },
                { icon:<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>, en:["Resort Wellness","Pool, spa & gym — resort living."], ar:["عافية فندقية","مسبح وسبا وصالة رياضية."] },
                { icon:<><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></>, en:["Daily Conveniences","Market, café & dry cleaning."], ar:["خدمات يومية","سوبرماركت ومقهى وصالون."] },
              ].map((v,i) => (
                <div key={i} className="aval">
                  <div className="aico"><svg viewBox="0 0 24 24" style={{ width:15,height:15,stroke:"#F9AD51",fill:"none",strokeWidth:1.5 }}>{v.icon}</svg></div>
                  <div className="text-xs font-bold text-white mb-1 tracking-wide">{isRTL?v.ar[0]:v.en[0]}</div>
                  <div className="text-[11px] leading-[1.7]" style={{ color:"rgba(255,255,255,.38)" }}>{isRTL?v.ar[1]:v.en[1]}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ RESIDENCES ══════════════════════════════════════════ */}
      <section style={{ background:"#FAF7F2", padding:"120px 80px", textAlign:"center", position:"relative", overflow:"hidden" }} className="max-lg:px-8 max-lg:py-20">
        <div style={{ position:"absolute",top:80,left:"50%",transform:"translateX(-50%)",width:1,height:60,background:"linear-gradient(to bottom,#F9AD51,transparent)" }}/>
        <Reveal>
          <div className="kk mb-4"><div className="kl"/><span>{isRTL?"مساكننا":"Our Residences"}</span><div className="kl"/></div>
          <h2 className="sh light mb-3">
            {isRTL?<>اختر <em>مسكنك المثالي</em></>:<>Choose Your <em>Space</em></>}
          </h2>
        </Reveal>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px",marginTop:72,border:"1px solid rgba(0,0,0,.08)" }} className="max-lg:!grid-cols-1">
          {[
            { grad:"linear-gradient(160deg,#1a3d25,#0A1209)", tag:isRTL?"مميز":"PREMIUM", name:isRTL?"فيلا — ٣ طوابق":"Villa — 3 Floors", beds:isRTL?"٥-٦ غرف":"5–6 Bedrooms", baths:isRTL?"٥ حمامات":"5 Bathrooms", size:isRTL?"م² قريباً":"TBC m²" },
            { grad:"linear-gradient(160deg,#2d3a1a,#0A1209)", tag:isRTL?"الأكثر طلباً":"POPULAR", name:isRTL?"فيلا — طابقان":"Villa — 2 Floors", beds:isRTL?"٣ غرف":"3 Bedrooms", baths:isRTL?"٣ حمامات":"3 Bathrooms", size:"220 m²" },
            { grad:"linear-gradient(160deg,#1c2f3d,#0A1209)", tag:isRTL?"متاح":"AVAILABLE", name:isRTL?"شقة سكنية":"Apartment", beds:isRTL?"١-٢ غرفة":"1–2 Bedrooms", baths:isRTL?"٢ حمامات":"2 Bathrooms", size:"120 m²" },
          ].map((r,i) => (
            <motion.div key={i} className="rc" initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*.1+.2, duration:.6 }}>
              <div style={{ height:320,background:r.grad,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
                <div style={{ width:60,height:60,border:"1px solid rgba(255,255,255,.1)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <svg viewBox="0 0 24 24" style={{ width:26,height:26,stroke:"rgba(255,255,255,.2)",fill:"none",strokeWidth:1 }}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <div style={{ position:"absolute",top:12,left:12,background:"rgba(249,173,81,.9)",color:"#0A1209",fontSize:8,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",padding:"4px 8px",borderRadius:2 }}>{r.tag}</div>
                <div style={{ position:"absolute",top:12,right:12,background:"rgba(29,165,222,.9)",color:"#fff",fontSize:8,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",padding:"5px 10px",borderRadius:2 }}>360° Tour</div>
              </div>
              <div style={{ padding:"30px 26px",borderTop:"2px solid #D6CBBF",textAlign:isRTL?"right":"left" }}>
                <span style={{ fontSize:8,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#178F44",border:"1px solid rgba(23,143,68,.3)",padding:"3px 8px",borderRadius:1,display:"inline-block",marginBottom:12 }}>{r.tag}</span>
                <div style={{ fontFamily:SERIF,fontSize:26,fontWeight:600,color:"#1a2b1f",marginBottom:16,lineHeight:1 }}>{r.name}</div>
                <div className="flex gap-4 flex-wrap mb-4">
                  {[r.beds,r.baths,r.size].map((s,j) => <span key={j} className="text-[10px] font-semibold text-muted">{s}</span>)}
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <Link href="/contact" className="btn-green text-[10px]">{isRTL?"استفسر عن السعر":"Inquire for Pricing"}</Link>
                  <Link href="/residences" className="flex items-center gap-2 text-[10px] font-bold tracking-[2px] uppercase text-green hover:gap-3 transition-all">
                    {isRTL?"التفاصيل":"View Details"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ QUOTE ═══════════════════════════════════════════════ */}
      <div style={{ background:"#0d5a2b",padding:"100px 80px",textAlign:"center",position:"relative",overflow:"hidden" }} className="max-lg:px-8">
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,background:"radial-gradient(circle,rgba(249,173,81,.05),transparent 70%)",pointerEvents:"none",animation:"float-orb 6s ease-in-out infinite" }}/>
        <div style={{ fontFamily:SERIF,fontSize:200,lineHeight:.5,color:"rgba(255,255,255,.04)",position:"absolute",top:40,left:80,userSelect:"none" }}>&ldquo;</div>
        <Reveal>
          <p style={{ fontFamily:SERIF,fontSize:"clamp(22px,3.5vw,42px)",fontWeight:300,fontStyle:"italic",color:"#fff",lineHeight:1.55,maxWidth:800,margin:"0 auto 24px",position:"relative",zIndex:1 }}>
            {isRTL ? "«الفخامة ليست دائماً صاخبة. أحياناً هي إضاءة دافئة، وأمسيات هادئة، ومكان يشعرك بالانتماء.»" : '"Luxury is not always loud. Sometimes it\'s warm lighting, peaceful evenings, and a space that simply feels right."'}
          </p>
          <div className="text-[9px] font-bold tracking-[4px] uppercase text-gold" style={{ position:"relative",zIndex:1 }}>
            Alnakheel Village — قرية النخيل
          </div>
        </Reveal>
      </div>

      {/* ═══ FACILITIES ══════════════════════════════════════════ */}
      <section style={{ background:"#111c14",padding:"100px 0 80px",textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:1,height:60,background:"linear-gradient(to bottom,#F9AD51,transparent)" }}/>
        <div className="px-20 max-lg:px-8 mb-14">
          <Reveal>
            <div className="kk mb-4"><div className="kl"/><span>{isRTL?"مرافق المجمع":"Compound Facilities"}</span><div className="kl"/></div>
            <h2 className="sh mb-4">{isRTL?<>كل شيء <em>في متناولك</em></>:<>Everything <em>Within</em> Reach</>}</h2>
            <p className="text-sm text-white/50 mx-auto leading-[1.9]" style={{ maxWidth:480 }}>
              {isRTL?"أكثر من ١٥ مرفقاً عالمياً مصمماً حول أسلوب حياتك.":"15+ world-class facilities designed around your lifestyle."}
            </p>
          </Reveal>
        </div>

        {/* Scrolling facility names */}
        <div style={{ overflow:"hidden",borderTop:"1px solid rgba(255,255,255,.06)",borderBottom:"1px solid rgba(255,255,255,.06)",padding:"20px 0",marginBottom:60,background:"rgba(0,0,0,.2)" }}>
          <div className="fac-marquee-track">
            {[...chips,...chips].map((name,i) => (
              <span key={i} className="fac-mq-item">
                <span className="fac-mq-sep"/>
                <span className="lbl">{name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Video placeholder */}
        <Reveal className="mx-auto px-10 mb-14" style={{ maxWidth:1000 } as React.CSSProperties}>
          <div className="play-btn-wrap" style={{ position:"relative",aspectRatio:"16/9",borderRadius:4,overflow:"hidden",background:"#1a2b1f",border:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 30px 80px rgba(0,0,0,.5)" }}>
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,#0d3320,#0A1209)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:24 }}>
              <div className="play-btn"><svg viewBox="0 0 24 24" style={{ width:26,height:26,fill:"#0A1209",marginLeft:4 }}><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
              <div style={{ textAlign:"center" }}>
                <strong className="block text-[13px] font-bold tracking-[2.5px] uppercase text-gold mb-2">
                  {isRTL?"شاهد جولة المرافق":"Watch The Facilities Tour"}
                </strong>
                <span className="text-[11px] font-semibold tracking-[3px] uppercase text-white/40">
                  {isRTL?"اكتشف كل مرفق من الداخل — قريباً":"Step inside every facility — coming soon"}
                </span>
              </div>
            </div>
            <div style={{ position:"absolute",top:14,right:14,background:"rgba(249,173,81,.85)",color:"#0A1209",fontSize:8,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",padding:"5px 10px",borderRadius:2 }}>
              {isRTL?"فيديو قريباً":"VIDEO — Coming Soon"}
            </div>
          </div>
          <p style={{ marginTop:24,fontFamily:SERIF,fontStyle:"italic",fontSize:16,color:"rgba(255,255,255,.5)",textAlign:"center" }}>
            <span style={{ color:"#F9AD51",fontSize:18 }}>15+</span>
            {isRTL?" مرفقاً — في فيلم قصير واحد.":" facilities — all in one short film."}
          </p>
        </Reveal>

        {/* Chips */}
        <Reveal>
          <div className="flex flex-wrap justify-center gap-2 mx-auto px-10" style={{ maxWidth:1000 }}>
            {chips.map((name,i) => (
              <motion.div key={i} className="fac-chip" initial={{ opacity:0,y:10 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*.04 }}>
                <span className="ctxt">{name}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══ LOCATION ════════════════════════════════════════════ */}
      <section style={{ display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:"80vh" }} className="overflow-hidden max-lg:!grid-cols-1">
        {/* Map */}
        <div style={{ position:"relative",background:"linear-gradient(135deg,#1a2b1f,#0A1209)",display:"flex",alignItems:"center",justifyContent:"center",minHeight:500 }}>
          <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 50%,rgba(249,173,81,.08),transparent 50%)",animation:"float-orb 8s ease-in-out infinite" }}/>
          <div style={{ textAlign:"center",color:"rgba(255,255,255,.28)",position:"relative",zIndex:1 }}>
            <svg viewBox="0 0 24 24" style={{ width:52,height:52,stroke:"rgba(255,255,255,.15)",fill:"none",strokeWidth:1,margin:"0 auto 16px",animation:"bounce 3s ease-in-out infinite" }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <p className="text-[11px] tracking-wide leading-[1.8]">
              {isRTL?"خريطة جوجل\nالخبر، المنطقة الشرقية":"Google Maps Embed\nAl Khobar, Eastern Province"}
            </p>
          </div>
          <div style={{ position:"absolute",top:14,right:14,background:"rgba(249,173,81,.9)",color:"#0A1209",fontSize:8,fontWeight:700,letterSpacing:2,textTransform:"uppercase",padding:"5px 10px",borderRadius:2,zIndex:2 }}>
            {isRTL?"خريطة مؤقتة":"MAP PLACEHOLDER"}
          </div>
        </div>

        {/* Landmarks */}
        <div style={{ padding:"80px 70px",display:"flex",flexDirection:"column",justifyContent:"center",background:"#FAF7F2" }} className="max-lg:px-8 max-lg:py-14">
          <Reveal direction={isRTL?"left":"right"}>
            <div className="kk lft mb-5"><div className="kl"/><span>{isRTL?"موقع استراتيجي":"Prime Location"}</span></div>
            <h2 className="sh light mb-5">{isRTL?<>قلب<br/><em>الخبر</em></>:<>Heart of<br/><em>Al Khobar</em></>}</h2>
            <p className="text-sm leading-[1.9] mb-8" style={{ color:"#6b7c6e",maxWidth:420 }}>
              {isRTL?"خطوات من الشاطئ والمستشفيات وأفضل المدارس والمراكز التجارية.":"Steps from beaches, hospitals, schools, and premier retail — at the center of everything."}
            </p>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              {lands.map((lm,i) => (
                <motion.div key={i} className="loc-item" initial={{ opacity:0,x:isRTL?20:-20 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ delay:i*.07+.2 }}>
                  <div style={{ width:30,height:30,background:"rgba(23,143,68,.08)",borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <svg viewBox="0 0 24 24" style={{ width:13,height:13,stroke:"#178F44",fill:"none",strokeWidth:1.5 }}><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold mb-0.5" style={{ color:"#1a2b1f" }}>{lm.name}</div>
                    <div className="text-[10px] font-semibold text-green">{lm.dist}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ VIDEO ═══════════════════════════════════════════════ */}
      <section style={{ background:"#0A1209",padding:"120px 80px",textAlign:"center" }} className="max-lg:px-8 max-lg:py-20">
        <Reveal>
          <div className="kk mb-4"><div className="kl"/><span>{isRTL?"فيلم المجمع":"The Compound Film"}</span><div className="kl"/></div>
          <h2 className="sh mb-4">{isRTL?<>شاهده <em>من الأعلى</em></>:<>See It <em>From Above</em></>}</h2>
          <p className="text-sm text-white/50 mx-auto mb-14 leading-[1.9]" style={{ maxWidth:480 }}>
            {isRTL?"جولة جوية سينمائية لقرية النخيل ومحيطها.":"An aerial cinematic tour of Alnakheel Village and its surroundings."}
          </p>
        </Reveal>
        <Reveal>
          <div className="play-btn-wrap" style={{ position:"relative",maxWidth:960,margin:"0 auto",aspectRatio:"16/9",borderRadius:3,overflow:"hidden",background:"#1a2b1f",border:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,#0d3320,#0A1209)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:24 }}>
              <div className="play-btn"><svg viewBox="0 0 24 24" style={{ width:28,height:28,fill:"#0A1209",marginLeft:4 }}><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
              <div className="text-[11px] font-semibold tracking-[3px] uppercase text-white/30">
                {isRTL?"الفيلم الجوي للمجمع — قريباً":"Aerial Compound Film — Coming Soon"}
              </div>
            </div>
            <div style={{ position:"absolute",top:14,right:14,background:"rgba(249,173,81,.85)",color:"#0A1209",fontSize:8,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",padding:"5px 10px",borderRadius:2 }}>
              {isRTL?"فيديو مؤقت":"VIDEO — Coming Soon"}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ CTA ═════════════════════════════════════════════════ */}
      <section style={{ background:"#F4EFE8",padding:"120px 80px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center" }} className="max-lg:!grid-cols-1 max-lg:px-8 max-lg:py-20 max-lg:!gap-12">
        <Reveal direction={isRTL?"right":"left"}>
          <div className="kk lft mb-5">
            <div className="kl"/>
            <span style={{ color:"rgba(10,18,9,.5)" }}>{isRTL?"فصلك الجديد ينتظرك":"Your New Chapter Awaits"}</span>
          </div>
          <h2 className="sh light mb-5">
            {isRTL?<>هل أنت مستعد<br/>لتسميه <em>منزلك؟</em></>:<>Ready to Call<br/>It <em>Home?</em></>}
          </h2>
          <p className="text-sm leading-[1.9] mb-8" style={{ color:"#6b7c6e",maxWidth:420 }}>
            {isRTL?"احجز جولة خاصة وعِش تجربة قرية النخيل بنفسك. فريقنا سيرافقك في جولة شاملة على كل مسكن ومرفق.":"Schedule a private tour and experience Alnakheel Village for yourself. Our team will guide you through every residence and facility."}
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/contact" className="btn-gold">
              {isRTL?"احجز جولة":"Book a Tour"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href="https://wa.me/966504844181" target="_blank" rel="noopener noreferrer" style={{ background:"transparent",color:"rgba(10,18,9,.7)",fontSize:10,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",padding:"16px 36px",borderRadius:2,border:"1px solid rgba(0,0,0,.15)",display:"inline-flex",alignItems:"center",gap:10,transition:"all .4s" }}>
              {isRTL?"تواصل عبر واتساب":"WhatsApp Us"}
            </a>
          </div>
        </Reveal>

        {/* Contact card */}
        <Reveal direction={isRTL?"left":"right"} delay={0.2}>
          <div style={{ background:"#0A1209",borderRadius:3,padding:48,borderTop:"3px solid #F9AD51",position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",top:0,right:0,width:150,height:150,background:"radial-gradient(circle,rgba(249,173,81,.08),transparent 70%)" }}/>
            <div style={{ fontFamily:SERIF,fontSize:26,fontWeight:600,color:"#fff",marginBottom:32 }}>
              {isRTL?"تواصل معنا":"Get In Touch"}
            </div>
            {[
              { svg:<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, c:"#178F44", lbl:isRTL?"البريد الإلكتروني":"Email", val:"info@alnakheelvillage.com" },
              { svg:<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>, c:"#F9AD51", lbl:"WhatsApp", val:"+966 50 484 4181" },
              { svg:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>, c:"#1DA5DE", lbl:isRTL?"الموقع":"Location", val:isRTL?"الخبر، المملكة العربية السعودية":"Al Khobar, Saudi Arabia" },
            ].map((c,i) => (
              <div key={i} className="flex items-center gap-4 mb-5 last:mb-0">
                <div style={{ width:38,height:38,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:`${c.c}22` }}>
                  <svg viewBox="0 0 24 24" style={{ width:15,height:15,fill:"none",stroke:c.c,strokeWidth:1.5 }}>{c.svg}</svg>
                </div>
                <div>
                  <div className="text-[8px] font-bold tracking-[2px] uppercase mb-1" style={{ color:"rgba(255,255,255,.28)" }}>{c.lbl}</div>
                  <div className="text-[13px] font-medium text-white">{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

    </div>
  );
}
