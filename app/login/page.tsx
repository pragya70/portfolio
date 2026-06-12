'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const EM = '#4ade80';
const EM_DARK = '#0a0c14';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  const callbackError = searchParams.get('error');
  const hasError = !!(error || callbackError);

  return (
    <div
      className="admin-layout min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: EM_DARK }}
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary emerald glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 65%)`,
          filter: 'blur(40px)',
        }} />
        {/* Secondary accent */}
        <div style={{
          position: 'absolute', bottom: '10%', right: '10%',
          width: 300, height: 300, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }} />
        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }} />
      </div>

      {/* Card */}
      <div
        style={{
          width: '100%', maxWidth: 420, position: 'relative', zIndex: 10,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 60, height: 60, borderRadius: 18, marginBottom: 20,
            background: `linear-gradient(135deg, rgba(74,222,128,0.15), rgba(74,222,128,0.06))`,
            border: `1px solid rgba(74,222,128,0.25)`,
            boxShadow: `0 0 32px rgba(74,222,128,0.12)`,
          }}>
            <i className="fas fa-terminal" style={{ fontSize: 22, color: EM }} />
          </div>
          <h1 style={{
            fontSize: 24, fontWeight: 800, color: '#fff',
            letterSpacing: '-0.025em', margin: 0, lineHeight: 1.2,
          }}>
            Welcome back
          </h1>
          <p style={{
            fontSize: 13.5, color: 'rgba(255,255,255,0.35)',
            marginTop: 8, lineHeight: 1.5,
          }}>
            Sign in to your portfolio admin
          </p>
        </div>

        {/* Form card */}
        <div style={{
          borderRadius: 20,
          background: 'rgba(255,255,255,0.035)',
          border: '1px solid rgba(255,255,255,0.09)',
          padding: '32px 36px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset',
          backdropFilter: 'blur(20px)',
        }}>

          {/* Error alert */}
          {hasError && (
            <div
              role="alert"
              aria-live="polite"
              style={{
                marginBottom: 24, padding: '12px 16px',
                borderRadius: 12, display: 'flex', alignItems: 'flex-start', gap: 10,
                background: 'rgba(248,113,113,0.08)',
                border: '1px solid rgba(248,113,113,0.25)',
              }}
            >
              <i className="fas fa-circle-exclamation" style={{ color: '#f87171', fontSize: 13, marginTop: 1, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.5 }}>
                {error || 'Authentication failed. Please try again.'}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Email field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label
                htmlFor="login-email"
                style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                }}
              >
                Email address
              </label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-envelope" style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 12, color: 'rgba(255,255,255,0.22)', pointerEvents: 'none',
                }} />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  autoComplete="email"
                  placeholder="admin@portfolio.com"
                  style={{
                    width: '100%', height: 48, paddingLeft: 40, paddingRight: 16,
                    borderRadius: 12, fontSize: 14, color: '#fff',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    outline: 'none', fontFamily: 'inherit',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = `rgba(74,222,128,0.5)`;
                    e.target.style.boxShadow = `0 0 0 3px rgba(74,222,128,0.1)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label
                htmlFor="login-password"
                style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-lock" style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 12, color: 'rgba(255,255,255,0.22)', pointerEvents: 'none',
                }} />
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  style={{
                    width: '100%', height: 48, paddingLeft: 40, paddingRight: 48,
                    borderRadius: 12, fontSize: 14, color: '#fff',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    outline: 'none', fontFamily: 'inherit',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = `rgba(74,222,128,0.5)`;
                    e.target.style.boxShadow = `0 0 0 3px rgba(74,222,128,0.1)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {/* Show/hide toggle — 44×44 touch target */}
                <button
                  type="button"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPw((v) => !v)}
                  style={{
                    position: 'absolute', right: 0, top: 0,
                    width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.3)',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; }}
                >
                  <i className={`fas ${showPw ? 'fa-eye-slash' : 'fa-eye'}`} style={{ fontSize: 13 }} />
                </button>
              </div>
            </div>

            {/* Divider line */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', height: 50, borderRadius: 13, border: 'none',
                background: loading ? 'rgba(74,222,128,0.6)' : EM,
                color: EM_DARK, fontSize: 14, fontWeight: 700,
                letterSpacing: '0.02em', cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(74,222,128,0.3)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLElement).style.background = '#22c55e';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(74,222,128,0.45)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLElement).style.background = EM;
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(74,222,128,0.3)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin" style={{ fontSize: 13 }} />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <i className="fas fa-arrow-right-to-bracket" style={{ fontSize: 13 }} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = EM; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: 11 }} />
            Back to portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
