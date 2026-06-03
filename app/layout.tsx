import type { Metadata } from "next";
import "./globals.css";
import BackgroundGrid from "../components/BackgroundGrid";

export const metadata: Metadata = {
  metadataBase: new URL("https://void-studio.vercel.app"),
  title: "Void.",
  description: "We design and build clean, high-performance websites and digital interfaces.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Void.",
    description: "We design and build clean, high-performance websites and digital interfaces.",
    url: "https://void-studio.vercel.app",
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
        <div className="noise-overlay" />
        <BackgroundGrid />
        {children}
      </body>
    </html>
  );
}