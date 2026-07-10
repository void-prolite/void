import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Us | Void.prolite",
  description: "Learn about Void.prolite, our custom digital solutions, core pillars, and our design and development methodologies.",
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
