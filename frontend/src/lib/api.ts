const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export interface CleanTextResponse {
  original_length: number;
  cleaned_text: string;
  word_count: number;
  char_count: number;
}

export interface Template {
  id: string;
  category: string;
  title: string;
  content: string;
}

// 1. Text Cleaning API
export async function cleanTextWithBackend(text: string): Promise<CleanTextResponse> {
  const res = await fetch(`${BACKEND_URL}/api/text/clean`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error('Failed to clean text on backend');
  }

  return res.json();
}

// 2. Templates API
export async function fetchTemplates(): Promise<Template[]> {
  const res = await fetch(`${BACKEND_URL}/api/templates/`);
  if (!res.ok) {
    throw new Error('Failed to fetch templates');
  }
  const data = await res.json();
  return data.templates;
}

// 3. Fast Translation API
export async function translateWithBackend(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const res = await fetch(`${BACKEND_URL}/api/translate/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      source_lang: sourceLang,
      target_lang: targetLang,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Backend translation request failed');
  }

  const data = await res.json();
  return data.translated_text;
}