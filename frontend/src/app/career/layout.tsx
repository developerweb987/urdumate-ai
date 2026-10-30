import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proposals & Job Applications",
  description: "Draft Upwork proposals, Fiverr replies, cover letters, and LinkedIn outreach notes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
