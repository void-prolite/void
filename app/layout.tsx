import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Void.",
  description: "We craft bold digital experiences that push boundaries.",
  icons: {
    icon: "/images/Void favicon.svg",
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