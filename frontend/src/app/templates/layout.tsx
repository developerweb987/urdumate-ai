import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates",
  description: "Ready-to-use letter and application templates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
