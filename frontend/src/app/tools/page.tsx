"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeftRight, Cpu, Languages, Loader2, Trash2, Zap } from 'lucide-react';
import { translateWithBackend } from '@/lib/api';
import { countWords } from '@/lib/clipboard';
import { cn } from '@/lib/utils';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { CopyButton, DownloadButton } from '@/components/ui/ActionButtons';
import { PageHeader, ToolPage, cardClass } from '@/components/ui/PageHeader';
import { selectClass } from '@/components/ui/Field';

// Matches the backend limit in routers/translate.py
const INSTANT_MAX_CHARS = 5000;

const LANGS = [
  { value: 'en', label: 'English' },
  { value: 'ur', label: 'Urdu (اردو)' },
];

const ENGINES = [
  { value: 'instant', label: 'Instant', desc: 'Fast, uses an online service', icon: Zap },
  { value: 'browser_ai', label: 'In-Browser AI', desc: 'Private, runs on your device', icon: Cpu },
] as const;

export default function Workspace() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'instant' | 'browser_ai'>('instant');
  const [status, setStatus] = useState<'idle' | 'loading-model' | 'translating'>('idle');
  const [progressMsg, setProgressMsg] = useState('');
  const [progressPct, setProgressPct] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [clearedText, setClearedText] = useState<string | null>(null);

  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ur');

  const worker = useRef<Worker | null>(null);

  // Initialize Web Worker for Browser AI
  useEffect(() => {
    if (typeof window !== 'undefined' && !worker.current) {
      try {
        worker.current = new Worker(new URL('/worker.js', window.location.origin), {
          type: 'module'
        });

        worker.current.onmessage = (e) => {
          const { status: workerStatus, result, data, error } = e.data;

          if (workerStatus === 'progress') {
            setStatus('loading-model');
            if (data?.file) {
              const pct = data.progress ? Math.round(data.progress) : 0;
              setProgressPct(pct);
              setProgressMsg(`Downloading AI model (first time only): ${data.file.split('/').pop()}`);
            }
          } else if (workerStatus === 'loading') {
            setStatus('translating');
            setProgressPct(null);
            setProgressMsg('Translating on your device…');
          } else if (workerStatus === 'complete') {
            setOutputText(result);
            setStatus('idle');
            setProgressMsg('');
            setProgressPct(null);
          } else if (workerStatus === 'error') {
            setErrorMsg(`The in-browser AI model could not finish (${error}). Try again, or switch to the Instant engine.`);
            setStatus('idle');
            setProgressMsg('');
            setProgressPct(null);
          }
        };

        worker.current.onerror = (err) => {
          console.error("Worker error:", err);
          setErrorMsg("The in-browser AI engine could not start in this browser. Switch to the Instant engine to keep translating.");
          setStatus('idle');
          setProgressMsg('');
          setProgressPct(null);
        };
      } catch (err) {
        console.error("Worker init error:", err);
      }
    }

    return () => {
      worker.current?.terminate();
      worker.current = null;
    };
  }, []);

  const overLimit = mode === 'instant' && inputText.length > INSTANT_MAX_CHARS;
  const busy = status !== 'idle';

  const handleProcess = useCallback(async () => {
    if (!inputText.trim() || overLimit) return;
    setErrorMsg('');

    // MODE 1: Fast Backend Engine (Instant response)
    if (mode === 'instant') {
      setStatus('translating');
      setProgressMsg('Translating…');
      try {
        const result = await translateWithBackend(inputText, sourceLang, targetLang);
        setOutputText(result);
      } catch (err) {
        // fetch() throws TypeError when the server can't be reached at all
        setErrorMsg(
          err instanceof TypeError
            ? 'Could not reach the translation server. Check your internet connection and try again, or switch to the In-Browser AI engine.'
            : (err as Error).message || 'Translation failed. Please try again.'
        );
      } finally {
        setStatus('idle');
        setProgressMsg('');
      }
      return;
    }

    // MODE 2: In-Browser AI Engine (NLLB-200)
    if (!worker.current) {
      setErrorMsg('The in-browser AI engine is not available in this browser. Switch to the Instant engine.');
      return;
    }
    setStatus('translating');
    setProgressMsg('Starting the AI model…');
    const src = sourceLang === 'en' ? 'eng_Latn' : 'urd_Arab';
    const tgt = targetLang === 'ur' ? 'urd_Arab' : 'eng_Latn';

    worker.current.postMessage({
      type: 'translate',
      text: inputText,
      sourceLang: src,
      targetLang: tgt
    });
  }, [inputText, mode, sourceLang, targetLang, overLimit]);

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    // Carry the translation over as the new input; keep the input if there is nothing to carry
    if (outputText) {
      setInputText(outputText);
      setOutputText('');
    }
  };

  // Two languages only: picking the same one on both sides swaps them
  const changeSource = (v: string) => {
    if (v === targetLang) setTargetLang(sourceLang);
    setSourceLang(v);
  };
  const changeTarget = (v: string) => {
    if (v === sourceLang) setSourceLang(targetLang);
    setTargetLang(v);
  };

  const handleClear = () => {
    if (inputText) setClearedText(inputText);
    setInputText('');
  };

  const isUrduInput = sourceLang === 'ur';
  const isUrduOutput = targetLang === 'ur';
  const targetLabel = LANGS.find((l) => l.value === targetLang)?.label;

  return (
    <ToolPage wide>
      <PageHeader
        icon={Languages}
        title="English ⇄ Urdu Translator"
        description="Choose your languages, type or paste your text, and press Translate. Your translation appears in the second panel."
      />

      {/* Controls */}
      <div className={cn(cardClass, 'mb-4 flex flex-col gap-4 p-4 lg:flex-row lg:items-end lg:justify-between')}>
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2 sm:gap-3 lg:w-[30rem]">
          <div>
            <label htmlFor="source-lang" className="mb-1.5 block text-xs font-medium text-muted">From</label>
            <select id="source-lang" className={selectClass} value={sourceLang} onChange={(e) => changeSource(e.target.value)}>
              {LANGS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
          <Button
            variant="secondary"
            onClick={handleSwap}
            disabled={busy}
            aria-label="Swap languages"
            title="Swap languages (moves the translation into the input)"
            className="h-[46px] w-11 px-0"
          >
            <ArrowLeftRight aria-hidden />
          </Button>
          <div>
            <label htmlFor="target-lang" className="mb-1.5 block text-xs font-medium text-muted">To</label>
            <select id="target-lang" className={selectClass} value={targetLang} onChange={(e) => changeTarget(e.target.value)}>
              {LANGS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
        </div>

        {/* Engine toggle */}
        <fieldset>
          <legend className="mb-1.5 block text-xs font-medium text-muted">Translation engine</legend>
          <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface-2 p-1">
            {ENGINES.map((eng) => {
              const Icon = eng.icon;
              const active = mode === eng.value;
              return (
                <label
                  key={eng.value}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring',
                    active ? 'bg-surface text-fg shadow-card ring-1 ring-border' : 'text-muted hover:text-fg'
                  )}
                >
                  <input
                    type="radio"
                    name="engine"
                    value={eng.value}
                    checked={active}
                    onChange={() => setMode(eng.value)}
                    disabled={busy}
                    className="sr-only"
                  />
                  <Icon aria-hidden className={cn('size-4 shrink-0', active ? 'text-primary' : 'text-subtle')} />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-tight">{eng.label}</span>
                    <span className="hidden text-xs leading-tight text-subtle sm:block">{eng.desc}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {mode === 'browser_ai' && (
        <Alert tone="info" className="mb-4">
          In-Browser AI keeps your text on this device. The first translation downloads a large AI model (several hundred MB),
          so it can take a few minutes. Works best on a laptop or desktop.
        </Alert>
      )}

      {errorMsg && (
        <Alert title="Translation didn't work" onDismiss={() => setErrorMsg('')} className="mb-4">
          {errorMsg} Your text has been kept.
        </Alert>
      )}

      {/* Main Workspace */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Source Text Input */}
        <section aria-label="Text to translate" className={cn(cardClass, 'flex flex-col')}>
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <h2 className="text-sm font-semibold text-fg">{isUrduInput ? 'Urdu' : 'English'} text</h2>
            <Button
              variant="danger"
              size="sm"
              onClick={handleClear}
              disabled={!inputText || busy}
              aria-label="Clear input text"
            >
              <Trash2 aria-hidden /> Clear
            </Button>
          </div>

          <textarea
            id="source-text"
            aria-label="Text to translate"
            className={cn(
              'min-h-64 w-full flex-1 resize-y bg-transparent px-4 py-3 text-fg focus:outline-none md:min-h-80',
              isUrduInput ? 'font-urdu text-lg leading-[2.2]' : 'text-base leading-relaxed'
            )}
            dir={isUrduInput ? 'rtl' : 'ltr'}
            lang={isUrduInput ? 'ur' : 'en'}
            placeholder={isUrduInput ? 'یہاں اردو متن لکھیں یا پیسٹ کریں…' : 'Type or paste English text here…'}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (clearedText !== null) setClearedText(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                if (!busy) handleProcess();
              }
            }}
          />

          {clearedText !== null && (
            <div role="status" className="mx-4 mb-2 flex items-center justify-between gap-3 rounded-lg bg-surface-2 px-3 py-2 text-sm text-muted animate-fade-in">
              Text cleared.
              <button
                type="button"
                className="font-semibold text-primary hover:underline"
                onClick={() => {
                  setInputText(clearedText);
                  setClearedText(null);
                }}
              >
                Undo
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
            <div className="text-xs text-subtle tabular-nums">
              <span className={cn(overLimit && 'font-semibold text-danger')}>
                {inputText.length.toLocaleString()}
                {mode === 'instant' && ` / ${INSTANT_MAX_CHARS.toLocaleString()}`} characters
              </span>
              <span className="mx-1.5">·</span>
              {countWords(inputText)} words
              {overLimit && <p className="mt-0.5 text-danger">Too long for the Instant engine. Shorten the text or split it.</p>}
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-subtle lg:inline">
                <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-sans">Ctrl</kbd> +{' '}
                <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-sans">Enter</kbd>
              </span>
              <Button onClick={handleProcess} disabled={busy || !inputText.trim() || overLimit} className="min-w-32">
                {busy ? (
                  <>
                    <Loader2 aria-hidden className="animate-spin" />
                    <span>Translating…</span>
                  </>
                ) : (
                  'Translate'
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* Target Text Output */}
        <section aria-label="Translation" aria-busy={busy} className={cn(cardClass, 'flex flex-col')}>
          <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
            <h2 className="text-sm font-semibold text-fg">{isUrduOutput ? 'Urdu' : 'English'} translation</h2>
            <div className="flex gap-2">
              <CopyButton text={outputText} />
              <DownloadButton text={outputText} filename="UrduMate_Translation.txt" iconOnly />
            </div>
          </div>

          <div className="relative flex min-h-64 flex-1 flex-col md:min-h-80">
            {busy ? (
              <div className="flex flex-1 flex-col gap-3 px-4 py-4" aria-hidden>
                {[92, 78, 85, 60].map((w) => (
                  <div key={w} className="h-4 rounded bg-surface-2 animate-shimmer" style={{ width: `${w}%` }} />
                ))}
              </div>
            ) : outputText ? (
              <textarea
                aria-label={`Translation in ${targetLabel}`}
                className={cn(
                  'w-full flex-1 resize-none bg-transparent px-4 py-3 text-fg focus:outline-none animate-fade-in',
                  isUrduOutput ? 'font-urdu text-xl leading-[2.3]' : 'text-base leading-relaxed'
                )}
                dir={isUrduOutput ? 'rtl' : 'ltr'}
                lang={isUrduOutput ? 'ur' : 'en'}
                value={outputText}
                readOnly
              />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-10 text-center">
                <div className="flex size-10 items-center justify-center rounded-full bg-surface-2 text-subtle">
                  <Languages aria-hidden className="size-5" />
                </div>
                <p className="text-sm font-medium text-fg">Your translation will appear here</p>
                <p className="max-w-xs text-sm text-muted">Enter some text and press Translate.</p>
              </div>
            )}
          </div>

          <div className="border-t border-border px-4 py-3 text-xs text-subtle" aria-live="polite">
            {busy ? (
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2 text-muted">
                  <Loader2 aria-hidden className="size-3.5 animate-spin text-primary" />
                  {progressMsg}
                  {status === 'loading-model' && progressPct !== null && <span className="tabular-nums">({progressPct}%)</span>}
                </span>
                {status === 'loading-model' && progressPct !== null && (
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-label="Model download progress" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${progressPct}%` }} />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-between gap-2 tabular-nums">
                <span>{outputText ? 'Done. Review the translation before using it.' : 'Waiting for input'}</span>
                <span>{countWords(outputText)} words</span>
              </div>
            )}
          </div>
        </section>
      </div>
    </ToolPage>
  );
}
