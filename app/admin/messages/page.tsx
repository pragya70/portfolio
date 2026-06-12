'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { formatDate } from '@/lib/utils';
import { PageHeader } from '@/components/admin/PageHeader';

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

const CARD: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12,
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const fetchMessages = async () => {
    setLoading(true);
    const url = filter === 'unread' ? '/api/contact?unread=true' : '/api/contact';
    const res = await fetch(url);
    setMessages(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, [filter]);

  const handleMarkRead = async (id: number, read: boolean) => {
    await fetch(`/api/contact/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    });
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read } : m)));
    if (selected?.id === id) setSelected((prev) => (prev ? { ...prev, read } : null));
    toast.success(read ? 'Marked as read' : 'Marked as unread');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
    toast.success('Message deleted');
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <PageHeader
        title="Messages"
        subtitle={
          unreadCount > 0
            ? `${unreadCount} unread Â· ${messages.length} total`
            : `All caught up Â· ${messages.length} total`
        }
        action={
          <div style={{ display: 'flex', gap: 6 }}>
            {(['all', 'unread'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: filter === f ? '1px solid rgba(0,243,255,0.25)' : '1px solid transparent',
                  background: filter === f ? 'rgba(0,243,255,0.1)' : 'transparent',
                  color: filter === f ? '#4ade80' : 'rgba(255,255,255,0.35)',
                  transition: 'all 0.12s',
                }}
              >
                {f === 'all' ? 'All' : `Unread${unreadCount > 0 ? ` (${unreadCount})` : ''}`}
              </button>
            ))}
          </div>
        }
      />

      {/* Two-column layout that fills remaining height */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: 12,
        }}
      >
        {/* Left: Message list */}
        <div
          style={{
            ...CARD,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* List header */}
          <div
            style={{
              padding: '12px 16px',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              flexShrink: 0,
            }}
          >
            Inbox
          </div>

          {/* Scrollable list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
            {loading ? (
              <div style={{ padding: '20px 12px', fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                Loadingâ€¦
              </div>
            ) : messages.length === 0 ? (
              <div style={{ padding: '40px 16px', textAlign: 'center' }}>
                <i className="fas fa-envelope-open" style={{ fontSize: 28, color: 'rgba(255,255,255,0.1)', display: 'block', marginBottom: 10 }} />
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                  {filter === 'unread' ? 'No unread messages' : 'No messages yet'}
                </p>
                {filter === 'unread' && (
                  <button
                    onClick={() => setFilter('all')}
                    style={{ marginTop: 10, fontSize: 11, color: '#4ade80', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    View all
                  </button>
                )}
              </div>
            ) : (
              messages.map((m) => {
                const active = selected?.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelected(m);
                      if (!m.read) handleMarkRead(m.id, true);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 12px',
                      borderRadius: 8,
                      marginBottom: 2,
                      cursor: 'pointer',
                      border: active ? '1px solid rgba(0,243,255,0.25)' : '1px solid transparent',
                      background: active ? 'rgba(0,243,255,0.06)' : 'transparent',
                      transition: 'all 0.12s',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      {!m.read && (
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fb7185', flexShrink: 0 }} />
                      )}
                      <span
                        style={{
                          flex: 1,
                          fontSize: 13,
                          fontWeight: m.read ? 500 : 600,
                          color: m.read ? 'rgba(255,255,255,0.6)' : '#fff',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {m.name}
                      </span>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', flexShrink: 0 }}>
                        {formatDate(m.createdAt)}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 3 }}>
                      {m.email}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: 'rgba(255,255,255,0.35)',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.45,
                      }}
                    >
                      {m.message}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Detail panel */}
        <div
          style={{
            ...CARD,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {selected ? (
            <>
              {/* Detail header */}
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} style={{ fontSize: 12, color: '#4ade80', textDecoration: 'none', display: 'block', marginTop: 4 }}>
                    {selected.email}
                  </a>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', display: 'block', marginTop: 4 }}>
                    {formatDate(selected.createdAt)}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  <button
                    onClick={() => handleMarkRead(selected.id, !selected.read)}
                    title={selected.read ? 'Mark as unread' : 'Mark as read'}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: 11,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.12s',
                    }}
                  >
                    <i className={`fas ${selected.read ? 'fa-envelope' : 'fa-envelope-open'}`} />
                  </button>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    title="Delete message"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: 11,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.12s',
                    }}
                  >
                    <i className="fas fa-trash" />
                  </button>
                </div>
              </div>

              {/* Message body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {selected.message}
                </p>
              </div>

              {/* Reply action */}
              <div
                style={{
                  padding: '14px 20px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  flexShrink: 0,
                }}
              >
                <a
                  href={`mailto:${selected.email}?subject=Re: Portfolio Contact`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 18px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#fff',
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #4ade80, #a78bfa)',
                    boxShadow: '0 4px 14px rgba(0,243,255,0.18)',
                  }}
                >
                  <i className="fas fa-reply" style={{ fontSize: 10 }} />
                  Reply via Email
                </a>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <i className="fas fa-envelope-open" style={{ fontSize: 36, color: 'rgba(255,255,255,0.07)', display: 'block', marginBottom: 12 }} />
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>Select a message to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

