'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FormField, Input, Textarea } from '@/components/admin/FormField';
import { SaveButton } from '@/components/admin/SaveButton';

type Service = { id: number; title: string; description: string; icon: string; color: string; order: number };

const defaults = { title: '', description: '', icon: 'fas fa-laptop-code', color: '#4ade80' };
const EM = '#4ade80';

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [form, setForm] = useState(defaults);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetch_ = async () => {
    const res = await fetch('/api/services');
    setItems(await res.json());
  };

  useEffect(() => { fetch_(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast.success('Service added!');
      setForm(defaults);
      fetch_();
    } catch { toast.error('Failed'); } finally { setLoading(false); }
  };

  const handleSaveEdit = async () => {
    if (editId === null) return;
    await fetch(`/api/services/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) });
    toast.success('Updated!');
    setEditId(null);
    fetch_();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const filtered = items.filter((s) =>
    search === '' || s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Page header with search */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>Services</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>
            Services you offer â€” displayed in the &quot;What I Offer&quot; section of your portfolio
          </p>
        </div>
        {/* Search services */}
        <div style={{ position: 'relative', flexShrink: 0, width: 220 }}>
          <i className="fas fa-magnifying-glass" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'rgba(255,255,255,0.25)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', height: 36, paddingLeft: 32, paddingRight: 12,
              borderRadius: 9, border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 12,
              outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.15s',
            }}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = `${EM}40`; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
          />
        </div>
      </div>

      {/* Split layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

        {/* LEFT: Services list */}
        <div style={{
          borderRadius: 14,
          background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)',
          position: 'relative',
        }}>
          {/* Glow effect */}
          <div style={{
            position: 'absolute', bottom: -60, right: -40, width: 200, height: 200,
            borderRadius: '50%', background: `radial-gradient(circle, ${EM}12 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: EM, boxShadow: `0 0 6px ${EM}`, flexShrink: 0 }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', flex: 1 }}>
              Services
            </span>
            <span style={{ fontSize: 10, fontFamily: 'monospace', padding: '2px 8px', borderRadius: 6, background: `${EM}15`, color: EM, border: `1px solid ${EM}25` }}>
              {items.length} TOTAL
            </span>
          </div>

          <div style={{ padding: '22px 28px', position: 'relative' }}>
            {filtered.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, textAlign: 'center', padding: '40px 0' }}>
                {search ? 'No services match your search' : 'No services yet â€” add your first one'}
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden',
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${item.color}30`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
                  >
                    {editId === item.id ? (
                      <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                          <Input value={editForm.title ?? item.title} onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))} placeholder="Service title" />
                          <Input value={editForm.icon ?? item.icon} onChange={(e) => setEditForm((f) => ({ ...f, icon: e.target.value }))} placeholder="fas fa-laptop-code" />
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Input value={editForm.color ?? item.color} onChange={(e) => setEditForm((f) => ({ ...f, color: e.target.value }))} placeholder="#4ade80" style={{ flex: 1 }} />
                          <input type="color" value={editForm.color ?? item.color} onChange={(e) => setEditForm((f) => ({ ...f, color: e.target.value }))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', flexShrink: 0 }} />
                        </div>
                        <Textarea rows={2} value={editForm.description ?? item.description} onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))} placeholder="Description" />
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          <SaveButton variant="ghost" size="sm" type="button" label="Cancel" onClick={() => setEditId(null)} />
                          <SaveButton variant="success" size="sm" type="button" label="Save" onClick={handleSaveEdit} />
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{
                          width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                          background: `${item.color}15`,
                          boxShadow: `0 0 20px ${item.color}20`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <i className={`${item.icon}`} style={{ color: item.color, fontSize: 15 }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 6px' }}>{item.title}</h3>
                          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>{item.description}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                          <button onClick={() => { setEditId(item.id); setEditForm(item); }} style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: 11, transition: 'all 0.12s' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = EM; (e.currentTarget as HTMLElement).style.background = `${EM}15`; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                            <i className="fas fa-pen" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: 11, transition: 'all 0.12s' }}
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
            )}
          </div>
        </div>

        {/* RIGHT: Add Service */}
        <div style={{ borderRadius: 14, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: -60, left: -40, width: 180, height: 180,
            borderRadius: '50%', background: `radial-gradient(circle, ${EM}10 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <i className="fas fa-plus-circle" style={{ color: EM, fontSize: 14 }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              Add Service
            </span>
          </div>

          <form onSubmit={handleAdd} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <FormField label="Title" required>
                <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Web Development" required />
              </FormField>
              <FormField label="Icon Class" required>
                <Input value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} placeholder="fas fa-laptop-code" required />
              </FormField>
            </div>
            <FormField label="Accent Color">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Input value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))} placeholder="#4ade80" style={{ flex: 1 }} />
                <input type="color" value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))} style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', flexShrink: 0 }} />
                <div style={{ width: 40, height: 40, borderRadius: 10, background: form.color, flexShrink: 0, boxShadow: `0 0 12px ${form.color}40` }} />
              </div>
            </FormField>
            <FormField label="Description" required>
              <Textarea rows={5} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="What this service entails and who it's for..." required />
            </FormField>
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '12px', borderRadius: 10, border: 'none',
              background: EM, color: '#0a0c14', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', transition: 'opacity 0.15s', boxShadow: '0 4px 16px rgba(74,222,128,0.25)',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
              {loading ? <i className="fas fa-circle-notch fa-spin" /> : 'Add Service'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}



