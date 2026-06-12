'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Project = {
  id: number; title: string; description: string; tags: string[];
  icon: string; hoverColor: string; published: boolean; image?: string | null;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    setProjects(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      toast.success('Project deleted');
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch { toast.error('Failed to delete'); }
  };

  const handleTogglePublish = async (project: Project) => {
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !project.published }),
      });
      toast.success(project.published ? 'Project hidden' : 'Project published');
      setProjects((prev) => prev.map((p) => p.id === project.id ? { ...p, published: !p.published } : p));
    } catch { toast.error('Failed to update'); }
  };

  const published = projects.filter((p) => p.published).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
            Projects
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>
            {projects.length} project{projects.length !== 1 ? 's' : ''} total â€” manage what appears on your portfolio
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 10,
            background: '#4ade80', color: '#0a0c14',
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
            transition: 'opacity 0.15s', boxShadow: '0 4px 16px rgba(74,222,128,0.3)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
        >
          <i className="fas fa-plus" style={{ fontSize: 11 }} />
          NEW PROJECT
        </Link>
      </div>

      {/* List */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.3)', fontSize: 13, fontFamily: 'monospace', padding: '40px 0' }}>
          <i className="fas fa-circle-notch fa-spin" style={{ color: '#4ade80' }} />
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div style={{ borderRadius: 14, padding: '64px 32px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(74,222,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <i className="fas fa-folder-open" style={{ fontSize: 22, color: 'rgba(74,222,128,0.5)' }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, margin: '0 0 6px' }}>No projects yet</p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, margin: '0 0 24px' }}>Create your first project to showcase your work</p>
          <Link
            href="/admin/projects/new"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: '#4ade80', color: '#0a0c14', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
          >
            <i className="fas fa-plus" style={{ fontSize: 11 }} /> Create First Project
          </Link>
        </div>
      ) : (
        <div style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
                borderBottom: i < projects.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                transition: 'background 0.12s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              {/* Icon box */}
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: `${p.hoverColor}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className={`${p.icon} text-sm`} style={{ color: p.hoverColor, fontSize: 16 }} />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{p.title}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                    background: p.published ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.06)',
                    color: p.published ? '#4ade80' : 'rgba(255,255,255,0.3)',
                    border: `1px solid ${p.published ? 'rgba(74,222,128,0.25)' : 'rgba(255,255,255,0.08)'}`,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    {p.published ? 'Live' : 'Hidden'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.tags.slice(0, 4).map((tag) => (
                    <span key={tag} style={{
                      fontSize: 11, color: 'rgba(255,255,255,0.4)',
                      background: 'rgba(255,255,255,0.06)',
                      padding: '2px 8px', borderRadius: 6,
                    }}>
                      {tag}
                    </span>
                  ))}
                  {p.tags.length > 4 && (
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', padding: '2px 4px' }}>
                      +{p.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <button
                  onClick={() => handleTogglePublish(p)}
                  title={p.published ? 'Hide from portfolio' : 'Publish to portfolio'}
                  style={{
                    width: 34, height: 34, borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: p.published ? '#4ade80' : 'rgba(255,255,255,0.3)',
                    transition: 'all 0.12s', fontSize: 13,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,222,128,0.1)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <i className={`fas ${p.published ? 'fa-eye' : 'fa-eye-slash'}`} />
                </button>
                <Link
                  href={`/admin/projects/${p.id}`}
                  style={{
                    width: 34, height: 34, borderRadius: 8, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
                    transition: 'all 0.12s', fontSize: 13,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <i className="fas fa-pen" />
                </Link>
                <button
                  onClick={() => handleDelete(p.id, p.title)}
                  style={{
                    width: 34, height: 34, borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.3)', transition: 'all 0.12s', fontSize: 13,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f87171'; (e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.1)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <i className="fas fa-trash" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer stats bar */}
      {projects.length > 0 && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16,
        }}>
          {[
            { label: 'TOTAL PROJECTS', value: projects.length, color: '#4ade80' },
            { label: 'PUBLISHED', value: `${published} / ${projects.length}`, color: '#a78bfa' },
            { label: 'HIDDEN', value: projects.length - published, color: 'rgba(255,255,255,0.3)' },
          ].map((s) => (
            <div key={s.label} style={{
              borderRadius: 12, padding: '16px 20px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{ fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 8 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: 'monospace' }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

