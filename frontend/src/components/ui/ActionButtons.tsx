"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { copyText, downloadText } from "@/lib/clipboard";
import { Button } from "./Button";

function useFlash(ms = 2000) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const flash = (s: "ok" | "fail") => {
    setState(s);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), ms);
  };
  return [state, flash] as const;
}

export function CopyButton({
  text,
  label = "Copy",
  variant = "secondary",
  size = "sm",
}: {
  text: string;
  label?: string;
  variant?: "secondary" | "ghost" | "primary";
  size?: "sm" | "md";
}) {
  const [state, flash] = useFlash();
  return (
    <>
      <Button
        variant={variant}
        size={size}
        disabled={!text}
        onClick={async () => flash((await copyText(text)) ? "ok" : "fail")}
      >
        {state === "ok" ? <Check className="text-primary" aria-hidden /> : <Copy aria-hidden />}
        {state === "ok" ? "Copied" : state === "fail" ? "Copy failed" : label}
      </Button>
      <span className="sr-only" aria-live="polite">
        {state === "ok" ? "Copied to clipboard" : state === "fail" ? "Could not copy. Select the text and copy it manually." : ""}
      </span>
    </>
  );
}

export function DownloadButton({
  text,
  filename,
  label = "Download",
  iconOnly,
}: {
  text: string;
  filename: string;
  label?: string;
  iconOnly?: boolean;
}) {
  const [state, flash] = useFlash();
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        disabled={!text}
        aria-label={iconOnly ? `${label} as .txt file` : undefined}
        title={`Save as ${filename}`}
        className={iconOnly ? "w-9 px-0" : undefined}
        onClick={() => {
          downloadText(text, filename);
          flash("ok");
        }}
      >
        {state === "ok" ? <Check className="text-primary" aria-hidden /> : <Download aria-hidden />}
        {!iconOnly && (state === "ok" ? "Saved" : label)}
      </Button>
      <span className="sr-only" aria-live="polite">
        {state === "ok" ? `Downloaded ${filename}` : ""}
      </span>
    </>
  );
}
