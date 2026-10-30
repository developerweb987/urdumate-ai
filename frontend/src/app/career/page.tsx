"use client";
import { useState } from "react";
import { Briefcase, FileUser, MessageSquareReply, Send, Sparkles, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChoiceGroup } from "@/components/ui/ChoiceGroup";
import { Field, inputClass } from "@/components/ui/Field";
import { PageHeader, ToolPage, cardClass } from "@/components/ui/PageHeader";
import { ResultPanel } from "@/components/ui/ResultPanel";

type Platform = "upwork" | "fiverr" | "cover_letter" | "linkedin";

const PLATFORMS = [
  { value: "upwork", label: "Upwork proposal", icon: Send },
  { value: "fiverr", label: "Fiverr buyer reply", icon: MessageSquareReply },
  { value: "cover_letter", label: "Job cover letter", icon: FileUser },
  { value: "linkedin", label: "LinkedIn outreach", icon: UserPlus },
] satisfies { value: Platform; label: string; icon: typeof Send }[];

export default function CareerStudio() {
  const [platform, setPlatform] = useState<Platform>("upwork");
  const [jobTitle, setJobTitle] = useState("");
  const [clientNeeds, setClientNeeds] = useState("");
  const [mySkills, setMySkills] = useState("");
  const [output, setOutput] = useState("");

  const generateProposal = (e: React.FormEvent) => {
    e.preventDefault();

    const title = jobTitle.trim() || "Project Requirement";
    const skills = mySkills.trim() || "relevant industry tools and proven execution";
    const needs = clientNeeds.trim() || "delivering top-tier quality within agreed timelines";

    let result = "";

    if (platform === "upwork") {
      result = `Hi there,\n\nI reviewed your post regarding "${title}" and immediately understood your core challenge: ${needs}.\n\nHere is how I can solve this efficiently for you:\n1. Dedicated execution utilizing ${skills}.\n2. Clean milestone updates with zero communication lag.\n3. Revisions until you are 100% satisfied with the outcome.\n\nI have previously delivered similar assignments with measurable success. Are you available for a brief 5-minute chat to align on the technical requirements?\n\nBest regards,\n[Your Name]`;
    } else if (platform === "fiverr") {
      result = `Hello!\n\nThank you for reaching out. Regarding your request for "${title}":\n\nI specialize in ${skills} and can complete this task ensuring: ${needs}.\n\nEstimated Delivery: Rapid delivery with verified revisions.\n\nFeel free to drop a message in chat so we can review the exact project scope and begin immediately!\n\nRegards,\n[Your Name]`;
    } else if (platform === "cover_letter") {
      result = `Dear Hiring Committee,\n\nI am writing to express my strong enthusiasm for the "${title}" position. Having closely followed your team's work, I am confident that my background in ${skills} directly complements your operational goals.\n\nIn my previous work, I have consistently focused on ${needs}. I bring a disciplined work ethic, clear reporting habits, and a collaborative mindset.\n\nI would welcome the opportunity to discuss how my skillset can add direct value to your upcoming projects. Thank you for considering my application.\n\nSincerely,\n[Your Name]`;
    } else {
      result = `Hi [Name],\n\nI noticed your recent updates regarding "${title}". With hands-on experience in ${skills}, I actively assist teams in resolving challenges around ${needs}.\n\nI would love to connect and exchange thoughts on industry best practices.\n\nBest regards,\n[Your Name]`;
    }

    setOutput(result);
  };

  return (
    <ToolPage>
      <PageHeader
        icon={Briefcase}
        title="Proposals & Job Applications"
        description="Choose what you're writing, describe the job and your skills, and get a ready-to-edit draft."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={generateProposal} className={cn(cardClass, "flex flex-col gap-5 p-5 sm:p-6")}>
          <ChoiceGroup
            legend="What are you writing?"
            name="platform"
            value={platform}
            onChange={setPlatform}
            choices={PLATFORMS}
          />

          <Field label="Job or gig title" htmlFor="job-title">
            <input
              id="job-title"
              type="text"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Full-Stack React Developer"
              className={inputClass}
            />
          </Field>

          <Field
            label="What does the client need?"
            htmlFor="client-needs"
            optional
            hint="Copy the key points from the job post."
          >
            <textarea
              id="client-needs"
              rows={3}
              value={clientNeeds}
              onChange={(e) => setClientNeeds(e.target.value)}
              placeholder="e.g. rebuild a slow website and improve mobile layout"
              className={cn(inputClass, "resize-y")}
            />
          </Field>

          <Field label="Your skills and strengths" htmlFor="my-skills" optional>
            <textarea
              id="my-skills"
              rows={3}
              value={mySkills}
              onChange={(e) => setMySkills(e.target.value)}
              placeholder="e.g. Next.js, Tailwind CSS, 3+ years building web apps"
              className={cn(inputClass, "resize-y")}
            />
          </Field>

          <Button type="submit" size="lg" className="w-full">
            <Sparkles aria-hidden /> Generate draft
          </Button>
        </form>

        <ResultPanel
          title="Your draft"
          value={output}
          copyLabel="Copy draft"
          emptyTitle="Your draft will appear here"
          emptyHint="Fill in the job title, then press Generate draft."
          filename="UrduMate_Proposal.txt"
          minHeight="min-h-[380px]"
          footer={output ? "Personalize it and replace [Your Name] before sending." : null}
        />
      </div>
    </ToolPage>
  );
}
