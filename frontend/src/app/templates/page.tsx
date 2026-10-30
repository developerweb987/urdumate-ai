"use client";
import { useCallback, useEffect, useState } from 'react';
import { FileText, Inbox, RefreshCw } from 'lucide-react';
import { fetchTemplates, Template } from '@/lib/api';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/ActionButtons';
import { PageHeader, ToolPage, cardClass } from '@/components/ui/PageHeader';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const request = useCallback(() => {
    fetchTemplates()
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setFailed(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    request();
  }, [request]);

  const retry = () => {
    setLoading(true);
    setFailed(false);
    request();
  };

  return (
    <ToolPage>
      <PageHeader
        icon={FileText}
        title="Ready-to-Use Templates"
        description="Copy a template, paste it into your email or document, and replace the [bracketed] parts with your details."
      />

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2" aria-busy="true" aria-label="Loading templates">
          {[0, 1].map((i) => (
            <div key={i} className={`${cardClass} p-5`}>
              <div className="mb-4 h-5 w-20 rounded-full bg-surface-2 animate-shimmer" />
              <div className="mb-4 h-5 w-48 rounded bg-surface-2 animate-shimmer" />
              <div className="h-36 rounded-lg bg-surface-2 animate-shimmer" />
            </div>
          ))}
        </div>
      ) : failed ? (
        <Alert
          title="Templates couldn't be loaded"
          action={
            <Button size="sm" variant="secondary" onClick={retry}>
              <RefreshCw aria-hidden /> Try again
            </Button>
          }
        >
          The UrduMate server didn&rsquo;t respond. Check your connection and try again.
        </Alert>
      ) : templates.length === 0 ? (
        <div className={`${cardClass} flex flex-col items-center gap-2 px-6 py-14 text-center`}>
          <Inbox aria-hidden className="size-8 text-subtle" />
          <p className="font-medium text-fg">No templates available yet</p>
          <p className="text-sm text-muted">Check back later for new letter formats.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {templates.map((tpl) => (
            <article key={tpl.id} className={`${cardClass} flex flex-col p-5`}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-block rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary-soft-fg">
                    {tpl.category}
                  </span>
                  <h2 className="mt-2 font-semibold text-fg">{tpl.title}</h2>
                </div>
                <CopyButton text={tpl.content} />
              </div>
              <pre className="flex-1 whitespace-pre-wrap rounded-lg border border-border bg-surface-2 p-4 font-sans text-sm leading-relaxed text-muted">
                {tpl.content}
              </pre>
            </article>
          ))}
        </div>
      )}
    </ToolPage>
  );
}
