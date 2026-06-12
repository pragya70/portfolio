'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { Session } from 'next-auth';

const SECTION_LABEL: Record<string, string> = {
  '/admin':            'Dashboard',
  '/admin/personal':   'Personal Info',
  '/admin/projects':   'Projects',
  '/admin/skills':     'Skills',
  '/admin/experience': 'Experience',
  '/admin/services':   'Services',
  '/admin/messages':   'Messages',
  '/admin/seo':        'SEO',
};

export function AdminHeader({ user }: { user: Session['user'] }) {
  const pathname = usePathname();
  const [search, setSearch] = useState('');

  const base = Object.keys(SECTION_LABEL)
    .sort((a, b) => b.length - a.length)
    .find((k) => pathname === k || pathname.startsWith(k + '/'));

  const section = base ? SECTION_LABEL[base] : 'Admin';
  const name = user?.name ?? 'Administrator';
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <header style={{
      height: 52,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 16,
      background: '#0d0f1a',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Left: breadcrumb */}
      <nav style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.08em',
        textTransform: 'uppercase', flexShrink: 0,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 700 }}>Admin</span>
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span>
        <span style={{ color: '#4ade80', fontWeight: 700 }}>{section}</span>
      </nav>

      {/* Center: search */}
      <div style={{ flex: 1, maxWidth: 360, position: 'relative' }}>
        <i className="fas fa-magnifying-glass" style={{
          position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)',
          fontSize: 11, color: 'rgba(255,255,255,0.25)', pointerEvents: 'none',
        }} />
        <input
          type="text"
          placeholder="Search commands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', height: 32, paddingLeft: 32, paddingRight: 12,
            borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 12,
            outline: 'none', transition: 'border-color 0.15s',
            fontFamily: 'inherit',
          }}
          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(74,222,128,0.4)'; }}
          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
        />
      </div>

      {/* Right: icons + user */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
        {/* Bell */}
        <button style={{
          width: 32, height: 32, borderRadius: 8, border: 'none',
          background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: 13, transition: 'all 0.12s',
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
        >
          <i className="fas fa-bell" />
        </button>

        {/* Help */}
        <button style={{
          width: 32, height: 32, borderRadius: 8, border: 'none',
          background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: 13, transition: 'all 0.12s',
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
        >
          <i className="fas fa-circle-question" />
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)', margin: '0 2px' }} />

        {/* User chip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ textAlign: 'right', lineHeight: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{name}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Administrator</div>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #4ade80, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: '#0a0c14', flexShrink: 0,
          }}>
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
