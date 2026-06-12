'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

type NavItem = { href: string; label: string; icon: string; exact?: boolean; badge?: boolean };

const NAV: NavItem[] = [
  { href: '/admin',           label: 'Dashboard',    icon: 'fas fa-chart-pie',           exact: true },
  { href: '/admin/personal',  label: 'Personal Info', icon: 'fas fa-user' },
  { href: '/admin/projects',  label: 'Projects',      icon: 'fas fa-folder-open' },
  { href: '/admin/skills',    label: 'Skills',        icon: 'fas fa-bolt' },
  { href: '/admin/experience',label: 'Experience',    icon: 'fas fa-briefcase' },
  { href: '/admin/services',  label: 'Services',      icon: 'fas fa-gem' },
  { href: '/admin/messages',  label: 'Messages',      icon: 'fas fa-inbox', badge: true },
  { href: '/admin/seo',       label: 'SEO',           icon: 'fas fa-magnifying-glass' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    fetch('/api/contact?unread=true')
      .then((r) => r.json())
      .then((d) => setUnread(Array.isArray(d) ? d.length : 0))
      .catch(() => {});
  }, []);

  return (
    <aside style={{
      width: 210,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#0a0c14',
      borderRight: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Brand */}
      <div style={{ padding: '20px 18px 16px', flexShrink: 0 }}>
        <Link href="/admin" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#4ade80', letterSpacing: '-0.02em', lineHeight: 1 }}>
            Portfolio Admin
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
            Managing Portfolio
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '4px 10px' }}>
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 8,
                marginBottom: 2,
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                textDecoration: 'none',
                transition: 'all 0.12s',
                color: active ? '#4ade80' : 'rgba(255,255,255,0.5)',
                background: active ? 'rgba(74,222,128,0.1)' : 'transparent',
                borderLeft: active ? '2px solid #4ade80' : '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }
              }}
            >
              <i className={item.icon} style={{ fontSize: 13, width: 16, textAlign: 'center', flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && unread > 0 && (
                <span style={{
                  height: 16, minWidth: 16, padding: '0 4px', borderRadius: 999,
                  fontSize: 9, fontWeight: 700, color: '#fff', background: '#4ade80',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom area */}
      <div style={{ padding: '10px', flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* View Live Site */}
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '9px 12px', borderRadius: 10, marginBottom: 4,
            border: '1px solid rgba(74,222,128,0.35)', fontSize: 12, fontWeight: 600,
            color: '#4ade80', textDecoration: 'none', transition: 'all 0.15s',
            background: 'rgba(74,222,128,0.06)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,222,128,0.14)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,222,128,0.06)'; }}
        >
          <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: 10 }} />
          View Live Site
        </Link>

        {/* Settings + Logout row */}
        <div style={{ display: 'flex', gap: 4 }}>
          <Link
            href="/admin/seo"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px',
              borderRadius: 8, fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
              transition: 'all 0.12s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
          >
            <i className="fas fa-gear" style={{ fontSize: 12 }} />
            <span>Settings</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px',
              borderRadius: 8, fontSize: 12, color: 'rgba(255,255,255,0.4)',
              background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.12s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f87171'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
          >
            <i className="fas fa-arrow-right-from-bracket" style={{ fontSize: 12 }} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
