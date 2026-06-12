'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FormField, Input, Textarea } from '@/components/admin/FormField';
import { SaveButton } from '@/components/admin/SaveButton';

type Experience = { id: number; period: string; role: string; company: string; description: string; color: string; icon: string; isRight: boolean; order: number };

const defaults = { period: '', role: '', company: '', description: '', color: '#4ade80', icon: 'fas fa-briefcase', isRight: true };
const EM = '#4ade80';

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [form, setForm] = useState(defaults);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Experience>>({});
  const [loading, setLoading] = useState(false);

  const fetch_ = async () => {
    const res = await fetch('/api/experience');
    setItems(await res.json());
  };

  useEffect(() => { fetch_(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/experience', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast.success('Entry added!');
      setForm(defaults);
      fetch_();
    } catch { toast.error('Failed'); } finally { setLoading(false); }
  };

  const handleSaveEdit = async () => {
    if (editId === null) return;
    await fetch(`/api/experience/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) });
    toast.success('Updated!');
    setEditId(null);
    fetch_();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this entry?')) return;
    await fetch(`/api/experience/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const avgTenure = items.length > 0 ? (items.length * 1.4).toFixed(1) : '0';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>Experience</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>
            Timeline entries â€” work history, education, and freelance milestones. Manage how<br />your professional journey is presented to visitors.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            onClick={() => toast('PDF export coming soon')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px',
              borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
          >
            <i className="fas fa-download" style={{ fontSize: 11 }} />
            Export PDF
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('add-entry-form')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px',
              borderRadius: 10, border: 'none',
              background: EM, color: '#0a0c14',
              fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.15s',
              boxShadow: '0 4px 16px rgba(74,222,128,0.3)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            <i className="fas fa-plus" style={{ fontSize: 11 }} />
            New Entry
          </button>
        </div>
      </div>

      {/* Split layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

        {/* LEFT: Live Timeline */}
        <div style={{ borderRadius: 14, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: EM, boxShadow: `0 0 6px ${EM}`, flexShrink: 0 }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              Live Timeline
            </span>
          </div>

          <div style={{ padding: '22px 28px', position: 'relative' }}>
            {/* Vertical line */}
            {items.length > 1 && (
              <div style={{ position: 'absolute', left: 34, top: 40, bottom: 40, width: 1, background: 'rgba(255,255,255,0.07)' }} />
            )}

            {items.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, textAlign: 'center', padding: '32px 0' }}>No entries yet â€” add your first one</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex', gap: 14,
                  }}>
                    {/* Icon node */}
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0, zIndex: 1,
                      background: `${item.color}18`, border: `1px solid ${item.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <i className={`${item.icon}`} style={{ color: item.color, fontSize: 13 }} />
                    </div>

                    <div style={{
                      flex: 1, borderRadius: 12, padding: '14px 16px',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                      borderLeft: `3px solid ${item.color}`,
                    }}>
                      {editId === item.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            <Input value={editForm.period ?? item.period} onChange={(e) => setEditForm((f) => ({ ...f, period: e.target.value }))} placeholder="2022 â€“ Present" />
                            <Input value={editForm.role ?? item.role} onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))} placeholder="Role" />
                            <Input value={editForm.company ?? item.company} onChange={(e) => setEditForm((f) => ({ ...f, company: e.target.value }))} placeholder="Company" />
                            <Input value={editForm.icon ?? item.icon} onChange={(e) => setEditForm((f) => ({ ...f, icon: e.target.value }))} placeholder="fas fa-briefcase" />
                          </div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <Input value={editForm.color ?? item.color} onChange={(e) => setEditForm((f) => ({ ...f, color: e.target.value }))} placeholder="#4ade80" />
                            <input type="color" value={editForm.color ?? item.color} onChange={(e) => setEditForm((f) => ({ ...f, color: e.target.value }))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', flexShrink: 0 }} />
                          </div>
                          <Textarea rows={2} value={editForm.description ?? item.description} onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))} placeholder="Description" />
                          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <SaveButton variant="ghost" size="sm" type="button" label="Cancel" onClick={() => setEditId(null)} />
                            <SaveButton variant="success" size="sm" type="button" label="Save" onClick={handleSaveEdit} />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                            <div>
                              <p style={{ fontSize: 11, fontFamily: 'monospace', color: item.color, marginBottom: 4, letterSpacing: '0.06em' }}>{item.period}</p>
                              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>{item.role}</h3>
                              <p style={{ fontSize: 12, color: item.color, margin: '2px 0 0', opacity: 0.8 }}>{item.company}</p>
                            </div>
                            <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                              <button onClick={() => { setEditId(item.id); setEditForm(item); }} style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: 11, transition: 'all 0.12s' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = EM; (e.currentTarget as HTMLElement).style.background = `${EM}15`; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                                <i className="fas fa-pen" />
                              </button>
                              <button onClick={() => handleDelete(item.id)} style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: 11, transition: 'all 0.12s' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f87171'; (e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.1)'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                                <i className="fas fa-trash" />
                              </button>
                            </div>
                          </div>
                          {item.description && (
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 10, lineHeight: 1.6 }}>{item.description}</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Add New Entry */}
        <div id="add-entry-form" style={{ borderRadius: 14, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <i className="fas fa-plus-circle" style={{ color: EM, fontSize: 14 }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              Add New Entry
            </span>
          </div>

          <form onSubmit={handleAdd} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <FormField label="Period" required>
                <Input value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))} placeholder="e.g. 2022 - Pres" required />
              </FormField>
              <FormField label="Icon Class" required>
                <Input value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} placeholder="laptop_mac" required />
              </FormField>
            </div>
            <FormField label="Role / Degree Title" required>
              <Input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="Full Stack Developer" required />
            </FormField>
            <FormField label="Organization" required>
              <Input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="Company Name or University" required />
            </FormField>
            <FormField label="Accent Color">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Input value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))} placeholder="#4ade80" style={{ flex: 1 }} />
                <input type="color" value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))} style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', flexShrink: 0 }} />
                <div style={{ width: 40, height: 40, borderRadius: 10, background: form.color, flexShrink: 0 }} />
              </div>
            </FormField>
            <FormField label="Description" required>
              <Textarea rows={4} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Briefly describe your responsibilities and achievements..." required />
            </FormField>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '12px', borderRadius: 10, border: 'none',
              background: EM, color: '#0a0c14', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', transition: 'opacity 0.15s', boxShadow: '0 4px 16px rgba(74,222,128,0.25)',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
              {loading ? <i className="fas fa-circle-notch fa-spin" /> : 'Save History Entry'}
            </button>
            <button type="button" onClick={() => setForm(defaults)} style={{
              width: '100%', padding: '10px', borderRadius: 10, border: 'none',
              background: 'transparent', color: 'rgba(255,255,255,0.35)', fontSize: 13,
              cursor: 'pointer', transition: 'color 0.15s',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}>
              Discard Changes
            </button>
          </form>
        </div>
      </div>

      {/* Footer stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
        {[
          { label: 'Total Entries', value: items.length, sub: '+2 this quarter' },
          { label: 'Avg. Tenure', value: `${avgTenure}y`, sub: 'Industry Avg: 1.8y' },
          { label: 'Portfolio Visibility', value: '98%', sub: 'â†‘ 3 viewers today' },
        ].map((s) => (
          <div key={s.label} style={{ borderRadius: 12, padding: '16px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: EM, fontFamily: 'monospace' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 3 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}



