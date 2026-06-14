import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Void.",
  description: "Learn about Void., our custom digital solutions, core pillars, and our design and development methodologies.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
