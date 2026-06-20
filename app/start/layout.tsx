import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project | Void.prolite",
  description: "Choose your platform and start a project with Void.prolite We build static showcase websites and custom web applications.",
};

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
