import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Email Writer",
  description: "Draft leave requests, job follow-ups, meeting requests, and office updates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
