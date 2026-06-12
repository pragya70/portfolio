'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FormField, Input, Textarea } from '@/components/admin/FormField';
import { SaveButton } from '@/components/admin/SaveButton';

type PersonalForm = {
  name: string; shortName: string; role: string;
  bio1: string; bio2: string; email: string; location: string;
  remoteOk: boolean; available: boolean;
  github: string; linkedin: string; twitter: string;
  statsYears: number; statsProjects: number; statsClients: number;
  taglines: string;
};

const defaults: PersonalForm = {
  name: '', shortName: '', role: '', bio1: '', bio2: '',
  email: '', location: '', remoteOk: true, available: true,
  github: '', linkedin: '', twitter: '',
  statsYears: 3, statsProjects: 20, statsClients: 10,
  taglines: '',
};

const EM = '#4ade80';

function Card({ title, dot, children }: { title: string; dot?: string; children: React.ReactNode }) {
  return (
    <div style={{
      borderRadius: 14,
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '13px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '14px 14px 0 0',
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
          background: dot ?? EM, boxShadow: `0 0 6px ${dot ?? EM}`,
        }} />
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
        }}>
          {title}
        </span>
      </div>
      <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {children}
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        style={{
          width: 36, height: 20, borderRadius: 999, border: 'none', cursor: 'pointer',
          background: checked ? EM : 'rgba(255,255,255,0.12)',
          position: 'relative', transition: 'background 0.2s', flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: 3, left: checked ? 18 : 3, width: 14, height: 14,
          borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
        }} />
      </button>
      <span style={{ fontSize: 13, color: checked ? '#fff' : 'rgba(255,255,255,0.5)' }}>{label}</span>
    </label>
  );
}

export default function PersonalPage() {
  const [form, setForm] = useState<PersonalForm>(defaults);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch('/api/personal')
      .then((r) => r.json())
      .then((d) => {
        if (d) setForm({
          ...d,
          taglines: Array.isArray(d.taglines) ? d.taglines.join('\n') : d.taglines || '',
          github: d.github || '', linkedin: d.linkedin || '', twitter: d.twitter || '',
        });
      })
      .finally(() => setFetching(false));
  }, []);

  const set = (k: keyof PersonalForm, v: string | boolean | number) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (section: string) => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        taglines: form.taglines.split('\n').map((t) => t.trim()).filter(Boolean),
      };
      const res = await fetch('/api/personal', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast.success(`${section} saved!`);
    } catch {
      toast.error('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.3)', fontSize: 13, fontFamily: 'monospace', padding: '40px 0' }}>
      <i className="fas fa-circle-notch fa-spin" style={{ color: EM }} />
      Loading personal info…
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}>
          Personal Info
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 8, lineHeight: 1.5 }}>
          Configure your primary brand identity. These details control the hero section, about bio,<br />
          stats counter and global social presence across your portfolio.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Row 1: Identity + Bio */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Card title="Identity">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <FormField label="Full Name" required>
                <Input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Pragya Raj Nemkul" required />
              </FormField>
              <FormField label="Short Name" required>
                <Input value={form.shortName} onChange={(e) => set('shortName', e.target.value)} placeholder="Pragya" required />
              </FormField>
            </div>
            <FormField label="Role / Title" required>
              <Input value={form.role} onChange={(e) => set('role', e.target.value)} placeholder="Full Stack Developer" required />
            </FormField>
            <FormField label="Typewriter Taglines" hint="One tagline per line — cycles through these in the hero animation">
              <Textarea
                rows={4} value={form.taglines}
                onChange={(e) => set('taglines', e.target.value)}
                placeholder={"Full Stack Developer.\nReact Specialist.\nUI/UX Enthusiast."}
              />
            </FormField>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
              <button
                type="button"
                onClick={() => setForm(defaults)}
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Discard Changes
              </button>
              <SaveButton loading={loading} label="Save Identity" icon="fas fa-check" onClick={() => handleSubmit('Identity')} />
            </div>
          </Card>

          <Card title="Bio" dot="#a78bfa">
            <FormField label="Bio Paragraph 1" required hint="Shown in the hero section and about section">
              <Textarea rows={4} value={form.bio1} onChange={(e) => set('bio1', e.target.value)} placeholder="Introduction paragraph..." required />
            </FormField>
            <FormField label="Bio Paragraph 2" hint="Second paragraph in the about section">
              <Textarea rows={4} value={form.bio2} onChange={(e) => set('bio2', e.target.value)} placeholder="Skills and passion overview..." />
            </FormField>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, bio1: '', bio2: '' }))}
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Discard Changes
              </button>
              <SaveButton loading={loading} label="Save Bio" icon="fas fa-check" onClick={() => handleSubmit('Bio')} />
            </div>
          </Card>
        </div>

        {/* Row 2: Contact + Social */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Card title="Contact & Location" dot="#fb7185">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <FormField label="Email" required>
                <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="hello@you.com" required />
              </FormField>
              <FormField label="Location" required>
                <Input value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Kathmandu, Nepal" required />
              </FormField>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              <Toggle label="Remote OK" checked={form.remoteOk} onChange={(v) => set('remoteOk', v)} />
              <Toggle label="Available for projects" checked={form.available} onChange={(v) => set('available', v)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 4 }}>
              <SaveButton loading={loading} label="Save Contact" icon="fas fa-check" onClick={() => handleSubmit('Contact')} />
            </div>
          </Card>

          <Card title="Social Links" dot="#fbbf24">
            <FormField label="GitHub URL">
              <Input value={form.github} onChange={(e) => set('github', e.target.value)} placeholder="https://github.com/username" />
            </FormField>
            <FormField label="LinkedIn URL">
              <Input value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
            </FormField>
            <FormField label="Twitter / X URL">
              <Input value={form.twitter} onChange={(e) => set('twitter', e.target.value)} placeholder="https://twitter.com/username" />
            </FormField>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 4 }}>
              <SaveButton loading={loading} label="Save Socials" icon="fas fa-check" onClick={() => handleSubmit('Socials')} />
            </div>
          </Card>
        </div>

        {/* Row 3: Stats Counter */}
        <Card title="Stats Counter" dot="#4ade80">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <FormField label="Years Experience">
              <Input type="number" min={0} value={form.statsYears} onChange={(e) => set('statsYears', Number(e.target.value))} />
            </FormField>
            <FormField label="Projects Done">
              <Input type="number" min={0} value={form.statsProjects} onChange={(e) => set('statsProjects', Number(e.target.value))} />
            </FormField>
            <FormField label="Happy Clients">
              <Input type="number" min={0} value={form.statsClients} onChange={(e) => set('statsClients', Number(e.target.value))} />
            </FormField>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 4 }}>
            <SaveButton loading={loading} label="Save Stats" icon="fas fa-check" onClick={() => handleSubmit('Stats')} />
          </div>
        </Card>

      </div>
    </div>
  );
}
