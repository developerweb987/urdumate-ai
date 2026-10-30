import Link from "next/link";
import {
  ArrowLeftRight,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Copy,
  Cpu,
  Lock,
  MousePointerClick,
  PenLine,
  ShieldCheck,
  UserX,
  Zap,
} from "lucide-react";
import { TOOLS, TOOL_GROUPS } from "@/lib/tools";
import { buttonClass } from "@/components/ui/Button";

const highlights = ["Free to use", "No sign-up needed", "English, Urdu & Roman Urdu"];

const steps = [
  {
    icon: MousePointerClick,
    title: "Pick a tool",
    desc: "Translate, polish a draft, write an email, or start from a template.",
  },
  {
    icon: PenLine,
    title: "Type or paste your text",
    desc: "Choose a language, tone, or format. Each tool tells you what it needs.",
  },
  {
    icon: Copy,
    title: "Review, copy, or download",
    desc: "Check the result, fill in any [placeholders], then copy it or save it as a .txt file.",
  },
];

const privacyPoints = [
  {
    icon: UserX,
    title: "No account, no paywall",
    desc: "Every tool is free and works without signing up or entering a card.",
  },
  {
    icon: Lock,
    title: "Writing tools run on your device",
    desc: "The Polisher, Email Writer, Proposals, and Roman Urdu helper build your text in the browser. Nothing you type is sent anywhere.",
  },
  {
    icon: ShieldCheck,
    title: "You choose how translation runs",
    desc: "The Instant engine sends text to the UrduMate server, which uses an online translation service. The In-Browser AI engine keeps text on your device.",
  },
];

const faqs = [
  {
    q: "Is UrduMate AI really free?",
    a: "Yes. All tools are free to use and do not require an account.",
  },
  {
    q: "Which tools use AI?",
    a: "The Translator offers two engines: an Instant engine powered by an online translation service, and an In-Browser AI engine that runs the open NLLB-200 translation model on your own device. The writing tools (Polisher, Email Writer, Proposals, Roman Urdu helper) use built-in templates and rules, so always read and adjust the result before sending it.",
  },
  {
    q: "Is my text saved or shared?",
    a: "UrduMate does not save your text. The writing tools work entirely in your browser. When you use the Instant translation engine, your text is sent to the UrduMate server and passed to an online translation service to produce the result. Use the In-Browser AI engine if you prefer to keep text on your device.",
  },
  {
    q: "Why is the In-Browser AI engine slow the first time?",
    a: "It downloads a large translation model (several hundred MB) the first time you use it. After that, your browser can reuse it and translation runs locally. For quick results, use the Instant engine.",
  },
  {
    q: "Can I use it on my phone?",
    a: "Yes. Every tool works on phones and tablets. The In-Browser AI engine needs a lot of memory and works best on a laptop or desktop.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_0%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-24">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-soft-fg">
              Pakistan&rsquo;s free bilingual writing assistant
            </p>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-fg text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              Write and translate in English &amp; Urdu, <span className="text-primary">without the hassle.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg lg:mx-0">
              Translate between English and Urdu, turn Roman Urdu into office-ready English, and draft emails, proposals,
              and cover letters. Made for students, freelancers, office teams, and job seekers in Pakistan.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <Link href="/tools" className={buttonClass({ size: "lg" })}>
                Start translating <ArrowRight aria-hidden />
              </Link>
              <Link href="#tools" className={buttonClass({ size: "lg", variant: "secondary" })}>
                See all tools
              </Link>
            </div>

            <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted lg:justify-start">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 aria-hidden className="size-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Workspace preview (illustrative example) */}
          <figure className="mx-auto w-full max-w-xl lg:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-raised">
              <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-2 px-4 py-2.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-fg">
                  English
                  <ArrowLeftRight aria-hidden className="size-3.5 text-subtle" />
                  Urdu
                </div>
                <span className="flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-xs font-medium text-muted ring-1 ring-border">
                  <Zap aria-hidden className="size-3 text-primary" /> Instant
                </span>
              </div>
              <div className="grid sm:grid-cols-2">
                <div className="border-b border-border p-5 sm:border-r sm:border-b-0">
                  <p className="mb-2 text-xs font-medium text-subtle">Your text</p>
                  <p className="text-[15px] leading-relaxed text-fg">
                    Please send me the report by Friday. Thank you!
                  </p>
                </div>
                <div className="bg-primary-soft/40 p-5">
                  <p className="mb-2 text-xs font-medium text-subtle">Translation</p>
                  <p dir="rtl" lang="ur" className="font-urdu text-lg leading-[2.1] text-fg">
                    براہ کرم مجھے جمعہ تک رپورٹ بھیج دیں۔ شکریہ!
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-subtle">
                <span>9 words</span>
                <span className="flex items-center gap-1">
                  <Copy aria-hidden className="size-3" /> Copy · Download
                </span>
              </div>
            </div>
            <figcaption className="mt-3 text-center text-xs text-subtle">Example of the Translator workspace</figcaption>
          </figure>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-fg">Everything you need in one place</h2>
          <p className="mt-3 text-muted">Pick a tool to get started. No setup, no sign-up.</p>
        </div>

        <div className="mt-12 space-y-12">
          {TOOL_GROUPS.map((group) => (
            <div key={group.name}>
              <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold text-fg">{group.name}</h3>
                <p className="text-sm text-subtle">{group.blurb}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {TOOLS.filter((t) => t.group === group.name).map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition-[border-color,box-shadow] duration-200 hover:border-primary/40 hover:shadow-raised"
                    >
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <Icon aria-hidden className="size-5" />
                      </div>
                      <h4 className="mt-4 font-semibold text-fg">{tool.title}</h4>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{tool.desc}</p>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Open
                        <ArrowRight
                          aria-hidden
                          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-fg">How it works</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="flex gap-4 md:flex-col">
                  <div className="relative flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary">
                    <Icon aria-hidden className="size-5" />
                    <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-fg">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-fg">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Privacy & free usage */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-fg">Free, private, and clear about it</h2>
          <p className="mt-3 text-muted">Here is exactly what happens to the text you enter.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {privacyPoints.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="rounded-2xl border border-border bg-surface p-6 shadow-card">
                <Icon aria-hidden className="size-6 text-primary" />
                <h3 className="mt-4 font-semibold text-fg">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-subtle">
          <Cpu aria-hidden className="size-4 shrink-0" />
          Want translation fully offline? Switch the Translator to <strong className="font-semibold text-muted">In-Browser AI</strong>.
        </p>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-fg">Frequently asked questions</h2>
          <div className="mt-10 divide-y divide-border rounded-2xl border border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="-mx-5 flex items-center justify-between gap-4 rounded-2xl px-5 py-4 font-medium text-fg">
                  {f.q}
                  <ChevronDown
                    aria-hidden
                    className="size-5 shrink-0 text-subtle transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg font-semibold text-fg">Ready to write something?</p>
            <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/tools" className={buttonClass({ size: "lg" })}>
                Open the Translator <ArrowRight aria-hidden />
              </Link>
              <Link href="/email" className={buttonClass({ size: "lg", variant: "secondary" })}>
                Write an email
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
