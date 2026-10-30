"use client";
import { useState } from 'react';
import { ArrowRight, Briefcase, Globe2, MessageCircle, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ChoiceGroup } from '@/components/ui/ChoiceGroup';
import { Field, inputClass } from '@/components/ui/Field';
import { PageHeader, ToolPage, cardClass } from '@/components/ui/PageHeader';
import { ResultPanel } from '@/components/ui/ResultPanel';

type Mode = 'english_formal' | 'english_short' | 'clean_roman';

const MODES = [
  { value: 'english_formal', label: 'Formal English', desc: 'For emails and official messages', icon: Briefcase },
  { value: 'english_short', label: 'Short chat reply', desc: 'For Slack or WhatsApp', icon: MessageCircle },
  { value: 'clean_roman', label: 'Polite Roman Urdu', desc: 'Same language, cleaner wording', icon: Smile },
] satisfies { value: Mode; label: string; desc: string; icon: typeof Globe2 }[];

const PRESETS = [
  { label: 'Leave message', text: 'sir kal me office nahi aaskta meri tabiyat theek nahi' },
  { label: 'Running late', text: 'traffic bohat zyada hai 20 min late ho jaunga' },
  { label: 'File sent', text: 'file bhej di hai email par check kar lein' },
];

export default function RomanUrduHelper() {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<Mode>('english_formal');
  const [outputText, setOutputText] = useState('');

  const processRomanUrdu = () => {
    const raw = inputText.toLowerCase().trim();
    if (!raw) return;

    let res = '';

    if (mode === 'english_formal') {
      if (raw.includes('nahi a') || raw.includes('chutti') || raw.includes('bimar') || raw.includes('leave')) {
        res = "Dear Sir/Madam, I am writing to formally request leave for today due to unforeseen personal/medical reasons. I will ensure all urgent responsibilities are updated.";
      } else if (raw.includes('salary') || raw.includes('tankhwah') || raw.includes('paise')) {
        res = "Dear Accounts Team, I hope you are well. Could you kindly provide an update regarding the disbursement status of this month's salary? Thank you.";
      } else if (raw.includes('file bhej di') || raw.includes('check krlo') || raw.includes('email dekh')) {
        res = "Dear Team, I have forwarded the requested document via email. Kindly review it at your convenience and let me know your thoughts.";
      } else if (raw.includes('late') || raw.includes('der')) {
        res = "Good morning. I am held up in unexpected transit and will arrive at the office approximately 20-30 minutes late. Apologies for the inconvenience.";
      } else {
        res = `Formal Workplace Statement:\n"Regarding our ongoing communication, I would like to bring to your attention that: ${inputText.trim()}."`;
      }
    } else if (mode === 'english_short') {
      if (raw.includes('nahi a') || raw.includes('chutti')) {
        res = "Unwell today, taking sick leave. Will stay reachable via call.";
      } else if (raw.includes('file') || raw.includes('check')) {
        res = "Shared the file on email. Please review.";
      } else if (raw.includes('late')) {
        res = "Stuck in traffic. Reaching in 20 mins.";
      } else {
        res = `Quick note: ${inputText.trim()}`;
      }
    } else {
      res = inputText
        .replace(/\bni\b/g, 'nahi')
        .replace(/\bap\b/g, 'aap')
        .replace(/\bkr\b/g, 'kar')
        .replace(/\bhn\b/g, 'hain')
        .replace(/\bplz\b/gi, 'barah-e-karam')
        .replace(/\bthx\b/gi, 'shukriya');
      res = `Mohteram,\n\n${res}\n\nShukriya.`;
    }

    setOutputText(res);
  };

  return (
    <ToolPage>
      <PageHeader
        icon={Globe2}
        title="Roman Urdu Workplace Helper"
        description="Write your message the way you'd text it in Roman Urdu, and get a version that's ready for the office."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            processRomanUrdu();
          }}
          className={cn(cardClass, 'flex flex-col gap-5 p-5 sm:p-6')}
        >
          <ChoiceGroup legend="1. Convert to" name="mode" value={mode} onChange={setMode} choices={MODES} columns={1} />

          <Field label="2. Your message in Roman Urdu" htmlFor="roman-input">
            <textarea
              id="roman-input"
              rows={5}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. sir kal me office nahi aaskta tabiyat kharab hai"
              className={cn(inputClass, 'resize-y leading-relaxed')}
            />
          </Field>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-subtle">Try an example:</span>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setInputText(p.text)}
                className="rounded-full border border-border-strong bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-primary/40 hover:bg-primary-soft hover:text-primary-soft-fg"
              >
                {p.label}
              </button>
            ))}
          </div>

          <Button type="submit" size="lg" disabled={!inputText.trim()} className="w-full">
            Convert <ArrowRight aria-hidden />
          </Button>
        </form>

        <ResultPanel
          title="Office-ready message"
          value={outputText}
          emptyTitle="Your converted message will appear here"
          emptyHint="Type a message or try an example, then press Convert."
          filename="UrduMate_Roman_Urdu.txt"
          footer={outputText ? 'Review names and details before sending.' : null}
        />
      </div>
    </ToolPage>
  );
}
