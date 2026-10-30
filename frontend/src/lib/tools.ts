import {
  Briefcase,
  FileText,
  Globe2,
  Languages,
  Mail,
  Wand2,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type ToolGroup = "Translate" | "Write" | "Utilities";

export interface Tool {
  href: string;
  /** Short label used in navigation */
  label: string;
  /** Full name used on cards and page headers */
  title: string;
  desc: string;
  icon: LucideIcon;
  group: ToolGroup;
}

export const TOOLS: Tool[] = [
  {
    href: "/tools",
    label: "Translator",
    title: "English ⇄ Urdu Translator",
    desc: "Translate between English and Urdu, with proper Nastaliq display. Choose a fast online engine or an AI model that runs in your browser.",
    icon: Languages,
    group: "Translate",
  },
  {
    href: "/roman-urdu",
    label: "Roman Urdu",
    title: "Roman Urdu Workplace Helper",
    desc: "Turn casual Roman Urdu messages into formal office English, a short chat reply, or polite Roman Urdu.",
    icon: Globe2,
    group: "Translate",
  },
  {
    href: "/polisher",
    label: "Polisher",
    title: "Writing Polisher",
    desc: "Turn rough notes into a formal message, a concise summary, bullet points, or a polite request.",
    icon: Wand2,
    group: "Write",
  },
  {
    href: "/email",
    label: "Email Writer",
    title: "Professional Email Writer",
    desc: "Draft leave requests, job follow-ups, meeting requests, and office updates with a subject line.",
    icon: Mail,
    group: "Write",
  },
  {
    href: "/career",
    label: "Proposals",
    title: "Proposals & Job Applications",
    desc: "Draft Upwork proposals, Fiverr buyer replies, cover letters, and LinkedIn outreach notes.",
    icon: Briefcase,
    group: "Write",
  },
  {
    href: "/utilities",
    label: "Text Tools",
    title: "Text Tools",
    desc: "Clean up spacing, change letter case, and count words and characters.",
    icon: Wrench,
    group: "Utilities",
  },
  {
    href: "/templates",
    label: "Templates",
    title: "Ready-to-Use Templates",
    desc: "Copy standard letter and application formats, then fill in your details.",
    icon: FileText,
    group: "Utilities",
  },
];

export const TOOL_GROUPS: { name: ToolGroup; blurb: string }[] = [
  { name: "Translate", blurb: "Move between English, Urdu, and Roman Urdu" },
  { name: "Write", blurb: "Draft messages, emails, and proposals" },
  { name: "Utilities", blurb: "Clean up text and start from a template" },
];
