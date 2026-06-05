import dynamic from "next/dynamic";
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
    tags?: string[];
  }[] = [
      {
        title: "Void.Lite",
        client: "Static Showcase Website",
        size: "large",
        href: "https://void-lite.vercel.app/",
        image: "/images/void-lite.webp",
        accentColor: "#ff4b3e",
        hoverBorderColor: "rgba(255, 75, 62, 0.3)",
        tags: ["Next.js", "Tailwind CSS", "Framer", "Static"]
      },
      {
        title: "Void.Pro",
        client: "Custom Web Application",
        size: "large",
        href: "https://void-pro-portfolio.vercel.app/",
        image: "/images/void-pro.webp",
        accentColor: "#a855f7",
        hoverBorderColor: "rgba(168, 85, 247, 0.3)",
        tags: ["Next.js", "Tailwind CSS", "TypeScript", "API Integration", "Dynamic"]
      }
    ];

  const services = [
    { num: "01", title: "Brand Identity", desc: "We design logos, visual assets, and style guidelines.", capabilities: ["Logo Systems", "Visual Identity", "Style Guidelines", "Creative Direction"] },
    { num: "02", title: "Web Design", desc: "We design clean, responsive page layouts.", capabilities: ["UI/UX Interface Design", "Responsive Layouts", "Interactive Prototypes", "Design Systems"] },
    { num: "03", title: "Development", desc: "We write clean, secure frontend and backend code.", capabilities: ["Next.js / React Development", "Tailwind CSS Styling", "API Integrations", "TypeScript Quality"] },
    { num: "04", title: "User Experience", desc: "We optimize interfaces for simple and clear user flows.", capabilities: ["User Flow Optimization", "Usability Audits", "SEO Performance Setup", "Interactive Transitions"] }
  ];

  return (
    <main className="min-h-screen">
      <Hero />
      <WorkSection projects={projects} />
      <ServicesSection services={services} />
      <ComparisonSection />
      <CtaSection />
      <Footer />
    </main>
  );
}