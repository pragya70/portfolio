'use client';

import { cn } from '@/lib/utils';

type Props = {
  loading?: boolean;
  label?: string;
  className?: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
  variant?: 'primary' | 'danger' | 'ghost' | 'success';
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function SaveButton({
  loading,
  label = 'Save Changes',
  className,
  type = 'submit',
  onClick,
  variant = 'primary',
  icon,
  size = 'md',
}: Props) {
  const sizeClasses = {
    sm: 'h-8 px-5 text-xs gap-1.5 rounded-lg',
    md: 'h-10 px-9 text-sm gap-2 rounded-xl',
    lg: 'h-11 px-11 text-sm gap-2 rounded-xl',
  };

  const variantMap: Record<string, { className: string; style: React.CSSProperties; hoverStyle: React.CSSProperties }> = {
    primary: {
      className: 'text-[#0a0c14] font-bold tracking-wide',
      style: {
        background: '#4ade80',
        boxShadow: '0 4px 16px rgba(74,222,128,0.3)',
      },
      hoverStyle: {
        background: '#22c55e',
        boxShadow: '0 6px 20px rgba(74,222,128,0.45)',
        transform: 'translateY(-1px)',
      },
    },
    success: {
      className: 'text-[#4ade80] font-semibold',
      style: {
        background: 'rgba(74,222,128,0.1)',
        border: '1px solid rgba(74,222,128,0.3)',
      },
      hoverStyle: {
        background: 'rgba(74,222,128,0.18)',
        border: '1px solid rgba(74,222,128,0.5)',
      },
    },
    danger: {
      className: 'text-[#f87171] font-semibold',
      style: {
        background: 'rgba(248,113,113,0.08)',
        border: '1px solid rgba(248,113,113,0.25)',
      },
      hoverStyle: {
        background: 'rgba(248,113,113,0.15)',
        border: '1px solid rgba(248,113,113,0.5)',
      },
    },
    ghost: {
      className: 'text-gray-400 font-semibold',
      style: {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
      },
      hoverStyle: {
        background: 'rgba(255,255,255,0.09)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#fff',
      },
    },
  };

  const v = variantMap[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      aria-disabled={loading}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200',
        'disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c14]',
        'active:scale-[0.97]',
        sizeClasses[size],
        v.className,
        className
      )}
      style={v.style}
      onMouseEnter={(e) => {
        Object.assign((e.currentTarget as HTMLElement).style, v.hoverStyle);
      }}
      onMouseLeave={(e) => {
        Object.assign((e.currentTarget as HTMLElement).style, v.style);
      }}
    >
      {loading ? (
        <>
          <i className="fas fa-circle-notch fa-spin text-[11px]" aria-hidden="true" />
          <span>Saving…</span>
        </>
      ) : (
        <>
          {icon && <i className={cn(icon, size === 'sm' ? 'text-[10px]' : 'text-[12px]')} aria-hidden="true" />}
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
