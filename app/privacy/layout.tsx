import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Void.prolite",
  description: "Read the Privacy Policy for Void.prolite Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
