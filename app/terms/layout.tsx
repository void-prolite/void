import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Void.prolite",
  description: "Review the Terms of Service for Void.prolite, including project scoping, intellectual property, payments, and acceptable use.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
