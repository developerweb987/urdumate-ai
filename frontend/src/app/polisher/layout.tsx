import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing Polisher",
  description: "Turn rough notes into a formal message, a concise summary, bullet points, or a polite request.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
