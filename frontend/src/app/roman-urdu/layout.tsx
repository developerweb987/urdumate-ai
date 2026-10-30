import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roman Urdu Workplace Helper",
  description: "Turn casual Roman Urdu messages into formal office English, a short chat reply, or polite Roman Urdu.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
