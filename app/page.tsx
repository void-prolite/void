
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import WorkSection from "../components/WorkSection";
import ServicesSection from "../components/ServicesSection";
import ComparisonSection from "../components/ComparisonSection";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import Error404 from "../components/Error404";



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
        href: "https://voidlite.vercel.app/",
        image: "/images/void-lite.png",
        accentColor: "#ff4b3e",
        hoverBorderColor: "rgba(255, 75, 62, 0.3)"
      },
      {
        title: "Void.Pro",
        client: "Void Premium Ecosystem",
        size: "large",
        accentColor: "#a855f7"
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