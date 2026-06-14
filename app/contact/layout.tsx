import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Void.",
  description: "Get in touch with Void. Start a project with our digital creative studio or reach out to us directly.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
