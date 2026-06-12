'use client';

import Link from 'next/link';

type Stat = {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  href: string;
  sub: string;
  badge?: string;
  badgeColor?: string;
};

type QuickLink = {
  href: string;
  label: string;
  icon: string;
  desc: string;
  color: string;
};

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {stats.map((s) => (
        <Link
          key={s.label}
          href={s.href}
          style={{
            borderRadius: 12, padding: '18px 20px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            textDecoration: 'none', display: 'block', transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = `${s.color}40`;
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
          }}
        >
          {/* Top row: icon + badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${s.color}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className={s.icon} style={{ color: s.color, fontSize: 14 }} />
            </div>
            {s.badge && (
              <span style={{
                fontSize: 9, fontWeight: 700, padding: '3px 7px', borderRadius: 999,
                background: `${s.badgeColor ?? s.color}18`,
                color: s.badgeColor ?? s.color,
                border: `1px solid ${s.badgeColor ?? s.color}30`,
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {s.badge}
              </span>
            )}
          </div>

          {/* Value */}
          <div style={{ fontSize: 30, fontWeight: 800, color: s.color, lineHeight: 1, fontFamily: 'monospace', letterSpacing: '-0.02em' }}>
            {s.value}
          </div>

          {/* Label */}
          <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {s.label}
          </div>

          {/* Sub */}
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 3 }}>
            {s.sub}
          </div>
        </Link>
      ))}
    </div>
  );
}

export function QuickLinks({ links }: { links: QuickLink[] }) {
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
      {links.map((l, i) => (
        <Link
          key={l.href}
          href={l.href}
          style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
            borderBottom: i < links.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            textDecoration: 'none', background: 'transparent', transition: 'background 0.12s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: `${l.color}12`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <i className={l.icon} style={{ color: l.color, fontSize: 14 }} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1 }}>{l.label}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {l.desc}
            </div>
          </div>

          <i className="fas fa-chevron-right" style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
        </Link>
      ))}
    </div>
  );
}
