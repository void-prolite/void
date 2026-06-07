import type { Metadata } from "next";
import "./globals.css";
import BackgroundGrid from "../components/BackgroundGrid";
import Navigation from "../components/Navigation";
import CustomCursor from "../components/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://void-studio.vercel.app"),
  title: "Void.",
  description: "We design and build clean, high-performance websites and digital interfaces.",
  icons: {
    icon: "/icon.svg?v=2",
    shortcut: "/favicon.ico?v=2",
  },
  openGraph: {
    title: "Void.",
    description: "We design and build clean, high-performance websites and digital interfaces.",
    url: "https://void-prolite.online",
    siteName: "Void.",
    images: [
      {
        url: "/images/void-studio.webp",
        width: 1024,
        height: 1024,
        alt: "Void. Digital Creative Studio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Void. | Digital Creative Studio",
    description: "We design and build clean, high-performance websites and digital interfaces.",
    images: ["/images/void-studio.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-zinc-900 antialiased min-h-screen overflow-x-hidden">
        <CustomCursor />
        <div className="noise-overlay" />
        <BackgroundGrid />
        <Navigation />
        {children}
      </body>
    </html>
  );
}