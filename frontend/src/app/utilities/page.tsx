"use client";
import { useState } from 'react';
import { CaseLower, CaseUpper, Eraser, Loader2, Sparkles, Trash2, Undo2, Wrench } from 'lucide-react';
import { cleanTextWithBackend } from '@/lib/api';
import { countWords } from '@/lib/clipboard';
import { cn } from '@/lib/utils';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { CopyButton, DownloadButton } from '@/components/ui/ActionButtons';
import { inputClass } from '@/components/ui/Field';
import { PageHeader, ToolPage, cardClass } from '@/components/ui/PageHeader';

// Matches the backend limit in routers/text_utils.py
const CLEAN_MAX_CHARS = 10000;

export default function TextUtilities() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  // Text before the last one-click change, so it can be undone
  const [previous, setPrevious] = useState<{ text: string; action: string } | null>(null);

  const wordCount = countWords(text);
  const charCount = text.length;

  const apply = (next: string, action: string) => {
    if (next === text) return;
    setPrevious({ text, action });
    setText(next);
  };

  const handleBackendClean = async () => {
    if (!text.trim()) return;
    if (text.length > CLEAN_MAX_CHARS) {
      setErrorMsg(`Deep clean works on up to ${CLEAN_MAX_CHARS.toLocaleString()} characters. Use Trim spaces instead, or clean the text in parts.`);
      return;
    }
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await cleanTextWithBackend(text);
      apply(res.cleaned_text, 'Deep clean');
    } catch {
      setErrorMsg('Could not reach the UrduMate server, so your text was not changed. Try again in a moment, or use Trim spaces, which works offline.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpperCase = () => apply(text.toUpperCase(), 'UPPERCASE');
  const handleLowerCase = () => apply(text.toLowerCase(), 'lowercase');
  const handleRemoveExtraSpaces = () => {
    const cleaned = text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
    apply(cleaned, 'Trim spaces');
  };

  const empty = !text;

  return (
    <ToolPage>
      <PageHeader
        icon={Wrench}
        title="Text Tools"
        description="Paste your text, then use the buttons to tidy it up. Every change can be undone."
      />

      {errorMsg && (
        <Alert title="Deep clean didn't run" onDismiss={() => setErrorMsg('')} className="mb-4">
          {errorMsg}
        </Alert>
      )}

      <section aria-label="Text editor" className={cardClass}>
        <div role="toolbar" aria-label="Text actions" className="flex flex-wrap items-center gap-2 border-b border-border p-3">
          <Button size="sm" onClick={handleBackendClean} disabled={loading || empty} title="Removes extra spaces and blank lines (runs on the UrduMate server)">
            {loading ? <Loader2 aria-hidden className="animate-spin" /> : <Sparkles aria-hidden />}
            {loading ? 'Cleaning…' : 'Deep clean'}
          </Button>
          <Button size="sm" variant="secondary" onClick={handleRemoveExtraSpaces} disabled={empty} title="Collapse repeated spaces and blank lines">
            <Eraser aria-hidden /> Trim spaces
          </Button>
          <span aria-hidden className="mx-1 hidden h-6 w-px bg-border sm:block" />
          <Button size="sm" variant="secondary" onClick={handleUpperCase} disabled={empty}>
            <CaseUpper aria-hidden /> UPPERCASE
          </Button>
          <Button size="sm" variant="secondary" onClick={handleLowerCase} disabled={empty}>
            <CaseLower aria-hidden /> lowercase
          </Button>

          <div className="ml-auto flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              disabled={!previous}
              onClick={() => {
                if (!previous) return;
                setText(previous.text);
                setPrevious(null);
              }}
              title={previous ? `Undo ${previous.action}` : 'Nothing to undo'}
            >
              <Undo2 aria-hidden /> Undo
            </Button>
            <Button size="sm" variant="danger" onClick={() => apply('', 'Clear')} disabled={empty}>
              <Trash2 aria-hidden /> Clear
            </Button>
          </div>
        </div>

        <div className="p-3">
          <label htmlFor="utility-text" className="sr-only">Your text</label>
          <textarea
            id="utility-text"
            rows={12}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setPrevious(null);
            }}
            placeholder="Paste or type the text you want to clean up…"
            className={cn(inputClass, 'resize-y border-transparent leading-relaxed shadow-none focus:border-primary')}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted tabular-nums">
            <span>Words: <strong className="text-fg">{wordCount.toLocaleString()}</strong></span>
            <span>Characters: <strong className="text-fg">{charCount.toLocaleString()}</strong></span>
            {previous && (
              <span role="status" className="text-xs text-subtle animate-fade-in">
                Applied “{previous.action}”.{' '}
                <button
                  type="button"
                  className="font-semibold text-primary hover:underline"
                  onClick={() => {
                    setText(previous.text);
                    setPrevious(null);
                  }}
                >
                  Undo
                </button>
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <CopyButton text={text} />
            <DownloadButton text={text} filename="UrduMate_Cleaned_Text.txt" label="Download .txt" />
          </div>
        </div>
      </section>
    </ToolPage>
  );
}
