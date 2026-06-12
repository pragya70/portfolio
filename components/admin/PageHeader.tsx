import { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function PageHeader({ title, subtitle, action }: Props) {
  return (
    <div style={{ marginBottom: 28, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            width: 3, height: 32, borderRadius: 999, flexShrink: 0, marginTop: 2,
            background: 'linear-gradient(180deg, #4ade80, #059669)',
            boxShadow: '0 0 12px rgba(74,222,128,0.35)',
          }} />
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, margin: 0 }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 8, lineHeight: 1.55, maxWidth: 560 }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {action && <div style={{ flexShrink: 0 }}>{action}</div>}
      </div>

      <div style={{
        marginTop: 20, height: 1,
        background: 'linear-gradient(90deg, rgba(74,222,128,0.2), rgba(5,150,105,0.08) 40%, transparent 75%)',
      }} />
    </div>
  );
}
