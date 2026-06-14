import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project | Void.",
  description: "Choose your platform and start a project with Void. We build static showcase websites and custom web applications.",
};

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
