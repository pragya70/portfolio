'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FormField, Input, Textarea } from '@/components/admin/FormField';
import { SaveButton } from '@/components/admin/SaveButton';
import { PageHeader } from '@/components/admin/PageHeader';
import { SectionCard } from '@/components/admin/SectionCard';

type SEO = { title: string; description: string; keywords: string; ogImage: string; twitterHandle: string };

const defaults: SEO = { title: '', description: '', keywords: '', ogImage: '', twitterHandle: '' };

export default function SEOPage() {
  const [form, setForm] = useState<SEO>(defaults);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch('/api/seo').then((r) => r.json()).then((d) => {
      if (d) setForm({ ...defaults, ...d, ogImage: d.ogImage || '', twitterHandle: d.twitterHandle || '' });
    }).finally(() => setFetching(false));
  }, []);

  const set = (k: keyof SEO, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/seo', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast.success('SEO settings saved!');
    } catch { toast.error('Failed to save'); } finally { setLoading(false); }
  };

  if (fetching) return (
    <div className="flex items-center gap-3 text-gray-500 text-sm font-mono animate-pulse">
      <i className="fas fa-circle-notch fa-spin" /> Loadingâ€¦
    </div>
  );

  return (
    <div className="">
      <PageHeader
        title="SEO Settings"
        subtitle="Metadata shown in search engines, browser tabs, and social media previews"
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 2-column grid: metadata left, social right */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        <SectionCard color="#4ade80" label="Page Metadata">
          <div className="space-y-6">
            <FormField label="Page Title" required hint="Shown in browser tab and search results â€” 50â€“60 characters recommended">
              <Input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Pragya Raj Nemkul | Full Stack Developer" required />
            </FormField>
            <FormField label="Meta Description" required hint="Shown in search result snippets â€” 150â€“160 characters recommended">
              <Textarea rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Full Stack Developer specializing in React, Next.js..." required />
            </FormField>
            <FormField label="Keywords" hint="Comma-separated â€” used by some search engines">
              <Input value={form.keywords} onChange={(e) => set('keywords', e.target.value)} placeholder="full stack developer, react, nextjs, nepal" />
            </FormField>
          </div>
        </SectionCard>

        <div className="space-y-8">
        <SectionCard color="#a78bfa" label="Social Preview (Open Graph)">
          <div className="space-y-6">
            <FormField label="OG Image URL" hint="Image shown when shared on social media â€” 1200Ã—630px recommended">
              <Input value={form.ogImage} onChange={(e) => set('ogImage', e.target.value)} placeholder="https://... or /uploads/og-image.png" />
            </FormField>
            {form.ogImage && (
              <div className="rounded-xl overflow-hidden border border-white/10 aspect-[1200/630] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.ogImage} alt="OG preview" className="w-full h-full object-cover" />
              </div>
            )}
            <FormField label="Twitter Handle" hint="Your Twitter/X username â€” without the @">
              <Input value={form.twitterHandle} onChange={(e) => set('twitterHandle', e.target.value)} placeholder="yourhandle" />
            </FormField>
          </div>
        </SectionCard>

        <SectionCard color="#fb7185" label="Search Result Preview">
          <div className="p-5 rounded-xl border border-white/5 space-y-1.5" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <p className="text-[#4ade80] text-sm font-semibold truncate">{form.title || 'Your Page Title'}</p>
            <p className="text-[#4ade80] text-xs font-mono">your-domain.com</p>
            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
              {form.description || 'Your meta description will appear here in search result snippetsâ€¦'}
            </p>
          </div>
        </SectionCard>
        </div>{/* end right column */}
        </div>{/* end 2-col grid */}

        <div className="flex justify-end pt-2">
          <SaveButton loading={loading} label="Save SEO Settings" icon="fas fa-save" />
        </div>
      </form>
    </div>
  );
}


