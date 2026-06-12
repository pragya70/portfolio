import { cn } from '@/lib/utils';

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  hint?: string;
  required?: boolean;
};

export function FormField({ label, error, children, className, hint, required }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="flex items-center gap-1 text-[11px] font-bold text-white/40 uppercase tracking-[0.14em]">
        {label}
        {required && <span className="text-[#4ade80]" title="Required">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-white/25 leading-relaxed italic">{hint}</p>}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-[#f87171]" role="alert">
          <i className="fas fa-exclamation-circle text-[10px]" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase = [
  'w-full h-10 px-4 rounded-xl text-sm text-white placeholder-white/20',
  'outline-none transition-all duration-200',
  'border border-white/8',
  'hover:border-white/16',
].join(' ');

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
};

const inputFocusNormal = 'focus:border-[#4ade80]/50 focus:shadow-[0_0_0_3px_rgba(74,222,128,0.08)]';
const inputFocusError  = 'focus:border-[#f87171]/60 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.1)]';
const inputErrorBorder = 'border-[#f87171]/40';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean };

export function Input({ className, error, style, ...props }: InputProps) {
  return (
    <input
      {...props}
      style={{ ...inputStyle, ...style }}
      className={cn(
        inputBase,
        error ? `${inputErrorBorder} ${inputFocusError}` : inputFocusNormal,
        className
      )}
    />
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean };

export function Textarea({ className, error, style, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      style={{ ...inputStyle, ...style }}
      className={cn(
        'w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20',
        'outline-none transition-all duration-200 resize-none',
        'border border-white/8 hover:border-white/16',
        error ? `${inputErrorBorder} ${inputFocusError}` : inputFocusNormal,
        className
      )}
    />
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean };

export function Select({ className, error, children, style, ...props }: SelectProps) {
  return (
    <select
      {...props}
      style={{ ...inputStyle, ...style }}
      className={cn(
        'w-full h-10 px-4 rounded-xl text-sm text-white',
        'outline-none transition-all duration-200 appearance-none',
        'border border-white/8 hover:border-white/16',
        error ? `${inputErrorBorder} ${inputFocusError}` : inputFocusNormal,
        className
      )}
    >
      {children}
    </select>
  );
}
