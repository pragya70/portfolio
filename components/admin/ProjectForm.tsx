'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FormField, Input, Textarea } from './FormField';
import { SaveButton } from './SaveButton';
import { SectionCard } from './SectionCard';
import Image from 'next/image';

type ProjectData = {
  title: string; description: string; tags: string; tagColors: string;
  icon: string; gradient: string; hoverColor: string;
  github: string; demo: string; image: string; published: boolean;
};

const defaults: ProjectData = {
  title: '', description: '', tags: '', tagColors: '',
  icon: 'fas fa-code', gradient: 'from-blue-900 to-gray-900', hoverColor: '#00f3ff',
  github: '', demo: '', image: '', published: true,
};

type Props = { initialData?: Partial<ProjectData> & { id?: number } };

export function ProjectForm({ initialData }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<ProjectData>({
    ...defaults,
    ...initialData,
    tags: Array.isArray(initialData?.tags) ? (initialData.tags as unknown as string[]).join(', ') : '',
    tagColors: Array.isArray(initialData?.tagColors) ? (initialData.tagColors as unknown as string[]).join(', ') : '',
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const set = (k: keyof ProjectData, v: string | boolean) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      set('image', data.url);
      toast.success('Image uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        tagColors: form.tagColors.split(',').map((t) => t.trim()).filter(Boolean),
      };
      const url = initialData?.id ? `/api/projects/${initialData.id}` : '/api/projects';
      const method = initialData?.id ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
      toast.success(initialData?.id ? 'Project updated!' : 'Project created!');
      router.push('/admin/projects');
    } catch {
      toast.error('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <SectionCard color="#4ade80" label="Basic Info">
        <FormField label="Project Title" required>
          <Input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="My Awesome Project" required />
        </FormField>
        <FormField label="Description" required hint="2–3 sentences shown on the portfolio card">
          <Textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Brief description of the project..." required />
        </FormField>
        <div className="grid grid-cols-2 gap-6">
          <FormField label="Tags" hint="Comma-separated: React, Node.js">
            <Input value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="React, Node.js, MongoDB" />
          </FormField>
          <FormField label="Tag Colors" hint="Comma-separated hex: #00f3ff, #7000ff">
            <Input value={form.tagColors} onChange={(e) => set('tagColors', e.target.value)} placeholder="#00f3ff, #7000ff" />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard color="#a78bfa" label="Appearance">
        <div className="grid grid-cols-2 gap-6">
          <FormField label="Icon Class" hint="Font Awesome class name">
            <Input value={form.icon} onChange={(e) => set('icon', e.target.value)} placeholder="fas fa-code" />
          </FormField>
          <FormField label="Hover Accent Color">
            <div className="flex gap-2">
              <Input value={form.hoverColor} onChange={(e) => set('hoverColor', e.target.value)} placeholder="#00f3ff" />
              <input
                type="color"
                value={form.hoverColor}
                onChange={(e) => set('hoverColor', e.target.value)}
                className="w-11 h-11 rounded-xl border border-white/10 bg-transparent cursor-pointer flex-shrink-0"
              />
            </div>
          </FormField>
        </div>
        <FormField label="Gradient Classes" hint="Tailwind gradient classes for the card header">
          <Input value={form.gradient} onChange={(e) => set('gradient', e.target.value)} placeholder="from-blue-900 to-gray-900" />
        </FormField>
        <FormField label="Project Image (optional)" hint="Upload or paste a URL — replaces the icon gradient header">
          <div className="space-y-3">
            {form.image && (
              <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10">
                <Image src={form.image} alt="Project" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => set('image', '')}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white text-xs flex items-center justify-center hover:bg-[#f87171]/70 transition-colors"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm disabled:opacity-40"
              >
                {uploading
                  ? <><i className="fas fa-spinner fa-spin text-xs" /> Uploading...</>
                  : <><i className="fas fa-upload text-xs" /> Upload Image</>}
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
            <Input value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="https://... or /uploads/filename.jpg" />
          </div>
        </FormField>
      </SectionCard>

      <SectionCard color="#fbbf24" label="Links & Visibility">
        <div className="grid grid-cols-2 gap-6">
          <FormField label="GitHub Repository URL">
            <Input value={form.github} onChange={(e) => set('github', e.target.value)} placeholder="https://github.com/..." />
          </FormField>
          <FormField label="Live Demo URL">
            <Input value={form.demo} onChange={(e) => set('demo', e.target.value)} placeholder="https://your-demo.com" />
          </FormField>
        </div>
        <label className="flex items-center gap-3 cursor-pointer select-none group">
          <div className="relative">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set('published', e.target.checked)}
              className="w-4 h-4 accent-[#4ade80] rounded"
            />
          </div>
          <div>
            <p className="text-sm text-white font-medium">Published</p>
            <p className="text-xs text-gray-500">Visible on your live portfolio</p>
          </div>
        </label>
      </SectionCard>

      <div className="flex items-center gap-3 justify-end pt-2">
        <SaveButton variant="ghost" type="button" label="Cancel" onClick={() => router.back()} />
        <SaveButton loading={loading} label={initialData?.id ? 'Update Project' : 'Create Project'} icon="fas fa-save" />
      </div>
    </form>
  );
}
