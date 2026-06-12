import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { StatCards, QuickLinks } from '@/components/admin/DashboardClient';

export default async function AdminDashboard() {
  const [projectRes, messageRes, unreadRes, personalRes, lastMessageRes] = await Promise.all([
    supabase.from('Project').select('*', { count: 'exact', head: true }),
    supabase.from('ContactMessage').select('*', { count: 'exact', head: true }),
    supabase.from('ContactMessage').select('*', { count: 'exact', head: true }).eq('read', false),
    supabase.from('Personal').select('name, available, updatedAt').limit(1).single(),
    supabase.from('ContactMessage').select('*').order('createdAt', { ascending: false }).limit(1).single(),
  ]);

  const projectCount = projectRes.count ?? 0;
  const messageCount = messageRes.count ?? 0;
  const unreadCount = unreadRes.count ?? 0;
  const personal = personalRes.data;
  const lastMessage = lastMessageRes.data;
  const firstName = personal?.name?.split(' ')[0] ?? 'Admin';

  const stats = [
    { label: 'Projects Published', value: projectCount, icon: 'fas fa-folder-open', color: '#4ade80', href: '/admin/projects', sub: 'in your portfolio', badge: '+2 this month', badgeColor: '#4ade80' },
    { label: 'Messages Total', value: messageCount, icon: 'fas fa-envelope', color: '#a78bfa', href: '/admin/messages', sub: '0 new today', badge: '0 new today', badgeColor: '#a78bfa' },
    { label: 'Unread Need Attention', value: unreadCount, icon: 'fas fa-bell', color: '#fb7185', href: '/admin/messages', sub: 'need attention', badge: 'Requires Action', badgeColor: '#fb7185' },
    {
      label: 'Status: For Hire',
      value: personal?.available ? 'Open' : 'Busy',
      icon: 'fas fa-circle-check',
      color: personal?.available ? '#4ade80' : '#fb7185',
      href: '/admin/personal',
      sub: personal?.available ? 'Available for hire' : 'Currently busy',
      badge: 'Active Status',
      badgeColor: personal?.available ? '#4ade80' : '#fb7185',
    },
  ];

  const quickLinks = [
    { href: '/admin/personal', label: 'Personal Info', icon: 'fas fa-user', desc: 'Name, bio, socials, and contact statistics', color: '#4ade80' },
    { href: '/admin/projects', label: 'Projects', icon: 'fas fa-folder-open', desc: 'Add, edit, or remove entries from your portfolio', color: '#a78bfa' },
    { href: '/admin/skills', label: 'Skills', icon: 'fas fa-bolt', desc: 'Manage skill icons, proficiencies, and tech stack', color: '#fb7185' },
    { href: '/admin/experience', label: 'Experience', icon: 'fas fa-briefcase', desc: 'Professional work history and education timeline', color: '#4ade80' },
    { href: '/admin/services', label: 'Services', icon: 'fas fa-gem', desc: 'Configure the service packages you offer to clients', color: '#fbbf24' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Welcome */}
      <div>
        <p
          style={{
            fontSize: 9,
            fontFamily: 'monospace',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            marginBottom: 10,
          }}
        >
          Welcome back
        </p>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}>
                {firstName}
              </h2>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  background: personal?.available ? 'rgba(74,222,128,0.1)' : 'rgba(251,113,133,0.08)',
                  color: personal?.available ? '#4ade80' : '#fb7185',
                  border: `1px solid ${personal?.available ? 'rgba(74,222,128,0.25)' : 'rgba(251,113,133,0.2)'}`,
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: personal?.available ? '#4ade80' : '#fb7185', flexShrink: 0 }} />
                {personal?.available ? 'Available for hire' : 'Currently busy'}
              </span>
            </div>
            {personal?.updatedAt && (
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>
                Portfolio updated {formatDate(personal.updatedAt)}
              </p>
            )}
          </div>

          <Link
            href="/"
            target="_blank"
            style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', marginTop: 4 }}
          >
            <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: 9 }} />
            View live portfolio
          </Link>
        </div>
      </div>

      {/* Stats */}
      <StatCards stats={stats} />

      {/* Quick Actions */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 3, height: 14, background: '#4ade80', borderRadius: 2, flexShrink: 0 }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Quick Actions</span>
        </div>
        <QuickLinks links={quickLinks} />
      </div>

      {/* Latest message */}
      {lastMessage && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 3, height: 14, background: '#a78bfa', borderRadius: 2, flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Latest Message</span>
          </div>

          <div
            style={{
              borderRadius: 8,
              padding: '16px 18px 16px 20px',
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg, #00f3ff, #a78bfa)' }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 10 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1 }}>{lastMessage.name}</p>
                <a href={`mailto:${lastMessage.email}`} style={{ fontSize: 11, color: '#00f3ff', textDecoration: 'none', display: 'block', marginTop: 4 }}>
                  {lastMessage.email}
                </a>
              </div>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', flexShrink: 0 }}>
                {formatDate(lastMessage.createdAt)}
              </span>
            </div>

            <p
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.6,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {lastMessage.message}
            </p>

            <div style={{ display: 'flex', gap: 18, marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <Link href="/admin/messages" style={{ fontSize: 11, color: '#00f3ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
                View all <i className="fas fa-arrow-right" style={{ fontSize: 9 }} />
              </Link>
              <a href={`mailto:${lastMessage.email}?subject=Re: Portfolio Contact`} style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="fas fa-reply" style={{ fontSize: 9 }} /> Reply
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
