'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FormField, Input } from '@/components/admin/FormField';
import { SaveButton } from '@/components/admin/SaveButton';

type Skill = {
  id: number; name: string; icon: string; color: string;
  skillType: string; percent?: number | null; fromColor?: string | null; toColor?: string | null; order: number;
};

const iconDefaults = { name: '', icon: 'fab fa-react', color: 'text-[#4ade80]', skillType: 'icon' };
const barDefaults = { name: '', icon: '', color: '', skillType: 'bar', percent: 80, fromColor: '#4ade80', toColor: '#059669' };

const EM = '#4ade80';

function ColHeader({ title, count, color }: { title: string; count: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
          {title}
        </span>
      </div>
      <span style={{ fontSize: 10, fontFamily: 'monospace', padding: '2px 8px', borderRadius: 6, background: `${color}15`, color, border: `1px solid ${color}25` }}>
        {count} TOTAL
      </span>
    </div>
  );
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [iconForm, setIconForm] = useState(iconDefaults);
  const [barForm, setBarForm] = useState(barDefaults);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Skill>>({});

  const fetchSkills = async () => {
    const res = await fetch('/api/skills');
    setSkills(await res.json());
  };

  useEffect(() => { fetchSkills(); }, []);

  const icons = skills.filter((s) => s.skillType === 'icon');
  const bars = skills.filter((s) => s.skillType === 'bar');

  const handleAddIcon = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/skills', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(iconForm) });
      if (!res.ok) throw new Error();
      toast.success('Skill added!');
      setIconForm(iconDefaults);
      fetchSkills();
    } catch { toast.error('Failed'); } finally { setLoading(false); }
  };

  const handleAddBar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/skills', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(barForm) });
      if (!res.ok) throw new Error();
      toast.success('Skill bar added!');
      setBarForm(barDefaults);
      fetchSkills();
    } catch { toast.error('Failed'); } finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this skill?')) return;
    await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const handleEdit = async (id: number) => {
    await fetch(`/api/skills/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) });
    toast.success('Updated');
    setEditingId(null);
    fetchSkills();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <i className="fas fa-bolt" style={{ color: EM, fontSize: 18 }} />
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>Skills</h1>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>
          Manage your professional technical stack, visual iconography, and proficiency<br />visualizations for the public portfolio.
        </p>
      </div>

      {/* Two-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

        {/* LEFT: Skill Icons */}
        <div style={{ borderRadius: 14, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <ColHeader title="Skill Icons" count={icons.length} color={EM} />
          <div style={{ padding: '22px 28px' }}>
            {icons.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No skill icons yet</p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: icons.length > 0 ? 16 : 0 }}>
              {icons.map((s) => (
                <div key={s.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'border-color 0.12s',
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
                >
                  {editingId === s.id ? (
                    <>
                      <Input style={{ flex: 1 }} value={editForm.name ?? s.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} placeholder="Name" />
                      <Input style={{ flex: 1 }} value={editForm.icon ?? s.icon} onChange={(e) => setEditForm((f) => ({ ...f, icon: e.target.value }))} placeholder="Icon class" />
                      <SaveButton size="sm" variant="success" type="button" label="Save" onClick={() => handleEdit(s.id)} />
                      <SaveButton size="sm" variant="ghost" type="button" label="Ã—" onClick={() => setEditingId(null)} />
                    </>
                  ) : (
                    <>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className={`${s.icon} ${s.color}`} style={{ fontSize: 14 }} />
                      </div>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#fff' }}>{s.name}</span>
                      <button onClick={() => { setEditingId(s.id); setEditForm(s); }} style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: 11, transition: 'all 0.12s' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = EM; (e.currentTarget as HTMLElement).style.background = `${EM}15`; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                        <i className="fas fa-pen" />
                      </button>
                      <button onClick={() => handleDelete(s.id)} style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: 11, transition: 'all 0.12s' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f87171'; (e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.1)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                        <i className="fas fa-trash" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Add form */}
            <form onSubmit={handleAddIcon} style={{ paddingTop: icons.length > 0 ? 12 : 0, borderTop: icons.length > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>
                Add New Icon Skill
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
                <FormField label="Skill Name">
                  <Input value={iconForm.name} onChange={(e) => setIconForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. React.js" required />
                </FormField>
                <FormField label="FA Icon Class / URL">
                  <Input value={iconForm.icon} onChange={(e) => setIconForm((f) => ({ ...f, icon: e.target.value }))} placeholder="fab fa-react" required />
                </FormField>
                <FormField label="Color Token">
                  <Input value={iconForm.color} onChange={(e) => setIconForm((f) => ({ ...f, color: e.target.value }))} placeholder="text-primary" required />
                </FormField>
              </div>
              <button type="submit" disabled={loading} style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px',
                borderRadius: 9, border: `1px solid ${EM}40`, background: `${EM}15`,
                color: EM, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${EM}25`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${EM}15`; }}>
                <i className="fas fa-plus" style={{ fontSize: 10 }} />
                Add Skill Icon
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: Skill Bars */}
        <div style={{ borderRadius: 14, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <ColHeader title="Skill Bars" count={bars.length} color="#a78bfa" />
          <div style={{ padding: '22px 28px' }}>
            {bars.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No skill bars yet</p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: bars.length > 0 ? 16 : 0 }}>
              {bars.map((s) => (
                <div key={s.id} style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {editingId === s.id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 8 }}>
                        <Input placeholder="Name" value={editForm.name ?? s.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} />
                        <Input type="number" min={0} max={100} value={editForm.percent ?? s.percent ?? 80} onChange={(e) => setEditForm((f) => ({ ...f, percent: Number(e.target.value) }))} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <Input placeholder="From" value={editForm.fromColor ?? s.fromColor ?? ''} onChange={(e) => setEditForm((f) => ({ ...f, fromColor: e.target.value }))} />
                          <input type="color" value={editForm.fromColor ?? s.fromColor ?? '#4ade80'} onChange={(e) => setEditForm((f) => ({ ...f, fromColor: e.target.value }))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', flexShrink: 0 }} />
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <Input placeholder="To" value={editForm.toColor ?? s.toColor ?? ''} onChange={(e) => setEditForm((f) => ({ ...f, toColor: e.target.value }))} />
                          <input type="color" value={editForm.toColor ?? s.toColor ?? '#059669'} onChange={(e) => setEditForm((f) => ({ ...f, toColor: e.target.value }))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', flexShrink: 0 }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <SaveButton variant="ghost" size="sm" type="button" label="Cancel" onClick={() => setEditingId(null)} />
                        <SaveButton variant="success" size="sm" type="button" label="Save" onClick={() => handleEdit(s.id)} />
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{s.name}</span>
                          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>{s.percent}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: 999, width: `${s.percent}%`, background: `linear-gradient(to right, ${s.fromColor}, ${s.toColor})`, boxShadow: `0 0 8px ${s.fromColor}50` }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                        <button onClick={() => { setEditingId(s.id); setEditForm(s); }} style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: 11, transition: 'all 0.12s' }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = EM; (e.currentTarget as HTMLElement).style.background = `${EM}15`; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                          <i className="fas fa-pen" />
                        </button>
                        <button onClick={() => handleDelete(s.id)} style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: 11, transition: 'all 0.12s' }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f87171'; (e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.1)'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                          <i className="fas fa-trash" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add bar â€” dashed new item box */}
            <div
              style={{ borderRadius: 10, border: '1px dashed rgba(255,255,255,0.12)', padding: '22px 28px', cursor: 'pointer', transition: 'border-color 0.15s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,222,128,0.3)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
            >
              <form onSubmit={handleAddBar}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>
                  New Skill Bar
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 8, marginBottom: 10 }}>
                  <FormField label="Name">
                    <Input value={barForm.name} onChange={(e) => setBarForm((f) => ({ ...f, name: e.target.value }))} placeholder="Frontend Development" required />
                  </FormField>
                  <FormField label="%">
                    <Input type="number" min={0} max={100} value={barForm.percent} onChange={(e) => setBarForm((f) => ({ ...f, percent: Number(e.target.value) }))} required />
                  </FormField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Input placeholder="From color" value={barForm.fromColor ?? ''} onChange={(e) => setBarForm((f) => ({ ...f, fromColor: e.target.value }))} />
                    <input type="color" value={barForm.fromColor ?? '#4ade80'} onChange={(e) => setBarForm((f) => ({ ...f, fromColor: e.target.value }))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', flexShrink: 0 }} />
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Input placeholder="To color" value={barForm.toColor ?? ''} onChange={(e) => setBarForm((f) => ({ ...f, toColor: e.target.value }))} />
                    <input type="color" value={barForm.toColor ?? '#059669'} onChange={(e) => setBarForm((f) => ({ ...f, toColor: e.target.value }))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', flexShrink: 0 }} />
                  </div>
                </div>
                <button type="submit" disabled={loading} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  width: '100%', padding: '9px', borderRadius: 9,
                  border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${EM}40`; (e.currentTarget as HTMLElement).style.color = EM; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}>
                  <i className="fas fa-chart-bar" style={{ fontSize: 11 }} />
                  NEW SKILL BAR
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation section */}
      <div style={{ marginTop: 20, borderRadius: 14, padding: '18px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>Documentation</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
            Skill icons are retrieved directly from your global CDN. Use standard Brand Icons or SVG URLs.
            Proficiency bars use a non-linear weight algorithm for realistic skill representation.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: EM, marginBottom: 6 }} />
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Primary<br />Shade</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#1a1d2e', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 6 }} />
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Surface<br />Base</div>
          </div>
        </div>
      </div>
    </div>
  );
}



