"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";

export default function ContactPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Scroll Parallax Effects
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);

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

    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const isIndiaTimezone = timezone === "Asia/Kolkata" || timezone === "Asia/Calcutta";
      if (!isIndiaTimezone) {
        setIsIndiaCurrency(false);
        setBudgetTier("Under 1k $");
      }

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
  }, []);

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
          subject: `New Project Request from ${formData.name}`,
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
    <main ref={containerRef} className="min-h-screen bg-transparent overflow-hidden relative">

      {/* Background Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none select-none z-0 bg-transparent" />

      {/* Contact Hero Block */}
      <section className="relative pt-28 pb-8 px-6 z-10">
        <motion.div style={{ y: contentY }} className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-zinc-500 text-xs font-bold tracking-[0.3em] uppercase mb-6 block"
          >
            CONTACT US
          </motion.span>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1] tracking-tighter mb-8 max-w-4xl select-none">
            <span className="block text-black">
              WORK WITH
            </span>
            <span className="block text-black relative">
              OUR STUDIO
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-zinc-650 text-base sm:text-lg max-w-xl mx-auto font-semibold leading-relaxed tracking-wide"
          >
            Tell us about your project or send us an email directly to get started.
          </motion.p>
        </motion.div>
      </section>

      {/* Main Contact Card Section */}
      <section className="py-8 pb-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-zinc-50 border border-zinc-200 rounded-[2.5rem] p-8 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-12 relative overflow-hidden group">

              {/* Left Column: Direct Agency Parameters */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full relative z-10 pr-0 lg:pr-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-black mb-4 tracking-tight">
                    Direct Contact
                  </h2>
                  <p className="text-zinc-600 text-sm font-medium leading-relaxed mb-8">
                    Feel free to email us directly or check our operating hours below.
                  </p>

                  <div className="space-y-6">
                    {/* Direct Email Card */}
                    <motion.a
                      href="mailto:void.prolite@gmail.com"
                      whileHover={{ y: -3, borderColor: "#000000", backgroundColor: "#f4f4f5" }}
                      className="flex items-center gap-5 p-5 bg-white border border-zinc-200 rounded-2xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-black">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase block mb-1">
                          EMAIL ADDRESS
                        </span>
                        <span className="text-black text-sm md:text-base font-bold transition-colors">
                          void.prolite@gmail.com
                        </span>
                      </div>
                    </motion.a>

                    {/* Operational Details */}
                    <div className="flex items-center gap-5 p-5 bg-white border border-zinc-200 rounded-2xl">
                      <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-black">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase block mb-1">
                          OPERATING HOURS
                        </span>
                        <span className="text-zinc-750 text-xs md:text-sm font-semibold block">
                          Mon - Fri, 09:00 - 18:00 IST
                        </span>
                      </div>
                    </div>

                    {/* Support Availability */}
                    <div className="flex items-center gap-5 p-5 bg-white border border-zinc-200 rounded-2xl">
                      <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-black">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase block mb-1">
                          SUPPORT AVAILABILITY
                        </span>
                        <span className="text-zinc-750 text-xs md:text-sm font-semibold block">
                          We respond to all requests within 24 hours.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Networks footer */}
                <div className="mt-16 pt-8 border-t border-zinc-200">
                  <span className="text-[10px] font-extrabold tracking-[0.2em] text-zinc-500 uppercase block mb-4">
                    OUR SOCIALS
                  </span>
                  <div className="flex gap-4">
                    {["Instagram", "Twitter", "LinkedIn"].map((network) => {
                      const socialUrls: Record<string, string> = {
                        Instagram: "https://www.instagram.com/void.prolite/",
                        Twitter: "https://x.com/Voidprolite",
                        LinkedIn: "#"
                      };
                      const href = socialUrls[network] || "#";
                      return (
                        <a
                          key={network}
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="px-4 py-2 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-500 font-semibold hover:text-black hover:border-black transition-all duration-300"
                        >
                          {network.toUpperCase()}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Interaction Form */}
              <div className="lg:col-span-7 relative z-10 border-t lg:border-t-0 lg:border-l border-zinc-200 pt-12 lg:pt-0 lg:pl-12">
                <AnimatePresence mode="wait">
                  {formStatus !== "success" ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
                        Start a Project
                      </h2>

                      {formStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-50 border border-red-100 text-red-800 rounded-2xl flex items-start gap-3 text-sm relative z-20"
                        >
                          <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <div>
                            <span className="font-bold block">Transmission Failed</span>
                            <span className="text-zinc-650 text-xs leading-relaxed">
                              Could not send your message. Please check your connection and try again.
                              You can also reach out directly to <a href="mailto:void.prolite@gmail.com" className="text-black underline hover:text-zinc-800 font-bold transition-colors">void.prolite@gmail.com</a>.
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* Text Input Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase">
                            YOUR NAME
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            disabled={formStatus === "submitting"}
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Liam Vance"
                            className="px-5 py-4 rounded-xl bg-white border border-zinc-200 text-zinc-800 text-sm font-semibold placeholder-zinc-400 focus:border-black focus:bg-zinc-50 transition-all duration-300"
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
                            className="px-5 py-4 rounded-xl bg-white border border-zinc-200 text-zinc-800 text-sm font-semibold placeholder-zinc-400 focus:border-black focus:bg-zinc-50 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Select Project Type Pills */}
                      <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase">
                          SELECT A PACKAGE
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
                                  ? "text-white border-black bg-black"
                                  : "text-zinc-500 border-zinc-200 bg-zinc-50 hover:text-black"
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
                          ESTIMATED BUDGET
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
                                  ? "text-white border-black bg-black"
                                  : "text-zinc-500 border-zinc-200 bg-zinc-50 hover:text-black"
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
                          PROJECT SUMMARY
                        </label>
                        <textarea
                          name="message"
                          required
                          disabled={formStatus === "submitting"}
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Briefly describe your project goals, features, and requirements..."
                          className="px-5 py-4 rounded-xl bg-white border border-zinc-200 text-zinc-800 text-sm font-semibold placeholder-zinc-400 focus:border-black focus:bg-zinc-50 transition-all duration-300 resize-none"
                        />
                      </div>

                      {/* Submit CTA Button */}
                      <motion.button
                        whileHover={formStatus === "idle" ? { scale: 1.01 } : {}}
                        whileTap={formStatus === "idle" ? { scale: 0.99 } : {}}
                        type="submit"
                        disabled={formStatus === "submitting"}
                        className={`w-full py-4 rounded-xl font-extrabold text-sm tracking-wider uppercase transition-all duration-300 flex justify-center items-center gap-3 ${formStatus === "submitting"
                          ? "bg-zinc-100 border border-zinc-200 text-zinc-400 cursor-not-allowed"
                          : "bg-black hover:bg-zinc-800 text-white cursor-pointer shadow-none"
                          }`}
                      >
                        {formStatus === "submitting" ? (
                          <>
                            <div className="w-4 h-4 border-2 border-zinc-300 border-t-zinc-650 rounded-full animate-spin" />
                            SENDING MESSAGE...
                          </>
                        ) : (
                          "SEND MESSAGE"
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
                      <div className="w-16 h-16 rounded-2xl bg-black/5 border border-black/10 text-black flex justify-center items-center mb-8 animate-bounce">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>

                      <span className="text-[10px] font-extrabold tracking-[0.3em] text-zinc-500 uppercase mb-3">
                        MESSAGE SENT
                      </span>
                      <h2 className="text-3xl font-black text-black tracking-tight mb-4">
                        Thank You.
                      </h2>
                      <p className="text-zinc-600 text-sm font-medium leading-relaxed max-w-sm">
                        We have received your email. We will review your request and get back to you within 24 hours.
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormStatus("idle")}
                        className="mt-8 px-6 py-3 border border-zinc-200 hover:border-black hover:bg-black/5 text-black rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300"
                      >
                        SUBMIT ANOTHER REQUEST
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
