"use client";
import { useState } from "react";
import { AlignLeft, ArrowRight, Briefcase, HeartHandshake, List, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChoiceGroup } from "@/components/ui/ChoiceGroup";
import { Field, inputClass } from "@/components/ui/Field";
import { PageHeader, ToolPage, cardClass } from "@/components/ui/PageHeader";
import { ResultPanel } from "@/components/ui/ResultPanel";

type Tone = "formal" | "concise" | "bullet_points" | "polite";

const TONES = [
  { value: "formal", label: "Formal", desc: "Corporate letter format", icon: Briefcase },
  { value: "concise", label: "Concise", desc: "Short and to the point", icon: AlignLeft },
  { value: "bullet_points", label: "Bullet points", desc: "Split into key highlights", icon: List },
  { value: "polite", label: "Polite request", desc: "Diplomatic and courteous", icon: HeartHandshake },
] satisfies { value: Tone; label: string; desc: string; icon: typeof Wand2 }[];

export default function TextPolisher() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState<Tone>("formal");
  const [polishedText, setPolishedText] = useState("");

  const handlePolish = () => {
    if (!text.trim()) return;

    let res = text.trim();

    // Deterministic grammar & vocabulary enhancements
    res = res
      .replace(/\bi wanna\b/gi, "I would like to")
      .replace(/\bi gonna\b/gi, "I plan to")
      .replace(/\basap\b/gi, "at your earliest convenience")
      .replace(/\bplz\b/gi, "kindly")
      .replace(/\bu\b/gi, "you")
      .replace(/\br\b/gi, "are")
      .replace(/\bthx\b/gi, "thank you");

    if (tone === "formal") {
      res = `Dear Recipient,\n\nI am writing to share the following matter with you for review:\n\n"${res}"\n\nPlease let me know if further clarification is required.\n\nSincerely,\n[Your Name]`;
    } else if (tone === "concise") {
      const sentences = res.split(/[.!?]+/).filter((s) => s.trim().length > 0);
      res = sentences.map((s) => s.trim()).join(". ") + ".";
    } else if (tone === "bullet_points") {
      const parts = res.split(/[,\n.]+/).filter((p) => p.trim().length > 3);
      res = "Key Highlights:\n" + parts.map((p) => `• ${p.trim()}`).join("\n");
    } else if (tone === "polite") {
      res = `I hope this note finds you well.\n\nCould you kindly assist with the following when you have a moment?\n\n"${res}"\n\nThank you very much for your time and guidance.`;
    }

    setPolishedText(res);
  };

  return (
    <ToolPage>
      <PageHeader
        icon={Wand2}
        title="Writing Polisher"
        description="Paste a rough draft, pick a style, and get a cleaner version. Common shortcuts like “plz”, “u”, and “asap” are expanded automatically."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePolish();
          }}
          className={cn(cardClass, "flex flex-col gap-5 p-5 sm:p-6")}
        >
          <ChoiceGroup legend="1. Choose a style" name="tone" value={tone} onChange={setTone} choices={TONES} />

          <Field label="2. Your rough draft" htmlFor="draft">
            <textarea
              id="draft"
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. plz send me the report asap, thx"
              className={cn(inputClass, "resize-y leading-relaxed")}
            />
          </Field>

          <Button type="submit" size="lg" disabled={!text.trim()} className="w-full">
            Polish my text <ArrowRight aria-hidden />
          </Button>
        </form>

        <ResultPanel
          title="Polished draft"
          value={polishedText}
          emptyTitle="Your polished text will appear here"
          emptyHint="Paste a draft, choose a style, and press Polish my text."
          filename="UrduMate_Polished_Text.txt"
          footer={polishedText ? "Replace any [placeholders] before sending." : null}
        />
      </div>
    </ToolPage>
  );
}
