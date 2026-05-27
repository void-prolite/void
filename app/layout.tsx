import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Void.",
  description: "We craft bold digital experiences that push boundaries.",
  icons: {
    icon: "/images/Void favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${lora.variable}`}>
      <body className="bg-black text-white antialiased min-h-screen overflow-x-hidden selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}