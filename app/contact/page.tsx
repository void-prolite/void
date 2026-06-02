"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";

export default function ContactPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Scroll Parallax Effects
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  // Mouse Parallax for Nebula glows
  const mouseX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });

  const [hasMounted, setHasMounted] = useState(false);

  // Form State Management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [projectType, setProjectType] = useState<string>("Pro Platform");
  const [budgetTier, setBudgetTier] = useState<string>("under ₹10k");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [isIndiaCurrency, setIsIndiaCurrency] = useState<boolean>(true);

  const inrTiers = ["under ₹10k", "₹10k to ₹50k", "₹50k to ₹1 lakh", "₹1 lakh to ₹4 lakhs", "over ₹4 lakhs"];
  const usdTiers = ["Under 1k $", "1k to 10k $", "10k to 50k $", "50k+$"];

  useEffect(() => {
    setHasMounted(true);

    // Fast synchronous detection via browser timezone metadata
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const isIndiaTimezone = timezone === "Asia/Kolkata" || timezone === "Asia/Calcutta";
      if (!isIndiaTimezone) {
        setIsIndiaCurrency(false);
        setBudgetTier("Under 1k $");
      }

      // Query a reliable, CORS-friendly client-side geolocator (freeipapi.com)
      fetch("https://freeipapi.com/api/json")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.countryCode) {
            const isIN = data.countryCode === "IN";
            setIsIndiaCurrency(isIN);
            setBudgetTier(isIN ? "under ₹10k" : "Under 1k $");
          }
        })
        .catch((err) => {
          console.log("Primary Geo IP failed, trying backup:", err);
          // Backup query using ipwho.is which also supports CORS & HTTPS
          fetch("https://ipwho.is/")
            .then((res) => res.json())
            .then((data) => {
              if (data && data.country_code) {
                const isIN = data.country_code === "IN";
                setIsIndiaCurrency(isIN);
                setBudgetTier(isIN ? "under ₹10k" : "Under 1k $");
              }
            })
            .catch((backupErr) => console.log("Backup Geo IP lookup bypassed:", backupErr));
        });
    } catch (e) {
      console.log("Timezone identification bypassed:", e);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;
      mouseX.set((clientX / width) - 0.5);
      mouseY.set((clientY / height) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const pX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const pY = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  const projectTypes = ["Lite Platform", "Pro Platform"];
  const budgetTiers = isIndiaCurrency ? inrTiers : usdTiers;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "fa176d5a-64e5-4166-9746-41bc07a9ce4d",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          project_type: projectType,
          budget_tier: budgetTier,
          subject: `New Project Consultation Request from ${formData.name}`,
          from_name: "Void Studio Agency"
        })
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Web3Forms submission failed:", data);
        setFormStatus("error");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setFormStatus("error");
    }
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-black overflow-hidden relative">
      <Navigation transparent={true} />

      {/* Nebula Ambient Parallax Backgrounds */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-black to-pink-950/10" />

        {/* Soft violet glowing blob */}
        <motion.div
          style={{ x: pX, y: pY }}
          animate={{
            scale: [1, 1.15, 0.95, 1.1, 1],
            opacity: [0.12, 0.22, 0.15, 0.2, 0.12]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px]"
        />
        {/* Soft pink glowing blob */}
        <motion.div
          style={{ x: pX, y: pY }}
          animate={{
            scale: [1, 0.9, 1.12, 0.95, 1],
            opacity: [0.1, 0.18, 0.12, 0.16, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px]"
        />
      </motion.div>

      {/* Floating Micro-Star / Particle System */}
      {hasMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {Array.from({ length: 30 }).map((_, i) => {
            const size = Math.random() * 2.5 + 1; // 1px to 3.5px
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            const duration = Math.random() * 22 + 15;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: size,
                  height: size,
                  left: `${initialX}%`,
                  top: `${initialY}%`,
                }}
                animate={{
                  y: ["0px", "-160px", "0px"],
                  x: ["0px", Math.random() > 0.5 ? "50px" : "-50px", "0px"],
                  opacity: [0.1, 0.7, 0.1],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * -18,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Contact Hero Block */}
      <section className="relative pt-36 pb-12 px-6 z-10">
        <motion.div style={{ y: contentY }} className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-purple-500 text-xs font-bold tracking-[0.3em] uppercase mb-6 block"
          >
            PROJECT INITIATION
          </motion.span>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1] tracking-tighter mb-8 max-w-4xl select-none">
            <span className="block text-zinc-100 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              CONNECT WITH
            </span>
            <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent relative drop-shadow-[0_0_35px_rgba(168,85,247,0.2)]">
              THE FUTURE
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto font-semibold leading-relaxed tracking-wide"
          >
            Submit your parameters or drop us a direct line to start co-designing your next platform architecture.
          </motion.p>
        </motion.div>
      </section>

      {/* Main Glassmorphic Contact Card Section */}
      <section className="py-12 pb-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-zinc-950/20 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 gap-12 relative overflow-hidden group">

              {/* Outer soft ambient card overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{ background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.05), transparent 70%)' }}
              />

              {/* Left Column: Direct Agency Parameters */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full relative z-10 pr-0 lg:pr-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                    Direct Connections
                  </h2>
                  <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-8">
                    Skip the diagnostic fields entirely and established direct parameters via secure channels.
                  </p>

                  <div className="space-y-6">
                    {/* Direct Email Card */}
                    <motion.a
                      href="mailto:void.prolite@gmail.com"
                      whileHover={{ y: -3, borderColor: "rgba(168, 85, 247, 0.3)", backgroundColor: "rgba(255,255,255,0.02)" }}
                      className="flex items-center gap-5 p-5 bg-white/5 border border-white/5 rounded-2xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase block mb-1">
                          STUDIO EMAIL
                        </span>
                        <span className="text-white text-sm md:text-base font-bold hover:text-purple-400 transition-colors">
                          void.prolite@gmail.com
                        </span>
                      </div>
                    </motion.a>

                    {/* Operational Details */}
                    <div className="flex items-center gap-5 p-5 bg-zinc-950/10 border border-white/5 rounded-2xl">
                      <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-400">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase block mb-1">
                          WORKING TIMINGS
                        </span>
                        <span className="text-zinc-300 text-xs md:text-sm font-semibold block">
                          Mon - Fri, 09:00 - 18:00 IST
                        </span>
                      </div>
                    </div>

                    {/* Support Availability */}
                    <div className="flex items-center gap-5 p-5 bg-white/5 border border-white/5 rounded-2xl">
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase block mb-1">
                          SUPPORT CHANNELS
                        </span>
                        <span className="text-zinc-300 text-xs md:text-sm font-semibold block">
                          You can contact us anytime
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Networks footer */}
                <div className="mt-16 pt-8 border-t border-white/5">
                  <span className="text-[10px] font-extrabold tracking-[0.2em] text-zinc-500 uppercase block mb-4">
                    ESTABLISH FREQUENCIES
                  </span>
                  <div className="flex gap-4">
                    {[
                      { name: "Instagram", href: "https://www.instagram.com/void.prolite/", target: "_blank", rel: "noopener noreferrer" },
                      { name: "Twitter", href: "#", target: undefined, rel: undefined },
                      { name: "LinkedIn", href: "#", target: undefined, rel: undefined }
                    ].map((network) => (
                      <a
                        key={network.name}
                        href={network.href}
                        target={network.target}
                        rel={network.rel}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-400 font-semibold hover:text-white hover:border-purple-500/20 hover:bg-purple-500/5 transition-all duration-300"
                      >
                        {network.name.toUpperCase()}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Interaction Form */}
              <div className="lg:col-span-7 relative z-10 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
                <AnimatePresence mode="wait">
                  {formStatus !== "success" ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                        Design Consultation Request
                      </h2>

                      {formStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-2xl flex items-start gap-3 text-sm relative z-20"
                        >
                          <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <div>
                            <span className="font-bold block">Transmission Failed</span>
                            <span className="text-zinc-400 text-xs leading-relaxed">
                              Could not establish contact with our servers. Please verify your connection or try again. 
                              You can also reach out directly to <a href="mailto:void.prolite@gmail.com" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">void.prolite@gmail.com</a>.
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* Text Input Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase">
                            NAME / REPRESENTATIVE
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            disabled={formStatus === "submitting"}
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Liam Vance"
                            className="px-5 py-4 rounded-xl bg-white/5 border border-white/5 text-zinc-200 text-sm font-semibold placeholder-zinc-600 focus:border-purple-500/50 focus:bg-purple-950/5 transition-all duration-300"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase">
                            EMAIL ADDRESS
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            disabled={formStatus === "submitting"}
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. liam@company.com"
                            className="px-5 py-4 rounded-xl bg-white/5 border border-white/5 text-zinc-200 text-sm font-semibold placeholder-zinc-600 focus:border-purple-500/50 focus:bg-purple-950/5 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Select Project Type Pills */}
                      <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase">
                          REQUIRED ARCHITECTURE
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {projectTypes.map((type) => {
                            const isSelected = projectType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                disabled={formStatus === "submitting"}
                                onClick={() => setProjectType(type)}
                                className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all duration-300 relative ${isSelected
                                  ? "text-white border-purple-500/30 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                                  : "text-zinc-500 border-white/5 bg-white/5 hover:text-zinc-300"
                                  }`}
                              >
                                {type}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Budget Selector Pills */}
                      <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase">
                          BUDGET MATRIX
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {budgetTiers.map((tier) => {
                            const isSelected = budgetTier === tier;
                            return (
                              <button
                                key={tier}
                                type="button"
                                disabled={formStatus === "submitting"}
                                onClick={() => setBudgetTier(tier)}
                                className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all duration-300 ${isSelected
                                  ? "text-white border-pink-500/30 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.1)]"
                                  : "text-zinc-500 border-white/5 bg-white/5 hover:text-zinc-300"
                                  }`}
                              >
                                {tier}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Message Textarea */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase">
                          DIAGNOSTIC SCOPE / BRIEF
                        </label>
                        <textarea
                          name="message"
                          required
                          disabled={formStatus === "submitting"}
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Outline the parameters, functional requirements, and cinematic objectives for this ecosystem..."
                          className="px-5 py-4 rounded-xl bg-white/5 border border-white/5 text-zinc-200 text-sm font-semibold placeholder-zinc-600 focus:border-purple-500/50 focus:bg-purple-950/5 transition-all duration-300 resize-none"
                        />
                      </div>

                      {/* Submit CTA Button */}
                      <motion.button
                        whileHover={formStatus === "idle" ? { scale: 1.01 } : {}}
                        whileTap={formStatus === "idle" ? { scale: 0.99 } : {}}
                        type="submit"
                        disabled={formStatus === "submitting"}
                        className={`w-full py-4 rounded-xl font-extrabold text-sm tracking-wider uppercase transition-all duration-300 flex justify-center items-center gap-3 ${formStatus === "submitting"
                          ? "bg-zinc-900 border border-white/5 text-zinc-500 cursor-not-allowed"
                          : "bg-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 text-black hover:text-white cursor-pointer shadow-[0_10px_30px_rgba(255,255,255,0.03)]"
                          }`}
                      >
                        {formStatus === "submitting" ? (
                          <>
                            <div className="w-4 h-4 border-2 border-zinc-700 border-t-purple-500 rounded-full animate-spin" />
                            TRANSMITTING INQUIRY METRICS...
                          </>
                        ) : (
                          "INITIATE CONSULTATION"
                        )}
                      </motion.button>

                    </motion.form>
                  ) : (
                    <motion.div
                      key="contact-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="h-full flex flex-col justify-center items-center text-center py-12 md:py-24"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex justify-center items-center mb-8 animate-bounce">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>

                      <span className="text-[10px] font-extrabold tracking-[0.3em] text-purple-400 uppercase mb-3">
                        TRANSMISSION STABLE
                      </span>
                      <h2 className="text-3xl font-black text-white tracking-tight mb-4">
                        Inquiry Received.
                      </h2>
                      <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">
                        Parameters logged successfully. A Void representative will establish communication channels on your frequency within <span className="text-white">24 operational hours</span>.
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormStatus("idle")}
                        className="mt-8 px-6 py-3 border border-white/10 hover:border-purple-500/20 hover:bg-purple-500/5 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300"
                      >
                        SUBMIT NEW DIAGNOSTIC
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
