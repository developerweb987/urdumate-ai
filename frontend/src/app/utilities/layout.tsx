import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Tools",
  description: "Clean up spacing, change letter case, and count words and characters.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
