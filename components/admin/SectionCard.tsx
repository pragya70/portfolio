import { ReactNode } from 'react';

type Props = {
  color: string;
  label: string;
  children: ReactNode;
  count?: number;
  description?: string;
};

export function SectionCard({ color, label, children, count, description }: Props) {
  return (
    <div style={{
      borderRadius: 14,
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '13px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '14px 14px 0 0',
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
          background: color, boxShadow: `0 0 6px ${color}`,
        }} />

        <span style={{
          flex: 1, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
        }}>
          {label}
        </span>

        {description && (
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>{description}</span>
        )}

        {count !== undefined && (
          <span style={{
            fontSize: 10, fontFamily: 'monospace',
            padding: '2px 8px', borderRadius: 6,
            background: `${color}15`, color,
            border: `1px solid ${color}25`,
          }}>
            {count} total
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {children}
      </div>
    </div>
  );
}
