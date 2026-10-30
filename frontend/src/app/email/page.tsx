"use client";
import { useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ChoiceGroup } from '@/components/ui/ChoiceGroup';
import { Field, inputClass, selectClass } from '@/components/ui/Field';
import { PageHeader, ToolPage, cardClass } from '@/components/ui/PageHeader';
import { ResultPanel } from '@/components/ui/ResultPanel';

export default function EmailWriter() {
  const [purpose, setPurpose] = useState('sick_leave');
  const [recipient, setRecipient] = useState('Manager');
  const [senderName, setSenderName] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [tone, setTone] = useState<'professional' | 'polite'>('professional');
  const [generatedEmail, setGeneratedEmail] = useState('');

  const generateEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const name = senderName.trim() || '[Your Name]';
    let subject = '';
    let body = '';

    if (purpose === 'sick_leave') {
      subject = `Sick Leave Application - ${name}`;
      body = `Dear ${recipient},\n\nI am writing to inform you that I am unwell today and unable to attend work. ${keyPoints ? `Specifically: ${keyPoints}.` : ''}\n\nI will keep you updated regarding my recovery and resume duties as soon as possible. In case of urgent queries, please reach out via phone.\n\nThank you for understanding.\n\nWarm regards,\n${name}`;
    } else if (purpose === 'job_followup') {
      subject = `Following Up on Job Application - ${name}`;
      body = `Dear ${recipient},\n\nI hope you are doing well.\n\nI am following up on my recent application for the open position at your company. ${keyPoints ? keyPoints : 'I remain very enthusiastic about the opportunity to contribute to your team.'}\n\nPlease let me know if any further documents or information are needed from my side.\n\nBest regards,\n${name}`;
    } else if (purpose === 'meeting_request') {
      subject = `Meeting Request: Discussion regarding project updates`;
      body = `Dear ${recipient},\n\nI would like to request a brief meeting with you to discuss our upcoming milestones. ${keyPoints ? `Key agenda: ${keyPoints}.` : ''}\n\nPlease let me know a convenient time slot that works best for your schedule.\n\nBest regards,\n${name}`;
    } else {
      subject = `Regarding: Important Update`;
      body = `Dear ${recipient},\n\nI hope this email finds you well.\n\n${keyPoints || 'I am writing to share an important update regarding our ongoing work.'}\n\nPlease feel free to contact me if you have any questions.\n\nSincerely,\n${name}`;
    }

    if (tone === 'polite') {
      body = body.replace('I would like to request', 'Could you kindly consider');
    }

    setGeneratedEmail(`Subject: ${subject}\n\n${body}`);
  };

  return (
    <ToolPage>
      <PageHeader
        icon={Mail}
        title="Professional Email Writer"
        description="Pick the type of email, add a few details, and get a complete email with a subject line."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={generateEmail} className={cn(cardClass, 'flex flex-col gap-5 p-5 sm:p-6')}>
          <Field label="Email type" htmlFor="purpose">
            <select id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} className={selectClass}>
              <option value="sick_leave">Sick leave application</option>
              <option value="job_followup">Job application follow-up</option>
              <option value="meeting_request">Meeting request</option>
              <option value="general">General office update</option>
            </select>
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Send to" htmlFor="recipient" hint="Manager, HR Team, Mr. Ahmed…">
              <input
                id="recipient"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Mr. Ahmed"
                className={inputClass}
              />
            </Field>

            <Field label="Your full name" htmlFor="sender-name" optional>
              <input
                id="sender-name"
                type="text"
                autoComplete="name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Muhammad Ali"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Key points or details" htmlFor="key-points" optional>
            <textarea
              id="key-points"
              rows={3}
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder="e.g. visiting the clinic today, report already submitted"
              className={cn(inputClass, 'resize-y')}
            />
          </Field>

          <ChoiceGroup
            legend="Tone"
            name="tone"
            value={tone}
            onChange={setTone}
            choices={[
              { value: 'professional', label: 'Professional', desc: 'Clear and direct' },
              { value: 'polite', label: 'Polite', desc: 'Softer, more courteous' },
            ]}
          />

          <Button type="submit" size="lg" className="w-full">
            <Sparkles aria-hidden /> Write my email
          </Button>
        </form>

        <ResultPanel
          title="Your email"
          value={generatedEmail}
          emptyTitle="Your email will appear here"
          emptyHint="Choose an email type, add details, and press Write my email."
          filename="UrduMate_Email.txt"
          minHeight="min-h-[380px]"
          footer={generatedEmail ? 'Check names and dates before sending.' : null}
        />
      </div>
    </ToolPage>
  );
}
