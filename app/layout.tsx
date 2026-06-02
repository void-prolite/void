import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://void-studio.vercel.app"),
  title: "Void.",
  description: "We craft bold, premium, and highly animated digital experiences that push boundaries.",
  openGraph: {
    title: "Void.",
    description: "We craft bold, premium, and highly animated digital experiences that push boundaries.",
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
    description: "We craft bold, premium, and highly animated digital experiences that push boundaries.",
    images: ["/images/void-studio.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased min-h-screen overflow-x-hidden selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}