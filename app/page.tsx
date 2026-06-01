import dynamic from "next/dynamic";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";

const WorkSection = dynamic(() => import("../components/WorkSection"));
const ServicesSection = dynamic(() => import("../components/ServicesSection"));
const ComparisonSection = dynamic(() => import("../components/ComparisonSection"));
const CtaSection = dynamic(() => import("../components/CtaSection"));
const Footer = dynamic(() => import("../components/Footer"));


export default function Home() {
  const projects: {
    title: string;
    client: string;
    size: "large" | "normal";
    href?: string;
    image?: string;
    accentColor?: string;
    hoverBorderColor?: string;
  }[] = [
      {
        title: "Void.Lite",
        client: "Void Essential Platform",
        size: "large",
        href: "https://void-lite.vercel.app/",
        image: "/images/void-lite.webp",
        accentColor: "#ff4b3e",
        hoverBorderColor: "rgba(255, 75, 62, 0.3)"
      },
      {
        title: "Void.Pro",
        client: "Void Premium Ecosystem",
        size: "large",
        href: "https://void-pro-portfolio.vercel.app/",
        image: "/images/void-pro.webp",
        accentColor: "#a855f7",
        hoverBorderColor: "rgba(168, 85, 247, 0.3)"
      }
    ];

  const services = [
    { num: "01", title: "Brand Identity", desc: "Creating memorable brand experiences that resonate." },
    { num: "02", title: "Web Design", desc: "Pixel-perfect websites with seamless interactions." },
    { num: "03", title: "Development", desc: "Cutting-edge web applications and platforms." },
    { num: "04", title: "Motion Design", desc: "Captivating animations that bring ideas to life." }
  ];

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <WorkSection projects={projects} />
      <ServicesSection services={services} />
      <ComparisonSection />
      <CtaSection />
      <Footer />
    </main>
  );
}