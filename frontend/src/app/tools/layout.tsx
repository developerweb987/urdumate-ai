import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "English to Urdu Translator",
  description: "Translate between English and Urdu with a fast online engine or an AI model that runs in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
